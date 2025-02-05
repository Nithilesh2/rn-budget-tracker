import React, { useState, useEffect, useCallback, useContext } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useRouter } from "expo-router"
import DeleteIcon from "./../../../assets/icons/Delete"
import TickIcon from "./../../../assets/icons/Tick"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import { firestore } from "../../../firebase/firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Toast from "react-native-root-toast"
import { duration } from "moment";
import { AppContext } from "../../../context/AppContext";

const PinLockScreen = () => {
  const { options } = useContext(AppContext)
  const [pin, setPin] = useState("")
  const [savedPin, setSavedPin] = useState(null)
  const [tempPin, setTempPin] = useState("")
  const [step, setStep] = useState("loading")
  const [loading, setLoading] = useState(false)
  const [attemptCount, setAttemptCount] = useState(3)
  const router = useRouter()

  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })
  const optionsForAttempts = {
    ...options,
    duration: Toast.durations.SHORT
  }

  useFocusEffect(
    useCallback(() => {
      checkExistingPin()
    }, [])
  )

  const checkExistingPin = async () => {
    setLoading(true)
    const userId = await AsyncStorage.getItem("userId")
    if (!userId) {
      Toast.show("User not found!", options)
      router.replace("/onboarding/login")
    }

    const userDocRef = doc(firestore, "users", userId)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists() && userDocSnap.data().pin) {
      const storedPin = userDocSnap.data().pin
      setSavedPin(storedPin)
      await AsyncStorage.setItem("userPin", storedPin)
      setStep("enter")
    } else {
      setStep("setup")
    }
    setLoading(false)
  }

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num)
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const handleConfirmPin = async () => {
    const userId = await AsyncStorage.getItem("userId")
    const userName = await AsyncStorage.getItem("userName")
    if (!userId) {
      Toast.show("User not found!", options)
      return
    }
    const greetings = () => {
      const hours = new Date().getHours()
      if (hours < 12) Toast.show(`Good Morning ${userName}`, options)
      else if (hours < 18) Toast.show(`Good Afternoon ${userName}`, options)
      else Toast.show(`Good Evening ${userName}`, options)
    }

    const userDocRef = doc(firestore, "users", userId)

    if (step === "setup") {
      setTempPin(pin)
      setPin("")
      setStep("confirm")
    } else if (step === "confirm") {
      if (pin === tempPin) {
        await AsyncStorage.setItem("userPin", pin)
        await setDoc(userDocRef, { pin }, { merge: true })
        Toast.show("PIN set successfully", options)
        router.replace("/onboarding/tabs")
        greetings()
      } else {
        Toast.show("PINs do not match. Try again.", options)
        setPin("")
        setTempPin("")
        setStep("setup")
      }
    } else if (step === "enter") {
      if (pin === savedPin) {
        router.replace("/onboarding/tabs")
        greetings()
      } else {
        if (attemptCount === 0) {
          Toast.show("Too many attempts, redirecting...", optionsForAttempts)
          setTimeout(() => {
            router.push("onboarding/pinSetup/forgotPin")
          }, 1500)
        } else {
          setAttemptCount((prev) => {
            const newCount = prev - 1
            Toast.show(`Incorrect PIN. Attempt(${attemptCount}).`, options)
            return newCount
          })
        }
        setPin("")
      }
    }
  }

  const handleRemoveFromStorage = async () => {
    router.push("/onboarding/pinSetup/forgotPin")
  }

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>
            {step === "setup"
              ? "Let's set up your PIN"
              : step === "confirm"
              ? "Retype your PIN again"
              : "Enter your PIN"}
          </Text>

          <View style={styles.pinDisplay}>
            {[...Array(4)].map((_, index) => (
              <View
                key={index}
                style={
                  pin.length > index ? styles.filledCircle : styles.emptyCircle
                }
              />
            ))}
          </View>

          <View style={styles.keypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "del", 0, "ok"].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.key}
                onPress={() =>
                  key === "del"
                    ? handleDelete()
                    : key === "ok"
                    ? handleConfirmPin()
                    : handleKeyPress(key)
                }
                activeOpacity={0.5}
              >
                <Text style={styles.keyText}>
                  {key === "del" ? (
                    <DeleteIcon
                      width={30}
                      height={30}
                      color="white"
                      strokeWidth={2}
                      style={styles.deleteIcon}
                    />
                  ) : key === "ok" ? (
                    <TickIcon
                      width={30}
                      height={30}
                      color="white"
                      strokeWidth={3}
                    />
                  ) : (
                    key
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {step === "enter" && (
            <TouchableOpacity onPress={handleRemoveFromStorage}>
              <Text style={styles.removeText}>Forgot PIN</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  )
}

export default PinLockScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7F3DFF",
  },
  title: {
    fontSize: 26,
    color: "white",
    marginBottom: 20,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    width: "100%",
  },
  pinDisplay: {
    flexDirection: "row",
    marginBottom: 80,
  },
  filledCircle: {
    width: 17,
    height: 17,
    borderRadius: 50,
    backgroundColor: "white",
    margin: 5,
  },
  emptyCircle: {
    width: 17,
    height: 17,
    borderRadius: 50,
    borderWidth: 2.4,
    borderColor: "#cccc",
    margin: 5,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 300,
  },
  key: {
    width: 90,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 35,
  },
  keyText: {
    fontSize: 32,
    color: "white",
    fontFamily: "Ubuntu_500Medium",
  },
  removeText: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    width: "100%",
  },
})
