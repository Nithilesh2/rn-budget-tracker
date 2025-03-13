import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications without asking for permission
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Error", "Push notifications only work on a real device");
    return null;
  }

  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    console.log("🔕 Notifications permission NOT granted. Skipping token request.");
    return null; // Do not request permission, just return null
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
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

// Notification Listeners
export function setupNotificationListeners() {
  Notifications.addNotificationReceivedListener((notification) => {
    console.log("📩 Notification Received:", notification);
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log("✅ User Interacted with Notification:", response);
  });
}

// ✅ Default export to prevent errors in `_layout.jsx`
export default {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
  sendPushNotification,
};
