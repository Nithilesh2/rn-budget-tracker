import React, { useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../firebase/firebaseConfig"
import icons from "../components/Icons"
import Toast from "react-native-root-toast"
import { useRouter } from "expo-router"
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import notifications from "../app/utils/notifications"

const AppStore = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(1)
  const [storedUserId, setStoredUserId] = useState(null)
  const [pushToken, setPushToken] = useState(null)
  const router = useRouter()

  // Account tab state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [accountLoading, setAccountLoading] = useState(false)

  // Add Expenses/Income
  const [selectedType, setSelectedType] = useState("Expense")
  const [selected, setSelected] = useState("")
  const [sIcon, setSIcon] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [amountLoading, setAmountLoading] = useState(false)

  // Fetch user data
  const [userData, setUserData] = useState([])
  const [userIncome, setUserIncome] = useState()
  const [userExpenses, setUserExpenses] = useState()

  // Budget
  const [budget, setBudget] = useState(0)
  const [budgetLoading, setBudgetLoading] = useState(false)

  // Delete particular transaction
  const [isModalVisible, setModalVisible] = useState(false)

  // Toast configuration
  const options = {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    animation: true,
    backgroundColor: "black",
    textColor: "white",
    shadow: true,
    shadowColor: "white",
    containerStyle: {
      borderRadius: 15,
      padding: 15,
    },
    textStyle: {
      fontSize: 16,
      fontWeight: "600",
    },
  }

  // Fetch user data
  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId")
      if (!userId) {
        router.push("onboarding/login")
        return
      }

      const userDoc = await getDoc(doc(firestore, "users", storedUserId))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        setUserIncome(userData.totalIncomeAmount)
        setUserExpenses(userData.totalExpensesAmount)
        setBudget(userData.budget)
        const userDataExpenses = userData.expenses || []
        setUserData(userDataExpenses)
      } else {
        Toast.show("User document does not exist", options)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      Toast.show("Failed to load data", options)
    }
  }

  // Fetch user data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("notificationPushToken")
        setPushToken(storedToken)
        const userId = await AsyncStorage.getItem("userId")
        if (!userId) {
          router.replace("onboarding/login")
          return
        }

        setStoredUserId(userId)
        const userDoc = await getDoc(doc(firestore, "users", userId))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          setName(userData.name || "")
          setEmail(userData.email || "")

          const iconIndex = userData.userIconNumber
          if (icons[iconIndex]) {
            setSelectedIcon(icons[iconIndex])
            await AsyncStorage.setItem(
              "selectedIcon",
              JSON.stringify(iconIndex)
            )
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        Toast.show("Failed to load profile data", options)
      }
    }

    fetchInitialData()
  }, [storedUserId])

  useEffect(() => {
    if (storedUserId) {
      fetchData()
    }
  }, [])

  // Handle profile update
  const handleUpdate = async () => {
    try {
      if (!storedUserId) {
        Toast.show("User not found", options)
        return
      }
      setAccountLoading(true)
      const userDocRef = doc(firestore, "users", storedUserId)
      const userDoc = (await getDoc(userDocRef)).data()

      let changesMade = false

      const iconIndex = selectedIcon
        ? icons.indexOf(JSON.parse(selectedIcon))
        : -1
      if (userDoc.userIconNumber !== iconIndex) {
        await updateDoc(userDocRef, { userIconNumber: iconIndex })
        await AsyncStorage.setItem("selectedIcon", JSON.stringify(iconIndex))
        Toast.show("Icon updated successfully", options)
        changesMade = true
      }

      if (name.trim() !== userDoc.name) {
        if (name.trim()) {
          await updateDoc(userDocRef, { name: name.trim() })
          await AsyncStorage.setItem("userName", name.trim())
          Toast.show("Name updated successfully", options)
          changesMade = true
        }
        if (!name.trim()) {
          Toast.show("Name cannot be empty", options)
          return
        }
      }

      if (newPassword.trim()) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", storedUserId))
          if (!userDoc.exists()) {
            Toast.show("User not found", options)
            return
          }
          const userEmail = userDoc.data().email
          const userCredential = await signInWithEmailAndPassword(
            auth,
            userEmail,
            oldPassword
          )

          await updatePassword(userCredential.user, newPassword.trim())
          setOldPassword("")
          setNewPassword("")
          Toast.show("Password updated successfully", options)
          changesMade = true
        } catch (error) {
          let errorMessage = "Something went wrong. Please try again."

          if (error.code === "auth/missing-password") {
            errorMessage = "Password is required. Please enter your password."
          } else if (error.code === "auth/invalid-credential") {
            errorMessage =
              "Invalid Old Password. Please Re-enter your Old Password."
            setOldPassword("")
          } else if (error.code === "auth/weak-password") {
            errorMessage = "Password should be at least 6 characters."
          }

          Toast.show(errorMessage, options)
        }
      }

      if (changesMade) {
        router.replace("onboarding/tabs/profile/")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      Toast.show("Failed to update profile", options)
    } finally {
      setAccountLoading(false)
    }
  }

  const handleCancel = () => {
    Toast.show("No changes made", options)
    setOldPassword("")
    setNewPassword("")
    router.replace("onboarding/tabs/profile/")
  }

  // Handle expense/income submission
  const handleSubmit = async () => {
    try {
      if (!storedUserId) {
        Toast.show("User not found", options)
        router.replace("onboarding/login")
        return
      }
      if (!selectedType || !selected || !description.trim() || !amount) {
        Toast.show("Please fill in all fields", options)
        return
      }

      setAmountLoading(true)
      const userDocRef = doc(firestore, "users", storedUserId)
      const userDocSnap = await getDoc(userDocRef)

      if (!userDocSnap.exists()) {
        Toast.show("User data not found", options)
        setAmountLoading(false)
        return
      }

      const userData = userDocSnap.data()
      const previousExpenses = userData.expenses || []
      const previousTotalExpensesAmount = userData.totalExpensesAmount || 0
      const previousTotalIncomeAmount = userData.totalIncomeAmount || 0

      const numericAmount = Number(amount)
      const transactionId = uuidv4()

      const updatedTotalExpensesAmount =
        selectedType === "Expense"
          ? previousTotalExpensesAmount + numericAmount
          : previousTotalExpensesAmount

      const updatedTotalIncomeAmount =
        selectedType === "Income"
          ? previousTotalIncomeAmount + numericAmount
          : previousTotalIncomeAmount

      const updatedExpenses = [
        ...previousExpenses,
        {
          id: transactionId,
          method: selectedType,
          categoryType: selected,
          description: description.trim(),
          amount: numericAmount,
          timestamp: new Date(),
          icon: sIcon,
        },
      ]

      await updateDoc(userDocRef, {
        expenses: updatedExpenses,
        totalExpensesAmount: updatedTotalExpensesAmount,
        totalIncomeAmount: updatedTotalIncomeAmount,
      })

      notifications.sendPushNotification(
        pushToken,
        `${selectedType} Added`,
        `A new ${selectedType.toLowerCase()} of ₹${numericAmount} has been added.`
      )
      Toast.show(`${selectedType} added successfully`, options)
      setSelectedType("Expense")
      setSelected("")
      setDescription("")
      setAmount("")
    } catch (error) {
      console.error(error)
      Toast.show(`Failed to add ${selectedType}`, options)
    } finally {
      setAmountLoading(false)
    }
  }

  // Handle budget update
  const handleContinue = async () => {
    try {
      if (!storedUserId) {
        Toast.show("User ID is missing", options)
        router.push("onboarding/login")
        return
      }

      if (!budget || isNaN(budget) || budget <= 0) {
        Toast.show("Please enter a valid budget amount", options)
        return
      }
      setBudgetLoading(true)
      const userDocRef = doc(firestore, "users", storedUserId)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, { budget: Number(budget) })
        Toast.show("Budget updated successfully", options)
        notifications.sendPushNotification(
          pushToken,
          "Budget Changed",
          `Budget has changed to ${budget}`
        )
        router.back()
      } else {
        Toast.show("User document does not exist", options)
        router.back()
      }
    } catch (error) {
      console.error(error)
      Toast.show("Failed to set Budget", options)
    } finally {
      setBudgetLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      // await auth.signOut()
      await AsyncStorage.removeItem("loggedIn")
      await AsyncStorage.clear()

      setStoredUserId(null)
      router.replace("onboarding/login")
    } catch (error) {
      console.error("Error during logout:", error)
      Toast.show("Logout failed", options)
    }
  }

  // Delete particular Transaction through transaction id
  const handleDeleteTransaction = async (transactionId) => {
    try {
      if (!storedUserId) {
        console.log("User ID not found")
        return
      }

      const userRef = doc(firestore, "users", storedUserId)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        console.log("User document not found")
        return
      }

      const userData = userDoc.data()
      const transactionToDelete = userData.expenses.find(
        (expense) => expense.id === transactionId
      )

      if (!transactionToDelete) {
        console.log("Transaction not found")
        return
      }

      const updatedExpenses = userData.expenses.filter(
        (expense) => expense.id !== transactionId
      )

      let updatedFields = { expenses: updatedExpenses }

      if (transactionToDelete.method === "Expense") {
        updatedFields.totalExpensesAmount =
          (userData.totalExpensesAmount || 0) - transactionToDelete.amount
      } else if (transactionToDelete.method === "Income") {
        updatedFields.totalIncomeAmount =
          (userData.totalIncomeAmount || 0) - transactionToDelete.amount
      }

      await updateDoc(userRef, updatedFields)
      notifications.sendPushNotification(
      pushToken,
      `${transactionToDelete.method} Deleted`,
      `A ${transactionToDelete.method.toLowerCase()} of ₹${
        transactionToDelete.amount
      } has been deleted.`
    );
      router.push("onboarding/tabs/transactions")
      Toast.show(`${transactionToDelete.method} deleted successfully`, options)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        selectedIcon,
        setSelectedIcon,
        options,
        refreshing,
        setRefreshing,
        handleLogout,
        setStoredUserId,
        storedUserId,
        pushToken,
        // ACCOUNT TAB
        name,
        setName,
        email,
        setEmail,
        handleUpdate,
        handleCancel,
        accountLoading,
        setOldPassword,
        oldPassword,
        setNewPassword,
        newPassword,

        // ADD EXPENSES/INCOME
        handleSubmit,
        selectedType,
        setSelectedType,
        selected,
        setSelected,
        amount,
        setAmount,
        description,
        setDescription,
        amountLoading,
        sIcon,
        setSIcon,

        // FETCH USER DATA
        userData,
        fetchData,
        userIncome,
        userExpenses,

        // BUDGET
        budget,
        handleContinue,
        setBudget,
        budgetLoading,

        // DELETE TRANSACTION
        handleDeleteTransaction,
        isModalVisible,
        setModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppStore
