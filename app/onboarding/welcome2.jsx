import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect } from "react"
import { useFonts } from "expo-font"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"
import { useRouter } from "expo-router"

const welcome2 = () => {
  const router = useRouter()
  useFonts({
    Poppins_400Regular,
  })

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <Image
            source={require("../../assets/images/onboardingTwo.png")}
            style={styles.imagePic}
          />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>Stay on Top of Your Expenses</Text>
          <Text style={styles.subtitle}>
            Track every rupee, set budget goals, and monitor your spending in
            real-time.
          </Text>
          <View style={styles.dots}>
            <View style={styles.dot}></View>
            <View style={styles.dotMain}></View>
            <View style={styles.dot}></View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.backBtn}
              onPress={() => router.push("onboarding/")}
            >
              <Text style={styles.nextText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.nextBtn}
              onPress={() => router.push("onboarding/welcome3")}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default welcome2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imagePic: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  top: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 1.5,
    alignItems: "center",
    backgroundColor: "#7F3DFF",
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
    width: "90%",
  },
  dots: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dotMain: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: "white",
    opacity: 0.3,
  },
  buttons: {
    marginTop: 30,
    alignItems: "flex-end",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: "#f2f3f2",
    padding: 10,
    borderRadius: 15,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtn: {
    backgroundColor: "#f2f3f2",
    padding: 10,
    borderRadius: 15,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    color: "#7F3DFF",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
  },
})
