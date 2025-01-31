import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native"
import ArrowLeftIcon from "../../../assets/icons/ArrowLeft"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import MenuIcon from "../../../assets/icons/Menu"
import LottieView from "lottie-react-native"
import { useRouter } from "expo-router";

const Notification = () => {
  const [menuVisible, setMenuVisible] = useState(false)
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

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New expense added.",
      description: "You have to pay for the Groceries",
      time: "19:00",
      read: false,
    },
    {
      id: "2",
      title: "Subscription due!",
      description: "Netflix subscription renewal today.",
      time: "12:30",
      read: true,
    },
    {
      id: "3",
      title: "Salary credited!",
      description: "Your monthly salary has been credited.",
      time: "09:00",
      read: false,
    },
  ])

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
    setMenuVisible(false)
  }

  const handleRemoveAll = () => {
    setNotifications([])
    setMenuVisible(false)
  }

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationBox}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <Text
          style={[
            styles.notificationTextMain,
            {
              fontWeight: item.read ? "normal" : "bold",
              color: item.read ? "#666" : "black",
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.notificationTextSub,
            {
              fontWeight: item.read ? "normal" : "bold",
              color: item.read ? "#666" : "black",
            },
          ]}
        >
          {item.description}
        </Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <ArrowLeftIcon
            height={30}
            width={30}
            color="black"
            strokeWidth={2}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <MenuIcon width={30} height={30} color="black" strokeWidth="2" />
          </TouchableOpacity>
        </View>

        {menuVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.menuItemOne}
              onPress={handleMarkAllAsRead}
            >
              <Text style={styles.menuText}>Mark all as read</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemTwo}
              onPress={handleRemoveAll}
            >
              <Text style={styles.menuText}>Remove all</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationContainer}
          ListEmptyComponent={() => (
            <>
              <View style={styles.noNewNotificationsContainer}>
                <LottieView
                  source={require("../../../assets/Animations/noNotifications.json")}
                  autoPlay
                  loop={true}
                  style={{ width: 350, height: 350 }}
                />
                <Text
                  style={styles.noNewNotificationsText}
                >
                  No new Notifications.
                </Text>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </>
  )
}

export default Notification

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
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    paddingVertical: 5,
    width: 150,
    zIndex: 9,
  },
  menuItemOne: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemTwo: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "black",
  },
  notificationContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
  },
  notificationContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  notificationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTextMain: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  notificationTextSub: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  time: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#999",
  },
  noNewNotificationsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  noNewNotificationsText: {
    fontSize: 28,
    fontFamily: "Poppins_500Medium",
    color: "#7F3DFF",
    textAlign: "center",
    marginBottom: 20,
    textAlign: "center",
    overflow: 'visible'
  }
})
