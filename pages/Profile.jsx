import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import React from "react"
import Icon from "react-native-vector-icons/Ionicons"

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.top}>
          <View style={styles.profilePicBox}>
            <Icon name="person-outline" style={styles.profilePic} />
          </View>
          <View style={styles.userNameBox}>
            <Text style={styles.userName}>test1</Text>
            <Text style={styles.userNameEmail}>test@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.logoutBox}>
          <View style={styles.logoutLogo}>
            <Icon name="log-out-outline" size={40} color="red" />
          </View>
          <View>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d898d7",
    height: "100%",
  },
  hero: {
    flex: 1,
    paddingTop: 45,
    paddingLeft: 30,
  },
  top: {
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  profilePicBox: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    fontSize: 36,
  },
  userNameBox: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
  },
  userNameEmail: {
    fontSize: 18,
  },
  bottom: {
    height: "76%",
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  logoutBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-end",
    paddingHorizontal: 140,
    width: '100%',
    alignContent: "center",
    paddingBottom: 40,
  },
  logoutButton: {
    paddingBottom: 10,
  },
  logoutText: {
    fontSize: 20
  }
})

export default Profile
