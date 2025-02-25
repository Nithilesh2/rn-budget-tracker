import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../../assets/icons/ArrowLeft"
import Toast from "react-native-root-toast"
import { AppContext } from "../../../../../context/AppContext"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../../../../../firebase/firebaseConfig"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { height } = Dimensions.get("screen")

const Security = () => {
  const { options, storedUserId } = useContext(AppContext)
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState("PIN")
  const [securityData, setSecurityData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  useEffect(() => {
    const loadSecuritySettings = async () => {
      try {
        if (!storedUserId) return
        const userRef = doc(firestore, "users", storedUserId)
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
          const userData = userDoc.data()
          const securitySettings = userData.security || {}
          setSecurityData(securitySettings)
          const selected = Object.keys(securitySettings).find(
            (key) => securitySettings[key]?.enabled === true
          )
          const finalSelection = selected || "PIN"
          setSelectedOption(finalSelection)
          await AsyncStorage.setItem("selectedSecurity", finalSelection)
        }
      } catch (error) {
        console.log("Error loading security settings from Firestore:", error)
      }
    }
    if (storedUserId) loadSecuritySettings()
  }, [storedUserId])

  const handleSecurityOptionSelect = async (option) => {
    if (!option || !securityData) return
    setSelectedOption(option)
    await AsyncStorage.setItem("selectedSecurity", option)
  }

  const handleSave = async () => {
    if (!storedUserId || !selectedOption || !securityData) return
    setLoading(true)
    try {
      const userRef = doc(firestore, "users", storedUserId)
      const updatedSecurity = {
        pin: { ...securityData.pin, enabled: selectedOption === "PIN" },
        fingerprint: {
          ...securityData.fingerprint,
          enabled: selectedOption === "Fingerprint",
        },
        faceid: {
          ...securityData.faceid,
          enabled: selectedOption === "Face ID",
        },
      }
      await updateDoc(userRef, { security: updatedSecurity })
      Toast.show(`Security changed to ${selectedOption}`, options)
      router.back()
    } catch (error) {
      console.log("Error updating security settings:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7F3DFF" />
      </View>
    )
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
        <Text style={styles.title}>Security</Text>
      </View>

      <View style={styles.optionList}>
        {["PIN", "Fingerprint", "Face ID"].map((option) => (
          <Pressable
            key={option}
            style={styles.optionItem}
            onPress={() => handleSecurityOptionSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
            <View style={styles.radioOuter}>
              {selectedOption === option && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        ))}
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.8}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.saveText}>Save</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Security

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
  optionList: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
  },
  optionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#7F3DFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7F3DFF",
  },
  saveButton: {
    backgroundColor: "#7F3DFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
    position: "absolute",
    bottom: height * 0.05,
    width: "90%",
    alignSelf: "center",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "white",
  },
})
