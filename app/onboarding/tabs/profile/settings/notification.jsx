import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../../assets/icons/ArrowLeft"
import Toast from "react-native-root-toast"

const notification = () => {
  const [onExpenses, setOnExpenses] = useState(false)
  const [onBudget, setOnBudget] = useState(false)
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
  const options = {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    hideOnPress: true,
    delay: 0,
  }
  const handleExpensesToggle = (value) => {
    setOnExpenses(value)
    if (value) {
      Toast.show("Expense Alert is turned ON", options)
    } else {
      Toast.show("Expense Alert is turned OFF", options)
    }
  }

  const handleBudgetToggle = (value) => {
    setOnBudget(value)
    if (value) {
      Toast.show("Budget notifications are turned ON", options)
    } else {
      Toast.show("Budget notifications are turned OFF", options)
    }
  }

  return (
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
      </View>
      <View style={styles.bottom}>
        <View style={styles.boxes}>
          <View style={styles.left}>
            <Text style={styles.titleContainer}>Expense Alert</Text>
            <Text style={styles.subtitle}>
              Get notification about your expenses
            </Text>
          </View>
          <View style={styles.right}>
            <Switch
              value={onExpenses}
              onValueChange={handleExpensesToggle}
              thumbColor={onExpenses ? "#7F3DFF" : "#C4C4C4"}
              trackColor={{ false: "#C4C4C4", true: "#7F3DFF" }}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.boxes}>
          <View style={styles.left}>
            <Text style={styles.titleContainer}>Budget</Text>
            <Text style={styles.subtitle}>
              Get notification when your budget changes
            </Text>
          </View>
          <View style={styles.right}>
            <Switch
              value={onBudget}
              onValueChange={handleBudgetToggle}
              thumbColor={onBudget ? "#7F3DFF" : "#C4C4C4"}
              trackColor={{ false: "#C4C4C4", true: "#7F3DFF" }}
              style={styles.switch}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default notification

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
    paddingHorizontal: 15,
    paddingVertical: 30,
    width: "100%",
  },
  boxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    width: "100%",
  },
  left: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },
  titleContainer: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
})
