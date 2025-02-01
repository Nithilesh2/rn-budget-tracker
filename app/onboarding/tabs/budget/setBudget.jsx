import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-root-toast"

const setBudget = () => {
  const router = useRouter()
  const [budget, setBudget] = useState("")
  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })
  const options = {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    hideOnPress: true,
    delay: 0,
  }

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const storedBudget = await AsyncStorage.getItem("selectedBudget")
        setBudget(storedBudget)
      } catch (error) {
        console.log("Error loading currency:", error)
      }
    }
    loadBudget()
  }, [])

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem("selectedBudget", budget)
      router.back()
      Toast.show(`Budget changed to ${budget}`, options)
    } catch (err) {
      console.log("Error setting budget:", err)
    }
  }

  const handleBack = ()=>{
    router.back()
    Toast.show("Cancelled budget change", options)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <ArrowLeftIcon
          height={30}
          width={30}
          color="white"
          strokeWidth={2}
          onPress={handleBack}
        />
        <Text style={styles.title}>Set Budget</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          Enter your desired monthly budget:
        </Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.rupeeSymbolText}>₹</Text>
          <TextInput
            placeholder="0"
            style={styles.amountInput}
            keyboardType="numeric"
            placeholderTextColor="white"
            value={budget}
            maxLength={7}
            onChangeText={(text) => {
              let numericValue = text.replace(/[^0-9]/g, "")
              if (numericValue === "") {
                setBudget("")
              } else {
                setBudget(numericValue)
              }
            }}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.buttonContainer}
          onPress={handleContinue}
        >
          <Text style={styles.saveButton}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default setBudget

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F3DFF",
    paddingVertical: 25,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Ensure scrollable content is not hidden
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    width: "100%",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    width: "80%",
    color: "white",
  },
  amountContainer: {
    paddingHorizontal: 25,
    paddingTop: 170,
    marginBottom: 30,
  },
  amountText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  amountInputContainer: {
    width: "100%",
    flexDirection: "row",
  },
  rupeeSymbolText: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 60,
    color: "white",
    marginTop: 12,
  },
  amountInput: {
    flex: 1,
    fontFamily: "Ubuntu_500Medium",
    fontSize: 62,
    color: "white",
    marginLeft: 10,
  },
  bottomContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    height: 150,
    paddingHorizontal: 25,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
    marginBottom: 10,
    height: 50,
  },
  saveButton: {
    color: "#7F3DFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    textAlign: "center",
  },
})
