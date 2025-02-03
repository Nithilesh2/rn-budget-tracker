import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-root-toast"
import { auth, firestore } from "../../../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import EyeCloseIcon from "./../../../assets/icons/EyeClose"
import EyeOpenIcon from "./../../../assets/icons/EyeOpen"

const forgotPin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState("")
  const [rePin, setRePin] = useState("")

  const router = useRouter()

  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  })

  const options = {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    animation: true,
    backgroundColor: "black",
    textColor: "white",
    shadow: true,
    shadowColor: "white",
    containerStyle: {
      borderRadius: 15,
      padding: 15,
    },
    textStyle: {
      fontSize: 16,
      fontWeight: "600",
    },
  }

  const handleChangePin = async () => {
    if (!email || !password || !pin || !rePin) {
      Toast.show("Please fill all fields", options)
      return
    }
    if (pin !== rePin) {
      Toast.show("Pin and Re-Pin do not match", options)
      return
    }
    setLoading(true)

    try {
      const usercredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = usercredentials.user
      const userRef = doc(firestore, "users", user.uid)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        await setDoc(userRef, { pin }, { merge: true })
        await AsyncStorage.setItem("userPin", pin)
        router.replace("/onboarding/pinSetup/")
        Toast.show("Pin changed successfully!", options)
      } else {
        Toast.show("User not found in database!", options)
      }
    } catch (error) {
      Toast.show(error.message, options)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot PIN</Text>
        <ScrollView style={styles.bottomContainerTop}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.inputPassBox}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              secureTextEntry={showPassword ? false : true}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPassIcon}
            >
              {showPassword ? (
                <EyeCloseIcon width="26" height="26" />
              ) : (
                <EyeOpenIcon width="26" height="26" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.forgotPassword}
            onPress={() => router.push("onboarding/forgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputText}
            placeholder="Set New PIN"
            keyboardType="decimal-pad"
            onChangeText={(text) => setPin(text)}
            maxLength={4}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Re-Enter New PIN"
            keyboardType="decimal-pad"
            onChangeText={(text) => setRePin(text)}
            maxLength={4}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={handleChangePin}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                "Change PIN"
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  )
}

export default forgotPin

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: "#7F3DFF",
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  bottomContainerTop: {
    marginVertical: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    paddingHorizontal: 17,
    borderRadius: 10,
    fontSize: 16,
    width: "100%",
    marginVertical: 10,
    fontFamily: "Poppins_400Regular",
  },
  inputPassBox: {
    borderColor: "#D3D3D3",
    flexDirection: "row",
    position: "relative",
    width: "100%",
  },
  showPassIcon: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  forgotPassword: {
    marginVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  forgotPasswordText: {
    color: "#7F3DFF",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#7F3DFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    width: "100%",
    textAlign: "center",
  },
})
