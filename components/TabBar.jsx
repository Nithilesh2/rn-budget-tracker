import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import HomeIcon from "./../assets/icons/Home"
import TransactionIcon from "./../assets/icons/Transaction"
import BudgetIcon from "./../assets/icons/Budget"
import ProfileIcon from "./../assets/icons/Profile"
import AddIcon from "./../assets/icons/Add"

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    index: (props) => (
      <HomeIcon color="#7F3DFF" height="34" width="34" {...props} />
    ),
    transactions: (props) => (
      <TransactionIcon color="#7F3DFF" height="34" width="34" {...props} />
    ),
    addExpenses: (props) => (
      <AddIcon color="white" height="34" width="34" {...props} />
    ),
    budget: (props) => (
      <BudgetIcon color="#7F3DFF" height="34" width="34" {...props} />
    ),
    profile: (props) => (
      <ProfileIcon color="#7F3DFF" height="34" width="34" {...props} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      <View style={styles.leftIconsContainer}>
        {state.routes
          .filter((route) => ["index", "transactions"].includes(route.name))
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                key={route.name}
                style={styles.tabBarItem}
                onPress={onPress}
              >
                {icons[route.name]({
                  color: isFocused ? "#7F3DFF" : "#222",
                })}
              </TouchableOpacity>
            );
          })}
      </View>

      {/* Center Add Icon */}
      <View style={styles.addIconContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("addExpenses")}
          style={styles.addIconButton}
        >
          {icons["addExpenses"]({})}
        </TouchableOpacity>
      </View>

      <View style={styles.rightIconsContainer}>
        {state.routes
          .filter((route) => ["budget", "profile"].includes(route.name))
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === (index + 2); // Adjust index for right tabs

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                key={route.name}
                style={styles.tabBarItem}
                onPress={onPress}
              >
                {icons[route.name]({
                  color: isFocused ? "#7F3DFF" : "#222",
                })}
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    marginHorizontal: 10,
    shadowOpacity: 0.1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 5,
  },
  leftIconsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 15,
  },
  rightIconsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    marginRight: 15,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  addIconContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -35 }], 
    shadowOpacity: 0.1,
    backgroundColor: "white",
    borderRadius: 35,
  },
  addIconButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#7F3DFF",
    borderRadius: 30,
    color: 'black',
  },
})

export default TabBar
