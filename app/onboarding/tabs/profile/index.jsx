import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import React, {  useContext, useState } from "react"
import {  useRouter } from "expo-router"
import { SafeAreaView } from "react-native"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import AccountIcon from "./../../../../assets/icons/Account"
import SettingsIcon from "./../../../../assets/icons/Settings"
import ExportIcon from "./../../../../assets/icons/Export"
import LogoutIcon from "./../../../../assets/icons/Logout"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../../../../context/AppContext";

const index = () => {
  const { selectedIcon, name, email } = useContext(AppContext)
  const [showLogout, setShowLogout] = useState(false)
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedIn")
      await AsyncStorage.removeItem("userId")
      await AsyncStorage.removeItem("userName")
      await AsyncStorage.removeItem("userEmail")
      router.replace("onboarding/login")
    } catch (error) {
      console.error(error)
    }
  }

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
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { opacity: showLogout ? 0.2 : 1 },
          ]}
        >
          <View style={styles.top}>
            <View style={styles.topLeftContainer}>
              <View style={styles.userIconContainer}>
                <Image
                  source={selectedIcon}
                  style={styles.userImg}
                />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.userNameText}>{name}</Text>
                <Text style={styles.userEmailText}>{email}</Text>
              </View>
            </View>
          </View>

          <View
            style={[styles.bottomContainer, { elevation: showLogout ? 0 : 5 }]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containers}
              onPress={() => router.push("/onboarding/tabs/profile/account")}
            >
              <View style={styles.iconBox}>
                <AccountIcon width={34} height={34} color="#7F3DFF" />
              </View>
              <Text style={styles.containerText}>Edit Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containers}
              onPress={() => router.push("/onboarding/tabs/profile/settings")}
            >
              <View style={styles.iconBox}>
                <SettingsIcon width={34} height={34} color="#7F3DFF" />
              </View>
              <Text style={styles.containerText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containers}
              onPress={() => router.push("/onboarding/tabs/profile/export")}
            >
              <View style={styles.iconBox}>
                <ExportIcon width={34} height={34} color="#7F3DFF" />
              </View>
              <Text style={styles.containerText}>Export</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containers}
              onPress={() => setShowLogout(true)}
            >
              <View style={styles.iconBoxLogout}>
                <LogoutIcon width={34} height={34} color="red" />
              </View>
              <Text style={styles.containerText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {showLogout && (
          <>
            <View style={styles.overlay} />
            <View style={styles.logoutContainer}>
              <Text style={styles.logout}>Logout</Text>
              <Text style={styles.logoutText}>
                Are you sure you want to logout?
              </Text>
              <View style={styles.logoutButtonsContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.logoutButtonNo}
                  onPress={() => setShowLogout(false)}
                >
                  <Text style={styles.logoutButtonTextNo}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.logoutButtonYes}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonTextYes}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

export default index

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 17,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 20
  },
  topLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userIconContainer: {
    borderRadius: 50,
    padding: 5,
  },
  userImg:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#F2F2F2",
  },
  userNameContainer: {
    width: "100%",
  },
  userNameText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "black",
  },
  userEmailText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#7F3DFF",
  },
  pencilContainer: {
    position: "absolute",
    right: 15,
    bottom: 10,
    padding: 5,
  },
  bottomContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 30,
    width: "95%",
    alignSelf: "center",
  },
  containers: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 20,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(127, 61, 255,0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconBoxLogout: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255, 0, 0,0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  containerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
    marginLeft: 10,
    textTransform: "capitalize",
  },
  logout: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "black",
    marginBottom: 15,
    marginLeft: 10,
    textAlign: "center",
    width: "100%",
  },
  logoutContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 5,
    width: "100%",
    alignSelf: "center",
    zIndex: 9999,
    position: "absolute",
    bottom: 0,
    height: 200,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 999,
  },
  logoutText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "grey",
    textAlign: "center",
    marginBottom: 15,
  },
  logoutButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    marginTop: 10,
    width: "100%",
  },
  logoutButtonNo: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 10,
    width: 130,
  },
  logoutButtonYes: {
    backgroundColor: "#7F3DFF",
    padding: 10,
    borderRadius: 10,
    width: 130,
  },
  logoutButtonTextNo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#7F3DFF",
    textAlign: "center",
  },
  logoutButtonTextYes: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
})
