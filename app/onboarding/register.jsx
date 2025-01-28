import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import EyeCloseIcon from "./../../assets/icons/EyeClose"
import EyeOpenIcon from "./../../assets/icons/EyeOpen"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins"

const register = () => {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  })

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.bottomContainerTop}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            keyboardType="default"
          />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            keyboardType="email-address"
          />
          <View style={styles.inputPassBox}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              secureTextEntry={showPassword ? false : true}
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
          <TouchableOpacity activeOpacity={0.9} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
  },
  or: {
    alignItems: "center",
    marginVertical: 7,
  },
  orText: {
    color: "grey",
    fontSize: 16,
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
  },
  socialText: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Poppins_500Medium",
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
  },
  signInText: {
    color: "#7F3DFF",
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
  },
})

export default register
