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
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-root-toast"
import { auth, firestore } from "../../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { AppContext } from "../../context/AppContext"

const login = () => {
  const { options, setStoredUserId } = useContext(AppContext)
  const [showPassword, setShowPassword] = useState(false)
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

  const handleLogin = async () => {
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    if (!emailRegex.test(trimmedEmail)) {
      Toast.show("Please enter a valid email address", options)
      return
    }
    setLoading(true)
    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then(async (userCredentials) => {
        const user = userCredentials.user
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            await AsyncStorage.setItem("loggedIn", "true")
            await AsyncStorage.setItem("userId", userData.uid)
            setStoredUserId(userData.uid)
            await AsyncStorage.setItem("userName", userData.name)
            await AsyncStorage.setItem("userEmail", userData.email)

            Toast.show(`logged in as ${userData.name}`, options)
            router.push("onboarding/pinSetup")
          }
        } catch (error) {
          console.error(error)
        }
      })
      .catch((error) => {
        Toast.show(error.message, options)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.bottomContainerTop}>
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
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                "Login"
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
              <Text style={styles.socialText}>Login with Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alreadyHaveAcc}>
            <Text style={styles.alreadyHaveAccText}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("onboarding/register")}
            >
              <Text style={styles.signInText}>Sign Up</Text>
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
    width: "100%",
    textAlign: "center",
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
  or: {
    alignItems: "center",
    marginVertical: 7,
    width: "100%",
    paddingHorizontal: 10,
  },
  orText: {
    color: "grey",
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    width: "100%",
    textAlign: "center",
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
    overflow: "visible",
  },
  alreadyHaveAcc: {
    flexDirection: "row",
    justifyContent: "center",
  },
  alreadyHaveAccText: {
    color: "grey",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    overflow: "visible",
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
export default login
