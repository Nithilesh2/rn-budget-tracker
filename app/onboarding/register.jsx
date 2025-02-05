import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import EyeCloseIcon from "./../../assets/icons/EyeClose"
import EyeOpenIcon from "./../../assets/icons/EyeOpen"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"
import { auth, firestore, provider } from "../../firebase/firebaseConfig"
import Toast from "react-native-root-toast"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { AppContext } from "../../context/AppContext";

const Register = () => {
  const { options } = useContext(AppContext)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7F3DFF" />
      </View>
    )
  }

  const handleSignUp = () => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const randomNumberForIcon = Math.floor(Math.random() * 10)

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      Toast.show("Please fill in all the fields", options)
      return
    } else if (trimmedPassword.length < 7) {
      Toast.show("Password must be at least 6 characters", options)
      return
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if (!emailRegex.test(trimmedEmail)) {
      Toast.show("Please enter a valid email address", options)
      return
    }
    setLoading(true)
    createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword).then(
      async (userCredentials) => {
        const user = userCredentials.user
        try {
          await setDoc(doc(firestore, "users", user.uid), {
            name: trimmedName,
            email: trimmedEmail,
            uid: user.uid,
            userIconNumber: randomNumberForIcon
          })
          Toast.show("User registered successfully", options)
          router.push("/onboarding/login")
          setLoading(false)
        } catch (error) {
          Toast.show("Error saving user data to Firestore", options)
        } finally {
          setLoading(false)
        }
      }
    )
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.bottomContainerTop}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            keyboardType="default"
            onChangeText={(text) => setName(text)}
          />
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
            style={styles.button}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                "Sign Up"
              )}
            </Text>
          </TouchableOpacity>

          <View style={styles.or}>
            <Text style={styles.orText}>Or With</Text>
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.socialButton}>
              <Image
                source={require("./../../assets/images/google.png")}
                style={styles.googleImage}
              />
              <Text style={styles.socialText}>Sign Up with Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alreadyHaveAcc}>
            <Text style={styles.alreadyHaveAccText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("onboarding/login")}
            >
              <Text style={styles.signInText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
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
  },
  bottomContainerTop: {
    marginVertical: 30,
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
  or: {
    alignItems: "center",
    marginVertical: 7,
    width: "100%",
  },
  orText: {
    color: "grey",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  socialButton: {
    backgroundColor: "#D3D3D3",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
    width: "100%",
  },
  googleImage: {
    width: 26,
    height: 26,
    textAlign: "center",
  },
  socialText: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Poppins_500Medium",
    width: "70%",
    textAlign: "center",
  },
  alreadyHaveAcc: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  alreadyHaveAccText: {
    color: "grey",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  signInText: {
    color: "#7F3DFF",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
    width: "100%",
    textAlign: "flex-start",
    overflow: "visible",
  },
})

export default Register
