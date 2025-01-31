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
import * as Localization from "expo-localization"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../../assets/icons/ArrowLeft"

const currency = () => {
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  const currencies = {
    IN: "INR", 
    US: "USD", 
    KR: "KRW", 
    RU: "RUB", 
    SA: "SAR", 
  }

  const defaultCurrency = currencies[Localization.region] || "INR"
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency)

  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem("selectedCurrency")
        setSelectedCurrency(storedCurrency || defaultCurrency)
      } catch (error) {
        console.log("Error loading currency:", error)
      }
    }
    loadCurrency()
  }, [])

  const handleCurrencySelect = async (currencyCode) => {
    try {
      await AsyncStorage.setItem("selectedCurrency", currencyCode)
      setSelectedCurrency(currencyCode)
    } catch (error) {
      console.log("Error saving currency:", error)
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
        <Text style={styles.title}>Currency</Text>
      </View>

      <View style={styles.currencyList}>
        {Object.entries(currencies).map(([countryCode, currencyCode]) => (
          <Pressable
            key={currencyCode}
            style={styles.currencyItem}
            onPress={() => handleCurrencySelect(currencyCode)}
          >
            <Text style={styles.currencyText}>{currencyCode}</Text>

            <View style={styles.radioOuter}>
              {selectedCurrency === currencyCode && (
                <View style={styles.radioInner} />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default currency

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
  currencyList: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  currencyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
  },
  currencyText: {
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
