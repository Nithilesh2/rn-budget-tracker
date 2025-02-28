import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import { Alert } from "react-native"

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

// Register for push notifications
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Error", "Push notifications only work on a real device");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return null;
  }

  const { data: token } = await Notifications.getExpoPushTokenAsync();

  return token;
}


// Send a push notification
export async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
  }

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
}

// Notification Listeners
export function setupNotificationListeners() {
  Notifications.addNotificationReceivedListener((notification) => {
    console.log("📩 Notification Received:", notification)
  })

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log("✅ User Interacted with Notification:", response)
  })
}

// ✅ Default export to prevent errors in `_layout.jsx`
export default {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
  sendPushNotification,
}
