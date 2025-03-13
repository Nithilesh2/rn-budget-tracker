import { View, Text, StyleSheet, StatusBar } from "react-native"
import React, { useEffect } from "react"
import LottieView from "lottie-react-native"
import { useFonts } from "expo-font"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"
import { Ubuntu_400Regular } from "@expo-google-fonts/ubuntu"
import { useRouter } from "expo-router"

const index = () => {
  const router = useRouter()
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Ubuntu_400Regular,
  })

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        router.push("onboarding/welcome1")
      }, 3000)
    }
  }, [fontsLoaded, router])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7F3DFF" />
      <View style={styles.container}>
        <View style={styles.animation}>
          <LottieView
            source={require("../assets/Animations/MainImage.json")}
            autoPlay
            loop={true}
            style={{ width: 370, height: 290 }}
          />
        </View>
        <Text style={styles.textTop}>Budget Tracker</Text>
        <Text style={styles.textBottom}>
          Track and manage your daily expenses effortlessly.
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 40,
  },
  textTop: {
    color: "#7F3DFF",
    fontSize: 44,
    fontFamily: "Ubuntu_400Regular",
    width: '100%',
    textAlign: "center",
  },
  textBottom: {
    color: "#7F3DFF",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "Poppins_400Regular",
    width: '100%'
  },
})

export default index
