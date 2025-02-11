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
  const [selectedIcon, setSelectedIcon] = useState(1)
  const [storedUserId, setStoredUserId] = useState(null)
  const router = useRouter()

  // Account tab state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [accountLoading, setAccountLoading] = useState(false)

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
      if (!user) {
        Toast.show("Authentication error: Please log in again.", options)
        setAccountLoading(false)
        router.replace("onboarding/login")
        return
      }

      const userDocRef = doc(firestore, "users", storedUserId)
      const iconIndex = icons.indexOf(JSON.parse(selectedIcon))
      await AsyncStorage.setItem("selectedIcon", JSON.stringify(iconIndex))
      await updateDoc(userDocRef, { userIconNumber: iconIndex })

      const userDoc = (await getDoc(userDocRef)).data()

      if (name.trim() !== userDoc.name) {
        if (name !== "") {
          await updateDoc(userDocRef, { name: name.trim() })
          Toast.show("Name changed", options)
        }else{
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
    router.replace("onboarding/tabs/profile/")
  }

  return (
    <AppContext.Provider
      value={{
        selectedIcon,
        setSelectedIcon,
        options,
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppStore
