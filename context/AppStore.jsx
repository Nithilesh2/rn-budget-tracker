import React, { useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "../firebase/firebaseConfig"
import icons from "../components/Icons"
import Toast from "react-native-root-toast"
import { useRouter } from "expo-router"
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth"

const AppStore = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(1)
  const [storedUserId, setStoredUserId] = useState(null)
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

  //Budget
  const [budget, setBudget] = useState(0)
  const [budgetLoading, setBudgetLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId")
        if (!userId) return

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

    fetchData()
  }, [])

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

  const handleUpdate = async () => {
    try {
      if (!storedUserId) {
        Toast.show("User not found", options)
        return
      }
      setAccountLoading(true)

      const user = auth.currentUser
      const userDocRef = doc(firestore, "users", storedUserId)
      const iconIndex = icons.indexOf(JSON.parse(selectedIcon))
      await AsyncStorage.setItem("selectedIcon", JSON.stringify(iconIndex))
      await updateDoc(userDocRef, { userIconNumber: iconIndex })

      const userDoc = (await getDoc(userDocRef)).data()

      if (name.trim() !== userDoc.name) {
        if (name !== "") {
          await updateDoc(userDocRef, { name: name.trim() })
          Toast.show("Name changed", options)
        } else {
          Toast.show("Name cannot be empty", options)
        }
      }

      if (oldPassword.trim() && newPassword.trim()) {
        try {
          const credentials = EmailAuthProvider.credential(
            user.email,
            oldPassword.trim()
          )
          await reauthenticateWithCredential(user, credentials)
          await updatePassword(user, newPassword.trim())

          setOldPassword("")
          setNewPassword("")
          Toast.show("Password updated successfully", options)
          router.replace("onboarding/tabs/profile/")
        } catch (error) {
          console.error("Error updating password:", error)
          Toast.show(
            error.code === "auth/wrong-password"
              ? "Incorrect old password"
              : "Weak password: Choose a stronger one",
            options
          )
        }
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

      Toast.show(`${selectedType} added successfully`, options)
      setSelectedType("Expense")
      setSelected("")
      setDescription("")
      setAmount("")
      setAmountLoading(false)
    } catch (error) {
      console.log(error)
      Toast.show(`Failed to add ${selectedType}`, options)
    } finally {
      setAmountLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [storedUserId])

  const fetchData = async () => {
    try {
      if (!storedUserId) {
        Toast.show("User ID is missing", options)
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

  //Budget
  const handleContinue = async () => {
    try {
      if (!storedUserId) {
        Toast.show("User ID is missing", options)
        router.push("onboarding/login")
        return
      }
  
      if (!budget || isNaN(budget) || budget <= 0 ) {
        Toast.show("Please enter a valid budget amount", options)
        return
      }
      setBudgetLoading(true)
      const userDocRef = doc(firestore, "users", storedUserId)
      const userDocSnap = await getDoc(userDocRef)
  
      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, { budget: Number(budget) })
        Toast.show("Budget updated successfully", options)
        router.back()
      } else {
        Toast.show("User document does not exist", options)
        router.back()
      }
      setBudgetLoading(false)
    } catch (error) {
      console.error(error)
      Toast.show("Failed to set Budget", options)
    }finally{
      setBudgetLoading(false)
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

        //ADD EXPENSES/INCOME
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

        //FETCH USER DATA
        userData,
        fetchData,
        userIncome,
        userExpenses,

        // BUDGET
        budget,
        handleContinue,
        setBudget,
        budgetLoading,

      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppStore
