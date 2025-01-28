import React from "react"
import { Tabs } from "expo-router"
import TabBar from "../../../components/TabBar"

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7F3DFF",
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarLabel: "Transactions",
        }}
      />
      <Tabs.Screen
        name="addExpenses"
        options={{
          tabBarLabel: "+",
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          tabBarLabel: "Budget",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  )
}

export default _layout
