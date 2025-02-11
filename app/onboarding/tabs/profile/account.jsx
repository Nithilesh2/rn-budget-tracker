import {
  ActivityIndicator,
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState, useRef, useContext } from "react"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft"
import PencilEditIcon from "../../../../assets/icons/Pencil"
import icons from "../../../../components/Icons"
import { AppContext } from "../../../../context/AppContext"
import EyeCloseIcon from "../../../../assets/icons/EyeClose"
import EyeOpenIcon from "../../../../assets/icons/EyeOpen"

const Account = () => {
  const {
    selectedIcon,
    setSelectedIcon,
    name,
    setName,
    email,
    handleUpdate,
    handleCancel,
    accountLoading,
    setOldPassword,
    setNewPassword,
    oldPassword,
    newPassword
  } = useContext(AppContext)
  const [edit, setEdit] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

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

  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current

  const toggleEdit = () => {
    if (!edit) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          speed: 8,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setEdit(false))
    }
    setEdit(!edit)
  }

  return (
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
            <Image source={selectedIcon} style={styles.userImg} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.editSymbol}
              onPress={toggleEdit}
            >
              <PencilEditIcon width={30} height={30} color="black" />
            </TouchableOpacity>
          </View>

          {edit && (
            <Animated.View
              style={[
                styles.imageSelectionBox,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
              ]}
            >
              {icons.map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedIcon(icon)
                    toggleEdit()
                  }}
                  style={styles.iconWrapper}
                >
                  <Image source={icon} style={styles.icon} />
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          <View style={styles.detailsContainer}>
            <View style={styles.nameAndEmailContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="Enter Name"
                style={styles.inputBox}
                keyboardType="name-phone-pad"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>

            <View style={styles.nameAndEmailContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter email"
                style={[styles.inputBox, { color: "grey" }]}
                keyboardType="email-address"
                editable={false}
                value={email}
              />
            </View>
            <Text style={styles.PasswordTitle}>Change Password</Text>
            <View style={styles.inputPassBox}>
              <TextInput
                style={styles.inputText}
                placeholder="Old Password"
                secureTextEntry={showOldPassword ? false : true}
                onChangeText={(text) => setOldPassword(text)}
                value={oldPassword}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowOldPassword(!showOldPassword)}
                style={styles.showPassIcon}
              >
                {showOldPassword ? (
                  <EyeCloseIcon width="26" height="26" />
                ) : (
                  <EyeOpenIcon width="26" height="26" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputPassBox}>
              <TextInput
                style={styles.inputText}
                placeholder="New Password"
                secureTextEntry={showNewPassword ? false : true}
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.showPassIcon}
              >
                {showNewPassword ? (
                  <EyeCloseIcon width="26" height="26" />
                ) : (
                  <EyeOpenIcon width="26" height="26" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleUpdate}>
              <Text style={styles.updateBtn}>
                {accountLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  "Update"
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={handleCancel}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Account

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
  },
  imageSelectionBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    top: 180,
    zIndex: 999,
    left: 20,
    right: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    width: "100%",
  },
  iconWrapper: {
    margin: 5,
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  nameAndEmailContainer: {
    marginBottom: 5,
  },
  PasswordTitle:{
    width: "100%",
    textAlign: "center",
    fontSize: 21,
    fontFamily: "Poppins_500Medium",
    color: "black",
    marginVertical: 10,
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
  inputText: {
    height: 50,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    paddingHorizontal: 17,
    borderRadius: 10,
    fontSize: 16,
    width: "100%",
    marginVertical: 10,
    fontFamily: "Poppins_400Regular",
  },
  inputPassBox: {
    borderColor: "#D3D3D3",
    flexDirection: "row",
    position: "relative",
    width: "100%",
  },
  showPassIcon: {
    position: "absolute",
    right: 10,
    top: 20,
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
    width: 120,
    textAlign: "center",
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
    width: 120,
    textAlign: "center",
  },
})
