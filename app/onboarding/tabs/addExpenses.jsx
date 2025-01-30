import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native"
import React, { useState, useRef, useEffect } from "react"
import ArrowLeftIcon from "./../../../assets/icons/ArrowLeft"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import { SelectList } from "react-native-dropdown-select-list"
import { useRouter } from "expo-router"

const AddExpenses = () => {
  const [selectedType, setSelectedType] = useState("Expense")
  const [selected, setSelected] = useState("")
  const [amount, setAmount] = useState("");

  const bgColorAnim = useRef(new Animated.Value(0)).current

  const router = useRouter()

  useEffect(() => {
    Animated.timing(bgColorAnim, {
      toValue: selectedType === "Expense" ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [selectedType])

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7F3DFF" />
      </View>
    )
  }

  const data = [
    { key: "1", value: "Food" },
    { key: "2", value: "Groceries" },
    { key: "3", value: "Rent" },
    { key: "4", value: "Fuel" },
    { key: "5", value: "Theatres" },
    { key: "6", value: "Utilities" },
    { key: "7", value: "Shopping" },
    { key: "8", value: "Transportation" },
    { key: "9", value: "Entertainment" },
    { key: "10", value: "Dining Out" },
    { key: "11", value: "Healthcare" },
    { key: "12", value: "Education" },
    { key: "13", value: "Subscriptions" },
    { key: "14", value: "Travel" },
    { key: "15", value: "Others" },
  ]

  const backgroundColor = bgColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(253, 60, 74)", "rgb(0, 168, 107)"],
  })

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={[styles.scrollViewContainer, { backgroundColor }]}
      >
        <View style={styles.top}>
          <ArrowLeftIcon
            height={30}
            width={30}
            color="white"
            strokeWidth={2}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Add Expense / Income</Text>
        </View>

        <View style={styles.segmentContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              selectedType === "Expense" && styles.expenseActiveButton,
            ]}
            onPress={() => setSelectedType("Expense")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedType === "Expense" && styles.expenseButtonText,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.segmentButton,
              selectedType === "Income" && styles.incomeActiveButton,
            ]}
            onPress={() => setSelectedType("Income")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedType === "Income" && styles.incomeButtonText,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>How much?</Text>
          <View style={styles.amountTextContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              placeholder="0"
              style={styles.amountTextInput}
              keyboardType="numeric"
              placeholderTextColor="white"
              value={amount}
              maxLength={7}
              onChangeText={(text) => {
                let numericValue = text.replace(/[^0-9]/g, "")

                if (numericValue === "") {
                  setAmount("")
                } else {
                  let num = parseInt(numericValue, 10)
                  if (num > 1000000) {
                    setAmount("1000000") 
                  } else {
                    setAmount(numericValue)
                  }
                }
              }}
            />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder="Choose Category"
            boxStyles={styles.selectBox}
            inputStyles={styles.selectInput}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
          />
          <TextInput
            placeholder="Description"
            style={styles.descriptionTextInput}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.9}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default AddExpenses

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    paddingVertical: 25,
  },
  expenseContainer: {
    backgroundColor: "rgb(253, 60, 74)",
  },
  incomeContainer: {
    backgroundColor: "rgb(0, 168, 107)",
  },
  expenseButtonText: {
    color: "white",
  },
  incomeButtonText: {
    color: "white",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  expenseActiveButton: {
    backgroundColor: "rgb(253, 60, 74)",
    borderWidth: 2,
    borderColor: "white",
  },
  incomeActiveButton: {
    backgroundColor: "rgb(0, 168, 107)",
    borderWidth: 2,
    borderColor: "white",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  segmentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#7F3DFF",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 25,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  activeSegment: {
    borderBottomWidth: 3,
    borderColor: "#7F3DFF",
  },
  segmentText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  amountContainer: {
    marginVertical: 25,
    width: "100%",
    paddingHorizontal: 30,
  },
  amountText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 24,
    textAlign: "left",
    color: "white",
  },
  amountTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  rupeeSymbol: {
    fontSize: 65,
    color: "white",
    fontFamily: "Ubuntu_500Medium",
    paddingHorizontal: 5,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 60,
    color: "white",
    fontFamily: "Ubuntu_500Medium",
    paddingVertical: 0,
    marginLeft: 5,
  },
  descriptionContainer: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 50,
    height: "100%",
    marginTop: 20,
  },
  selectBox: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  selectInput: {
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins_400Regular",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
  },
  dropdownText: {
    color: "black",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  descriptionTextInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
    borderColor: "black",
    borderWidth: 1.5,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    transition: "border-color 0.3s",
    height: 80,
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#7F3DFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  submitButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    width: "100%",
  },
})
