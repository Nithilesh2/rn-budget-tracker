import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import Navbar from "../components/Navbar"
import DateTimePicker from "@react-native-community/datetimepicker"
import Toast from "react-native-toast-message"

const Track = () => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [spents, setSpents] = useState(500)
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date
      setDate(currentDate)
    }
    setShow(false)
  }

  const showDatepicker = () => {
    setShow(true)
  }

  const searchBtnClicked = () => {
    if (!category && !amount) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill in all fields before searching.",
        topOffset: 10,
        text1Style: {
          fontSize: 16,
        },
        text2Style: {
          fontSize: 14,
          fontWeight: "bold",
        },
        swipeable: true
      })
      return
    }
    Toast.show({
      type: "success",
      text1: "Search Successful",
      text2: `Category: ${category}, Amount: ${amount}`,
      topOffset: 10,
      text1Style: {
        fontSize: 16,
      },
      text2Style: {
        fontSize: 14,
        fontWeight: "bold",
      },
    })
  }

  const clearFilters = () => {
    setCategory("")
    setAmount("")
    setDate(new Date())
    Toast.show({
      type: "info",
      text1: "Filters Cleared",
      topOffset: 10,
      text1Style: {
        fontSize: 16,
      },
      swipeable: true
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar pageName="Track" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bottom}>
          <View style={styles.input}>
            <TextInput
              placeholder="Category"
              style={styles.inputBox}
              selectionColor="green"
              keyboardType="default"
              value={category}
              onChangeText={(text) => setCategory(text)}
            />
            <TextInput
              placeholder="Amount"
              style={styles.inputBox}
              selectionColor="green"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={searchBtnClicked}
            >
              <Text style={styles.addBtn}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterBox}>
            <Text style={styles.filterName}>Filter</Text>
          </View>
          <View style={styles.sortByBox}>
            <Text style={styles.sortBy}>Sort By Price</Text>
            <View style={styles.btns}>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.loh}>Low To Hight</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.loh}>High To low</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sortByBox}>
            <Text style={styles.sortBy}>Sort By Created/Updated(ALL)</Text>
            <View style={styles.btns}>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.loh}>Created</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.loh}>Updated</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sortByBox}>
            <Text style={styles.sortBy}>Sort By Date</Text>
            <View style={styles.btns}>
              <TouchableOpacity onPress={showDatepicker} style={styles.dateBtn}>
                <Text style={styles.dateText}>Select Date</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
              <Text style={styles.pickedDate}>
                Picked Date: {date.toLocaleDateString("en-GB")}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={clearFilters}>
            <Text style={styles.addBtn}>Clear</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <View style={styles.spentsBox}>
            <Text style={styles.spentsText}>Spents: ₹{spents}</Text>
          </View>
          <Text style={styles.myExpenses}>My Expenses</Text>
          <View style={styles.horizontalLine} />
          <View style={styles.aboutHeader}>
            <Text style={styles.sharedAboutHeaders}>Category</Text>
            <Text style={styles.sharedAboutHeaders}>Amount</Text>
            <Text style={styles.sharedAboutHeaders}>Created Date</Text>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d898d7",
    height: "100%",
  },
  bottom: {
    height: "100%",
    width: "100%",
    marginTop: 40,
    alignItems: "center",
  },
  input: {
    height: "auto",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  inputBox: {
    height: 46,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 17,
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: "white",
    fontWeight: "bold",
  },
  addButton: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
  },
  addBtn: {
    width: 100,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterBox: {
    height: 50,
    width: "90%",
    backgroundColor: "rgba(49, 49, 49, .729)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterName: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  sortByBox: {
    height: "auto",
    width: "90%",
    alignItems: "start",
    justifyContent: "center",
  },
  sortBy: {
    height: "auto",
    width: "100%",
    fontSize: 21,
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
    marginTop: 30,
    flexDirection: "row",
  },
  btns: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sortBtn: {
    height: 35,
    width: 120,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  loh: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  dateBtn: {
    backgroundColor: "white",
    height: 35,
    width: 120,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    paddingTop: 5,
  },
  pickedDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 10,
  },
  horizontalLine: {
    height: 2,
    width: "93%",
    backgroundColor: "black",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  spentsBox: {
    height: 50,
    width: "90%",
    backgroundColor: "#d4d4d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  spentsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  myExpenses: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: "-15",
  },
  aboutHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  sharedAboutHeaders: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    height: 26,
    marginTop: 10,
  },
})

export default Track
