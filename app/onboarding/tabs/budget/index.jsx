import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React, { useContext } from "react"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import { useRouter } from "expo-router"
import { AppContext } from "../../../../context/AppContext"

const Budget = () => {
  const { budget, userExpenses } = useContext(AppContext)
  const router = useRouter()
  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  const date = new Date()
  const options = { month: "long" }
  const monthName = new Intl.DateTimeFormat("en-US", options).format(date)

  const spentPercentage = (userExpenses / budget) * 100

  let progressBarColor = "#7F3DFF"
  if (spentPercentage >= 80 && spentPercentage < 100) {
    progressBarColor = "#FFA500"
  } else if (spentPercentage >= 100) {
    progressBarColor = "#FF3D3D"
  }

  const handleEditBudget = () => {
    router.push("onboarding/tabs/budget/setBudget")
  }

  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{monthName}</Text>
      </View>
      <View style={styles.budgetContainer}>
        {budget === 0 || budget === null || budget === undefined ? (
          <>
            <View style={styles.nobudgetContainer}>
              <Text style={styles.nobudgetText}>
                No budget set for this month.
              </Text>
              <Text style={styles.nobudgetText2}>
                Let's make one so you are in control
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.setNoBudgetContainer}
                onPress={() => router.push("/onboarding/tabs/budget/setBudget")}
              >
                <Text style={styles.setButtonText}>Set Budget</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.yesBudgetContainer}>
              <Text style={styles.yesbudgetText}>
                Remaining ₹
                {userExpenses === null ||
                userExpenses === undefined ||
                userExpenses === 0
                  ? budget
                  : `${Math.max(0, budget - userExpenses)}`}
              </Text>

              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min(100, spentPercentage)}%`,
                      backgroundColor: progressBarColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                Spent: ₹
                {userExpenses === null ||
                userExpenses === undefined ||
                userExpenses === 0
                  ? 0
                  : userExpenses}{" "}
                out of ₹{budget}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.setNoBudgetContainer}
                onPress={handleEditBudget}
              >
                <Text style={styles.setButtonText}>Edit Budget</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

export default Budget

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F3DFF",
  },
  monthContainer: {
    paddingTop: 50,
    marginBottom: 50,
    alignItems: "center",
    width: "100%",
  },
  monthText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 30,
    color: "white",
  },
  budgetContainer: {
    backgroundColor: "#F8F9FC",
    flex: 1,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  nobudgetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nobudgetText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
    color: "#7F3DFF",
    marginBottom: 20,
  },
  nobudgetText2: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#7F3DFF",
  },
  buttonContainer: {
    backgroundColor: "#F8F9FC",
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  setNoBudgetContainer: {
    backgroundColor: "#7F3DFF",
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  setButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  yesBudgetContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 50,
  },
  yesbudgetText: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 22,
    color: "#7F3DFF",
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  progressText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#7F3DFF",
  },
})
