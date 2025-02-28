import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          setUpdateAvailable(true);
          const dismissed = await AsyncStorage.getItem("updateDismissed");
          if (!dismissed) {
            setShowUpdate(true);
          }
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    checkForUpdates();
  }, []);

  const handleDismiss = async () => {
    await AsyncStorage.setItem("updateDismissed", "true");
    setShowUpdate(false);
  };

  const handleUpdate = async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  if (!showUpdate || !updateAvailable) {
    return null;
  }

  return (
    <View style={styles.updateContainer}>
      <Text style={styles.updateText}>A new update is available!</Text>
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Now</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
        <Text style={styles.dismissButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  updateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#7F3DFF",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  updateText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  updateButtonText: {
    color: "#7F3DFF",
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  dismissButton: {
    marginLeft: 10,
  },
  dismissButtonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
});

export default UpdateNotification;