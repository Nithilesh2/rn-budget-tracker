import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft"
import PencilEditIcon from "./../../../../assets/icons/Pencil"

const account = () => {
  const router = useRouter()
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
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.top}>
            <ArrowLeftIcon
              height={30}
              width={30}
              color="black"
              strokeWidth={2}
              onPress={() => router.back()}
            />
            <Text style={styles.title}>Edit Account</Text>
          </View>

          <View style={styles.bottom}>
            <View style={styles.userImgContainer}>
              <Image
                source={require("../../../../assets/userIcons/child.png")}
                style={styles.userImg}
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.editSymbol}>
                <PencilEditIcon
                  style={styles.userImgContainerEdit}
                  width={30}
                  height={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.nameAndEmailContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Enter Name"
                  style={styles.inputBox}
                  keyboardType="name-phone-pad"
                />
              </View>

              <View style={styles.nameAndEmailContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Enter email"
                  style={styles.inputBox}
                  keyboardType="email-address"
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.9}>
                <Text style={styles.updateBtn}>Update</Text>
              </TouchableOpacity>
              
              <TouchableOpacity activeOpacity={0.9}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default account

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
  scrollContainer: {
    flexGrow: 1,
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
  bottom: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
  },
  userImgContainer: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  userImg: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 30,
  },
  editSymbol: {
    position: "absolute",
    bottom: 0,
    right: 90,
    zIndex: 999,
    backgroundColor: "white",
    borderRadius: 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  nameAndEmailContainer: {
    marginBottom: 5,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "black",
  },
  inputBox: {
    borderWidth: 2,
    borderColor: "#E6E6E6",
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
    fontFamily: "Poppins_400Regular",
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  updateBtn: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "white",
    backgroundColor: "#7F3DFF",
    padding: 10,
    borderRadius: 5,
  },
  cancelBtn: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#7F3DFF",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: "#7F3DFF",
  },
})
