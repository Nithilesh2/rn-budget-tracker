import { StatusBar } from "react-native"
import React, { useEffect, useState } from "react"
import { Stack, useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage";

const _layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firstLaunch, setFirstLaunch] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const firstLaunchValue = await AsyncStorage.getItem("firstLaunch")
        if (firstLaunchValue === null) {
          await AsyncStorage.setItem("firstLaunch", "false")
          setFirstLaunch(true)
        } else {
          setFirstLaunch(false)
        }

        const isLoggedInValue = await AsyncStorage.getItem("loggedIn")
        setIsLoggedIn(isLoggedInValue === "true")
      } catch (error) {
        console.error("Error checking auth state:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuthState()
  }, [])

  useEffect(() => {
    if (loading) return

    if (isLoggedIn) {
      router.replace("/onboarding/tabs/")
    } else if (firstLaunch) {
      router.replace("/")
    } else {
      router.replace("/onboarding/login")
    }
  }, [isLoggedIn, firstLaunch, loading])

  if (loading) return null
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#7F3DFF" />
    </>
  )
}

export default _layout
