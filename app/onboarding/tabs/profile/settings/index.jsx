import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native"
import React, { useState, useCallback } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter, useFocusEffect } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../../assets/icons/ArrowLeft"
import ArrowRightIcon from "./../../../../../assets/icons/ArrowRight"

const index = () => {
  const router = useRouter()
  const [selectedCurrency, setSelectedCurrency] = useState("INR")
  const [selectedSecurity, setSelectedSecurity] = useState("PIN")

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  useFocusEffect(
    useCallback(() => {
      const loadCurrency = async () => {
        try {
          const storedCurrency = await AsyncStorage.getItem("selectedCurrency")
          const storedSecurity = await AsyncStorage.getItem("selectedSecurity")
          if (storedCurrency) {
            setSelectedCurrency(storedCurrency)
          }
          if (storedSecurity) {
            setSelectedSecurity(storedSecurity)
          }
        } catch (error) {
          console.log("Error loading currency:", error)
        }
      }
      loadCurrency()
    }, [])
  )

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7F3DFF" />
      </View>
    )
  }

  const openLinkedIn = () => {
    const url = "https://www.linkedin.com/in/bejagam-nithilesh/"
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    )
  }
  const sendEmail = () => {
    const email = "sunnybnithilesh@gmail.com"
    const subject = "Inquiry from Budget Tracker App"
    const body = "Hello Nithilesh, "
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    Linking.openURL(mailto)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <ArrowLeftIcon
          height={30}
          width={30}
          color="black"
          strokeWidth={2}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.bottomSettings}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.boxesSetting}
          onPress={() =>
            router.push("/onboarding/tabs/profile/settings/currency")
          }
        >
          <Text style={styles.boxTitle}>Currency</Text>
          <View style={styles.boxContent}>
            <Text style={styles.boxText}>{selectedCurrency}</Text>
            <ArrowRightIcon
              width={30}
              height={30}
              color="#7F3DFF"
              strokeWidth={2}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.boxesSetting}>
          <Text style={styles.boxTitle}>Language</Text>
          <View style={styles.boxContent}>
            <Text style={[styles.boxText, { marginRight: 20 }]}>English</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.boxesSetting}
          onPress={() =>
            router.push("/onboarding/tabs/profile/settings/security")
          }
        >
          <Text style={styles.boxTitle}>Security</Text>
          <View style={styles.boxContent}>
            <Text style={styles.boxText}>{selectedSecurity}</Text>
            <ArrowRightIcon
              width={30}
              height={30}
              color="#7F3DFF"
              strokeWidth={2}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.boxesSetting, { borderBottomWidth: 0 }]}
          onPress={() =>
            router.push("/onboarding/tabs/profile/settings/notification")
          }
        >
          <Text style={styles.boxTitle}>Notification</Text>
          <View style={styles.boxContent}>
            <ArrowRightIcon
              width={30}
              height={30}
              color="#7F3DFF"
              strokeWidth={2}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSupport}>
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>Support</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={openLinkedIn}>
              <Text style={styles.supportLink}>LinkedIn</Text>
            </TouchableOpacity>
            <Text>,</Text>
            <TouchableOpacity onPress={sendEmail}>
              <Text style={styles.supportLink}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.versionText}>Budget Tracker</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingVertical: 25,
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
  },
  bottomSettings: {
    paddingHorizontal: 15,
    width: "100%",
    marginTop: 30,
  },
  boxesSetting: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#E6E6E6",
    paddingVertical: 20,
  },
  boxTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
  },
  boxContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "70%",
  },
  boxText: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 16,
    color: "grey",
    marginLeft: 10,
  },
  bottomSupport: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    alignItems: "center",
  },
  supportContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  supportText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  supportLink: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#7F3DFF",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  versionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 15,
  },
  versionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "grey",
    marginBottom: 5,
  },
})
