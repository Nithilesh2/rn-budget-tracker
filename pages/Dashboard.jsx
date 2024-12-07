import { SafeAreaView, StyleSheet, StatusBar } from "react-native"
import React from "react"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar pageName="Dashboard"/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d898d7",
  },
})

export default Dashboard
