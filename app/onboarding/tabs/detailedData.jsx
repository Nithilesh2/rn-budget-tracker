import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import React, { useContext, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native"
import ArrowLeftIcon from "../../../assets/icons/ArrowLeft"
import Dustbin from "../../../assets/icons/Dustbin"
import { AppContext } from "../../../context/AppContext"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { useFonts } from "expo-font"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../../../firebase/firebaseConfig"
import Toast from "react-native-root-toast"
import { useEffect } from "react"
import Modal from "react-native-modal"

const DetailedData = () => {
  const {
    userData,
    storedUserId,
    options,
    handleDeleteTransaction,
    setModalVisible,
    isModalVisible,
  } = useContext(AppContext)
  const { id } = useLocalSearchParams()
  const router = useRouter()

  useFonts({ Poppins_400Regular, Poppins_500Medium, Ubuntu_500Medium })

  const transaction = userData.find((user) => user.id === id)
  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Transaction not found!</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.goBackButton}
          >
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState(transaction.description || "")

  const formattedDate = new Date(
    transaction.timestamp.seconds * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const day = new Date(transaction.timestamp.seconds * 1000).getDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th"

  const formattedTime = new Date(
    transaction.timestamp.seconds * 1000
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const finalFormattedDate = `${formattedDate.replace(
    /\d+/,
    day + suffix
  )} ${formattedTime}`

  const updateTransaction = async () => {
    try {
      setLoading(true)
      const userDocRef = doc(firestore, "users", storedUserId)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        let expenses = userDocSnap.data().expenses || []

        const index = expenses.findIndex((expense) => expense.id === id)
        if (index !== -1) {
          expenses[index] = {
            ...expenses[index],
            description: description,
          }
          await updateDoc(userDocRef, { expenses })

          setIsEditing(false)
        } else {
          Toast.show("Transaction not found", options)
          console.error("Transaction not found")
        }
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setDescription(transaction.description || "")
    setIsEditing(false)
  }, [transaction])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.top}>
            <ArrowLeftIcon
              height={30}
              width={30}
              color="white"
              strokeWidth={2}
              onPress={() => router.replace("onboarding/tabs/transactions")}
            />

            <Text style={styles.title}>Detailed Transaction</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalVisible(true)}
            >
              <Dustbin height={30} width={30} color="white" fill="none" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <View style={styles.bTop}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>₹{transaction.amount}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{finalFormattedDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.boxContainer}>
            <View style={styles.left}>
              <Text style={styles.topC}>Type</Text>
              <Text style={styles.bottomC}>{transaction.method}</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.topC}>Category</Text>
              <Text style={styles.bottomC}>{transaction.categoryType}</Text>
            </View>
          </View>

          <View style={styles.descContainer}>
            <Text
              style={[
                styles.topC,
                { fontSize: 16, marginTop: 15, paddingHorizontal: 20 },
              ]}
            >
              Description
            </Text>
            {isEditing ? (
              <TextInput
                style={styles.descTextInput}
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Enter description..."
                multiline
              />
            ) : (
              <Text style={styles.descText}>{description}</Text>
            )}
          </View>
        </View>

        <View style={styles.editContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.editContainerBox}
            onPress={() => {
              if (isEditing) {
                updateTransaction()
              } else {
                setIsEditing(true)
              }
            }}
          >
            <Text style={styles.buttonText}>
              {isEditing ? (
                loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  "Save"
                )
              ) : (
                "Edit Transaction"
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
          style={styles.modal}
          backdropOpacity={0.5}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTextOne}>Remove this transaction?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this transaction?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  handleDeleteTransaction(id)
                  setModalVisible(false)
                }}
              >
                <Text style={[styles.modalButtonText, { color: "white" }]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default DetailedData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  containerTop: {
    paddingVertical: 25,
    height: 250,
    backgroundColor: "rgb(253, 60, 74)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    color: "white",
    textAlign: "center",
    width: "80%",
  },
  bottom: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: "100%",
    flex: 1,
  },
  bTop: {
    marginBottom: 15,
  },
  amountContainer: {
    width: "100%",
    alignItems: "center",
    paddingRight: 10,
  },
  amountText: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 50,
    color: "white",
  },
  dateContainer: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
  },
  dateText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "white",
    marginVertical: 20,
  },
  containerBottom: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: "100%",
    alignItems: "center",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    height: 70,
    width: "90%",
    borderRadius: 10,
    position: "absolute",
    top: -40,
    elevation: 4,
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    justifyContent: "center",
    alignItems: "center",
  },
  topC: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#9B9B9B",
    marginVertical: 3,
  },
  bottomC: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#212121",
  },
  descContainer: {
    borderTopWidth: 1,
    width: "100%",
    borderStyle: "dashed",
    borderColor: "#9B9B9B",
    marginVertical: 25,
  },
  descText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  descTextInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginHorizontal: 20,
    textAlignVertical: "top",
  },
  editContainer: {
    width: "100%",
    paddingVertical: 25,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  editContainerBox: {
    height: 50,
    backgroundColor: "#7F3DFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 4,
    width: "90%",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: "red",
  },
  goBackButton: {
    marginTop: 10,
  },
  goBackText: {
    fontSize: 16,
    color: "blue",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    position: "absolute",
    top: 20,
  },
  modalTextOne: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    paddingBottom: 2,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#7F3DFF",
  },
  modalButtonText: {
    fontSize: 18,
    color: "#7F3DFF",
    fontWeight: "bold",
  },
})
