import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

const DetailedData = () => {
  const { userData } = useContext(AppContext)
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
            <Dustbin height={30} width={30} color="white" fill="none" />
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
                onChangeText={setDescription}
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
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.buttonText}>
              {isEditing ? "Save" : "Edit Transaction"}
            </Text>
          </TouchableOpacity>
        </View>
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
})
