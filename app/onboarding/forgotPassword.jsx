import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"
import React, { useState } from "react"
import LeftArrowIcon from "./../../assets/icons/LeftArrow"
import { useRouter } from "expo-router"
import { auth } from "../../firebase/firebaseConfig"
import { sendPasswordResetEmail } from "firebase/auth"
import Toast from "react-native-root-toast"

const forgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

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

  const handleSendResetLink = () => {
    if (email === "") {
      Toast.show("Please enter your email address.", options)
      return
    }
    if (!email.includes("@") || !email.includes(".")) {
      Toast.show("Please enter a valid email address.", options)
      return
    }
    setLoading(true)

    try {
      sendPasswordResetEmail(auth, email).then(() => {
        Toast.show(
          "A password reset link has been sent to your email address.",
          options
        )
        router.back()
      })
    } catch (error) {
      Toast.show(error.message, options)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftArrow} activeOpacity={1}>
        <LeftArrowIcon
          height="24"
          width="24"
          color="#7F3DFF"
          strokeWidth="2.5"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Forgot Password</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        Enter your registered email address to reset your password.
      </Text>
      <View style={styles.bottomContainerTop}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={handleSendResetLink}
        >
          <Text style={styles.buttonText}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Send Reset Link"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 30,
    position: "relative",
  },
  leftArrow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "center",
    marginLeft: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: "#7F3DFF",
  },
  subtitle: {
    fontSize: 18,
    width: "100%",
    textAlign: "flex-start",
    fontFamily: "Poppins_400Regular",
    paddingTop: 20,
  },
  bottomContainerTop: {
    marginVertical: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  },
})

export default forgotPassword
