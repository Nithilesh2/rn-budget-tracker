import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Modal,
} from "react-native"
import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { TextInput } from "react-native"
import { TouchableOpacity } from "react-native"
import { FontAwesome5 } from "react-native-vector-icons"

const Expenses = () => {
  const [changeBudget, setChangeBudget] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false)
  const [budgetInput, setBudgetInput] = useState("")

  const handleBudgetChange = () => {
    const newBudget = parseInt(budgetInput)
    if (!isNaN(newBudget)) {
      setChangeBudget(newBudget)
    }
    setBudgetInput("")
    setModalVisible(false)
  }

  const handleBudgetCancel = ()=>{
    setBudgetInput("")
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar pageName="Expenses" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bottom}>
          <View style={styles.input}>
            <TextInput
              placeholder="Category"
              style={styles.inputBox}
              selectionColor="green"
              keyboardType="default"
            />
            <TextInput
              placeholder="Amount"
              style={styles.inputBox}
              selectionColor="green"
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addBtn}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.aboutSpents}>
            <View style={[styles.budget, styles.sharedStylesBudget]}>
              <TouchableOpacity
                style={styles.changeBudgetBtn}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome5 name="pen" size={15} color="black" />
              </TouchableOpacity>
              <Text style={styles.budgetText}>Budget: ₹{changeBudget}</Text>
            </View>
            <View style={[styles.remaining, styles.sharedStylesBudget]}>
              <Text style={styles.budgetText}>Remaining : ₹500</Text>
            </View>
            <View style={[styles.spents, styles.sharedStylesBudget]}>
              <Text style={styles.budgetText}>Spents : ₹500</Text>
            </View>
            <View style={styles.myExpensesBox}>
              <Text style={styles.myExpensesText}>My Expenses</Text>
            </View>
            <View style={styles.horizontalLineAfterExpenses} />
            <View style={styles.aboutHeader}>
              <Text style={styles.sharedAboutHeaders}>Category</Text>
              <Text style={styles.sharedAboutHeaders}>Amount</Text>
              <Text style={styles.sharedAboutHeaders}>Del</Text>
              <Text style={styles.sharedAboutHeaders}>Created Date</Text>
            </View>
            <View style={styles.data}>
              <View style={styles.aboutHeader}>
                <Text style={styles.sharedAboutData}>Water</Text>
                <Text style={styles.sharedAboutData}>500</Text>
                <Text style={styles.sharedAboutData}>Del</Text>
                <Text style={styles.sharedAboutData}>12/12/2024</Text>
              </View>
              <View style={styles.aboutHeader}>
                <Text style={styles.sharedAboutData}>Water</Text>
                <Text style={styles.sharedAboutData}>500</Text>
                <Text style={styles.sharedAboutData}>Del</Text>
                <Text style={styles.sharedAboutData}>12/12/2024</Text>
              </View>
              <View style={styles.aboutHeader}>
                <Text style={styles.sharedAboutData}>Water</Text>
                <Text style={styles.sharedAboutData}>500</Text>
                <Text style={styles.sharedAboutData}>Del</Text>
                <Text style={styles.sharedAboutData}>12/12/2024</Text>
              </View>
              <View style={styles.aboutHeader}>
                <Text style={styles.sharedAboutData}>Water</Text>
                <Text style={styles.sharedAboutData}>500</Text>
                <Text style={styles.sharedAboutData}>Del</Text>
                <Text style={styles.sharedAboutData}>12/12/2024</Text>
              </View>
              <View style={styles.aboutHeader}>
                <Text style={styles.sharedAboutData}>Water</Text>
                <Text style={styles.sharedAboutData}>500</Text>
                <Text style={styles.sharedAboutData}>Del</Text>
                <Text style={styles.sharedAboutData}>12/12/2024</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Budget</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new budget"
              keyboardType="number-pad"
              value={budgetInput}
              onChangeText={setBudgetInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={handleBudgetCancel}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonChange}
                onPress={handleBudgetChange}
              >
                <Text style={styles.modalButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  input: {
    height: 50,
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
  },
  addButton: {
    height: 46,
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
  horizontalLine: {
    height: 2,
    width: "93%",
    backgroundColor: "black",
    alignSelf: "center",
    marginTop: 115,
  },
  horizontalLineAfterExpenses: {
    height: 2,
    width: "93%",
    backgroundColor: "black",
    alignSelf: "center",
  },
  aboutSpents: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
  sharedStylesBudget: {
    height: 46,
    width: "85%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  budget: {
    backgroundColor: "#d4d4d4",
  },
  remaining: {
    backgroundColor: "#b7e7b7",
  },
  spents: {
    backgroundColor: "#ed5e5e",
  },
  budgetText: {
    fontSize: 17,
  },
  changeBudgetBtn: {
    position: "absolute",
    right: 15,
    top: 8,
    borderColor: "black",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  myExpensesBox: {
    height: "auto",
    width: "100%",
    position: "relative",
    marginTop: 16,
  },
  myExpensesText: {
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    fontSize: 26,
  },
  data: {
    width: "100%",
    height: "100%",
    gap: 18,
    marginTop: 18,
    marginBottom: 18,
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
    fontWeight: "condensedBold",
    height: 26,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  modalButtonCancel: {
    backgroundColor: "#ed5e5e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonChange: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
})

export default Expenses
