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
import Toast from "react-native-root-toast"
import { AppContext } from "../../../../../context/AppContext"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../../../../../firebase/firebaseConfig"
import { ScrollView } from "react-native"

const { height } = Dimensions.get("screen")

const Currency = () => {
  const { options, storedUserId } = useContext(AppContext)
  const currencies = {
    India: "INR",
    USA: "USD",
    "South Korea": "KRW",
    Russia: "RUB",
    "Saudi Arabia": "SAR",
    "European Union": "EUR",
    "United Kingdom": "GBP",
    Japan: "JPY",
    Australia: "AUD",
    Canada: "CAD",
    China: "CNY",
    Switzerland: "CHF",
    Singapore: "SGD",
    "Hong Kong": "HKD",
    "New Zealand": "NZD",
    "South Africa": "ZAR",
    Mexico: "MXN",
    Brazil: "BRL",
    Turkey: "TRY",
    Sweden: "SEK",
    Norway: "NOK",
    Denmark: "DKK",
    Malaysia: "MYR",
    Thailand: "THB",
    Indonesia: "IDR",
    Philippines: "PHP",
    Vietnam: "VND",
  }

  const defaultCurrency = currencies[Localization.region] || "INR"
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency)
  const [savedCurrency, setSavedCurrency] = useState(defaultCurrency)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  useEffect(() => {
    Toast.show("Values may vary based on the selected currency.", options)
    const loadCurrency = async () => {
      try {
        if (!storedUserId) {
          Toast.show("User ID not found", options)
          return
        }
        setLoading(true)
        const userRef = doc(firestore, "users", storedUserId)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          const userCurrency = userData.currency || "INR"

          setSavedCurrency(userCurrency)
          setSelectedCurrency(userCurrency)
        } else {
          Toast.show("User document not found", options)
        }
        setLoading(false)
      } catch (error) {
        console.log("Error loading currency from Firestore:", error)
      } finally {
        setLoading(false)
      }
    }
    if (storedUserId) {
      loadCurrency()
    }
  }, [])

  useEffect(() => {
    const storeCurrency = async () => {
      try {
        await AsyncStorage.setItem("selectedCurrency", savedCurrency)
      } catch (error) {
        console.log("Error saving currency to AsyncStorage:", error)
      }
    }
    storeCurrency()
  }, [savedCurrency])

  const fetchExchangeRates = async (baseCurrency) => {
    const url = `https://v6.exchangerate-api.com/v6/3c6ebfaa3c3f9e1b1de34ffa/latest/${baseCurrency}`
    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.result !== "success" || !data.conversion_rates) {
        throw new Error("Invalid exchange rate data received")
      }
      return data.conversion_rates
    } catch (error) {
      console.error("Error fetching exchange rates:", error)
      return null
    }
  }

  const convertCurrency = (amount, fromCurrency, toCurrency, exchangeRates) => {
    if (fromCurrency === toCurrency) return amount
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]
    return amount * rate
  }

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode)
  }

  const handleSave = async () => {
    try {
      if (!storedUserId) {
        console.log("User ID not found")
        return
      }
      setLoading(true)

      const userRef = doc(firestore, "users", storedUserId)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        Toast.show("User document not found", options)
        return
      }

      const userData = userDoc.data()
      const {
        budget,
        expenses,
        totalExpensesAmount,
        totalIncomeAmount,
        currency: currentCurrency,
      } = userData

      const exchangeRates = await fetchExchangeRates(currentCurrency)
      if (!exchangeRates) {
        Toast.show("Failed to fetch exchange rates", options)
        return
      }

      const convertedBudget = convertCurrency(
        budget,
        currentCurrency,
        selectedCurrency,
        exchangeRates
      )

      const convertedExpenses = expenses.map((expense) => ({
        ...expense,
        amount: convertCurrency(
          expense.amount,
          currentCurrency,
          selectedCurrency,
          exchangeRates
        ),
      }))

      const convertedTotalExpenses = convertCurrency(
        totalExpensesAmount,
        currentCurrency,
        selectedCurrency,
        exchangeRates
      )

      const convertedTotalIncome = convertCurrency(
        totalIncomeAmount,
        currentCurrency,
        selectedCurrency,
        exchangeRates
      )

      await updateDoc(userRef, {
        currency: selectedCurrency,
        budget: convertedBudget,
        expenses: convertedExpenses,
        totalExpensesAmount: convertedTotalExpenses,
        totalIncomeAmount: convertedTotalIncome,
        prevCurrency: savedCurrency,
      })

      setSavedCurrency(selectedCurrency)
      Toast.show("Currency updated successfully!", options)
      router.back()
    } catch (error) {
      console.log("Error updating currency:", error)
      Toast.show("Failed to update currency", options)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setSelectedCurrency(savedCurrency)
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <ArrowLeftIcon
          height={30}
          width={30}
          color="black"
          strokeWidth={2}
          onPress={handleBack}
        />
        <Text style={styles.title}>Currency</Text>
      </View>

      <ScrollView style={styles.currencyList}>
        {Object.entries(currencies).map(([countryName, currencyCode]) => (
          <Pressable
            key={currencyCode}
            style={styles.currencyItem}
            onPress={() => handleCurrencySelect(currencyCode)}
          >
            <Text style={styles.currencyText}>{countryName}</Text>
            <View style={styles.radioOuter}>
              {selectedCurrency === currencyCode && (
                <View style={styles.radioInner} />
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.8}
        onPress={handleSave}
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

export default Currency

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
    marginBottom: 65,
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
  saveButton: {
    backgroundColor: "#7F3DFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
    position: "absolute",
    bottom: height * 0.04,
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
