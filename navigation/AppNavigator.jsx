import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Signup from "../pages/Signup"
import Dashboard from "./../pages/Dashboard"
import Expenses from "./../pages/Expenses"
import Track from "./../pages/Track"
import Login from "../pages/Login"
import Icon from "react-native-vector-icons/Ionicons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Expenses") {
            iconName = focused ? "cash" : "cash-outline"
          } else if (route.name === "Track") {
            iconName = focused ? "list" : "list-outline"
          } else if(route.name === "Login"){
            iconName = focused ? "person" : "person-outline"
          }
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 10 },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#333333",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Expenses" component={Expenses} />
      <Tab.Screen name="Track" component={Track} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
