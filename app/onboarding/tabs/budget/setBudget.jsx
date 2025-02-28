import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useContext } from "react"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import { useRouter } from "expo-router"
import Toast from "react-native-root-toast"
import { AppContext } from "../../../../context/AppContext"
import { ActivityIndicator } from "react-native"
import currencySymbols from "../../../../components/CurrencySymbols"

const setBudget = () => {
  const { options, handleContinue, setBudget, budgetLoading, currencyType } =
    useContext(AppContext)
  const router = useRouter()
  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  const handleBack = () => {
    router.back()
    Toast.show("Cancelled budget change", options)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <ArrowLeftIcon
          height={30}
          width={30}
          color="white"
          strokeWidth={2}
          onPress={handleBack}
        />
        <Text style={styles.title}>Set Budget</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          Enter your desired monthly budget:
        </Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.rupeeSymbolText}>
            {currencySymbols[currencyType] || "₹"}
          </Text>
          <TextInput
            placeholder="0"
            style={styles.amountInput}
            keyboardType="numeric"
            placeholderTextColor="white"
            maxLength={7}
            onChangeText={(text) => {
              let numericValue = text.replace(/[^0-9]/g, "")
              if (numericValue === "") {
                setBudget("")
              } else {
                setBudget(text)
              }
            }}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.buttonContainer}
          onPress={handleContinue}
        >
          <Text style={styles.saveButton}>
            {budgetLoading ? (
              <ActivityIndicator size="large" color="#7F3DFF" />
            ) : (
              "Continue"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default setBudget

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F3DFF",
    paddingVertical: 25,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Ensure scrollable content is not hidden
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
    color: "white",
  },
  amountContainer: {
    paddingHorizontal: 25,
    paddingTop: 170,
    marginBottom: 30,
  },
  amountText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  amountInputContainer: {
    width: "100%",
    flexDirection: "row",
  },
  rupeeSymbolText: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 60,
    color: "white",
    marginTop: 12,
  },
  amountInput: {
    flex: 1,
    fontFamily: "Ubuntu_500Medium",
    fontSize: 62,
    color: "white",
    marginLeft: 10,
  },
  bottomContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    height: 150,
    paddingHorizontal: 25,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
    marginBottom: 10,
    height: 50,
  },
  saveButton: {
    color: "#7F3DFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    textAlign: "center",
  },
})
