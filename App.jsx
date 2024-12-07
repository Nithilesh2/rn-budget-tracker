import React from "react"
import AppNavigator from "./navigation/AppNavigator"
import { StatusBar,  StyleSheet } from "react-native"

const App = () => {
  return (
    <>
      <AppNavigator />
      <StatusBar barStyle="light-content" backgroundColor="#333333" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    
    fontSize: 20,
    color: "#333",
  },
})

export default App
