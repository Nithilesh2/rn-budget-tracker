import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native"
import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../../assets/icons/ArrowLeft"

const Security = () => {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState(null)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  useEffect(() => {
    const loadSelectedOption = async () => {
      try {
        const storedOption = await AsyncStorage.getItem("selectedSecurity")
        if (storedOption) {
          setSelectedOption(storedOption) 
        }
      } catch (error) {
        console.log("Error loading security option:", error)
      }
    }
    loadSelectedOption()
  }, [])

  const handleSecurityOptionSelect = async (option) => {
    if (!option) {
      console.log("Invalid security option selected:", option)
      return
    }

    try {
      await AsyncStorage.setItem("selectedSecurity", option)
      setSelectedOption(option) 
    } catch (error) {
      console.log("Error saving security option:", error)
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
})
