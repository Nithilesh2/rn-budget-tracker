import React, { useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebaseConfig"
import icons from "../components/Icons"
import Toast from "react-native-root-toast";

const AppStore = ({ children }) => {
  const [selectedIcon, setSelectedIcon] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId")

        if (!storedUserId) return

        const userDoc = await getDoc(doc(firestore, "users", storedUserId))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          const iconIndex = userData.userIconNumber

          if (icons[iconIndex]) {
            setSelectedIcon(icons[iconIndex])
            await AsyncStorage.setItem(
              "selectedIcon",
              JSON.stringify(userData.userIconNumber)
            )
          }
        }
      } catch (error) {
        console.error("Error fetching user icon:", error)
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

  return (
    <AppContext.Provider value={{ selectedIcon, setSelectedIcon, options }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppStore
