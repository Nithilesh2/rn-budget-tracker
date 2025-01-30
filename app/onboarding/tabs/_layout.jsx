import React from "react"
import { Tabs } from "expo-router"
import { View, Text } from "react-native"
import HomeIcon from "../../../assets/icons/Home"
import TransactionIcon from "../../../assets/icons/Transaction"
import AddIcon from "../../../assets/icons/Add"
import BudgetIcon from "../../../assets/icons/Budget"
import ProfileIcon from "../../../assets/icons/Profile"
import { useFonts } from "expo-font"
import { Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins"

const _layout = () => {
  useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  })
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#F2F2F2",
          height: 65,
          elevation: 20,
          borderRadius: 20,
          width: "100%",
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          zIndex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, onPress }) => (
            <View style={{ alignItems: "center", paddingTop: 15, width: 70 }}>
              <HomeIcon
                color={focused ? "#7F3DFF" : "grey"}
                height="30"
                width="30"
              />
              <Text
                style={{
                  color: focused ? "#7F3DFF" : "grey",
                  fontSize: 12,
                  fontFamily: "Poppins_600SemiBold",
                  width: 60,
                  textAlign: "center",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 15, width: 70 }}>
              <TransactionIcon
                color={focused ? "#7F3DFF" : "grey"}
                height="30"
                width="30"
              />
              <Text
                style={{
                  color: focused ? "#7F3DFF" : "grey",
                  fontSize: 12,
                  fontFamily: "Poppins_600SemiBold",
                  width: 60,
                  textAlign: "center",
                }}
              >
                Spents
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="addExpenses"
        options={{
          tabBarButton: ({ onPress }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#7F3DFF",
                height: 70,
                width: 70,
                borderRadius: 35,
                position: "absolute",
                top: -25,
                left: "50%",
                transform: [{ translateX: -35 }],
                zIndex: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <AddIcon color="white" height="30" width="30" onPress={onPress} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", paddingTop: 15, width: 70 }}
            >
              <BudgetIcon
                color={focused ? "#7F3DFF" : "grey"}
                height="30"
                width="30"
              />
              <Text
                style={{
                  color: focused ? "#7F3DFF" : "grey",
                  fontSize: 12,
                  fontFamily: "Poppins_600SemiBold",
                  width: 60,
                  textAlign: "center",
                }}
              >
                Budget
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", paddingTop: 15, width: 70 }}>
              <ProfileIcon
                color={focused ? "#7F3DFF" : "grey"}
                height="30"
                width="30"
              />
              <Text
                style={{
                  color: focused ? "#7F3DFF" : "grey",
                  fontSize: 12,
                  fontFamily: "Poppins_600SemiBold",
                  width: 60,
                  textAlign: "center",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout
