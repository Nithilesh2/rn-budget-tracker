import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen name="export" />
    </Tabs>
  )
}

export default _layout
