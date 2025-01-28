import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React from "react"
import ProfileIcon from "./../../../assets/icons/Profile"
import ArrowDownIcon from "./../../../assets/icons/ArrowDown"
import NotificationIcon from "./../../../assets/icons/Bell"
import {
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins"
import { useFonts } from "expo-font"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import SpendIncomeLineChart from "../../../components/Chart"
import ShoppingBagIcon from "./../../../assets/icons/Shopping"
import FoodIcon from "./../../../assets/icons/Food"
import CarIcon from "./../../../assets/icons/Transport"
import SubscriptionIcon from "./../../../assets/icons/Subscription"

const index = () => {
  const transactions = [
    {
      id: 1,
      icon: (
        <ShoppingBagIcon width="32" height="32" color="goldenrod" fill="gold" />
      ),
      title: "Shopping",
      description: "Buy some groceries",
      amount: "- ₹123",
      time: "10:00 AM",
    },
    {
      id: 2,
      icon: <FoodIcon width="32" height="32" color="blue" fill="lightblue" />,
      title: "Restaurant",
      description: "Dinner at a cafe",
      amount: "- ₹456",
      time: "8:00 PM",
    },
    {
      id: 3,
      icon: <CarIcon width="32" height="32" color="red" fill="pink" />,
      title: "Transport",
      description: "Taxi fare",
      amount: "+₹200",
      time: "9:00 AM",
    },
    {
      id: 4,
      icon: (
        <SubscriptionIcon width="32" height="32" color="purple" fill="violet" />
      ),
      title: "Subscription",
      description: "Monthly Netflix",
      amount: "- ₹499",
      time: "5:00 PM",
    },
  ]

  const date = new Date()
  const options = { month: "long" }
  const monthName = new Intl.DateTimeFormat("en-US", options).format(date)
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7F3DFF" />
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.top}>
            <View style={styles.topLeft}>
              <ProfileIcon width="32" height="32" color="black" />
            </View>
            <View style={styles.topMiddle}>
              <ArrowDownIcon height="26" width="26" color="black" />
              <Text style={styles.monethSpents}>{monthName}</Text>
            </View>
            <View style={styles.topRight}>
              <NotificationIcon
                height="32"
                width="30"
                color="#7F3DFF"
                fill="#7F3DFF"
              />
            </View>
          </View>
          <View style={styles.accBal}>
            <Text style={styles.accBaltext}>Account Balance</Text>
            <Text style={styles.accBalAmount}>₹1,234</Text>
          </View>
          <View style={styles.spentsDebitAndCredit}>
            <View style={styles.creditBox}>
              <Image
                source={require("../../../assets/images/IncomeWhiteBg.png")}
                style={styles.creditBoxLeft}
              />
              <View style={styles.boxRight}>
                <Text style={styles.boxRightText}>Income</Text>
                <Text style={styles.boxRightAmount}>₹234</Text>
              </View>
            </View>
            <View style={styles.debitBox}>
              <Image
                source={require("../../../assets/images/ExpenseWhiteBg.png")}
                style={styles.creditBoxLeft}
              />
              <View style={styles.creditBoxRight}>
                <Text style={styles.boxRightText}>Expenses</Text>
                <Text style={styles.boxRightAmount}>₹580</Text>
              </View>
            </View>
          </View>
          <View style={styles.spentsFrequency}>
            <Text style={styles.spentsFrequencyText}>Spend Frequency</Text>
            <SpendIncomeLineChart />
          </View>
          <View style={styles.recentTransicitions}>
            <Text style={styles.recentTransicitionsText}>
              Recent Transactions
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.recentTransicitionsButton}
            >
              <Text style={styles.recentTransicitionsButtonText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentTransactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.recentTransactionsItem}>
                {transaction.icon}
                <View style={styles.recentTransactionsItemMiddle}>
                  <Text style={styles.recentTransactionsItemText}>
                    {transaction.title}
                  </Text>
                  <Text style={styles.recentTransactionsItemDescription}>
                    {transaction.description}
                  </Text>
                </View>
                <View style={styles.recentTransactionsItemBottom}>
                  <Text
                    style={[
                      styles.recentTransactionsItemAmount,
                      {
                        color: transaction.amount.startsWith("+")
                          ? "green"
                          : "red",
                      },
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                  <Text style={styles.recentTransactionsItemTime}>
                    {transaction.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 17,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  topMiddle: {
    flexDirection: "row",
    alignItems: "center",
  },
  monethSpents: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  accBal: {
    marginTop: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  accBaltext: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "grey",
    width: "100%",
    textAlign: "center",
    overflow: "visible",
  },
  accBalAmount: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 42,
    color: "black",
    lineHeight: 50,
    textAlign: "center",
    overflow: "visible",
    width: "100%",
    textAlign: "center",
    overflow: "visible",
  },
  spentsDebitAndCredit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  creditBox: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 150,
    backgroundColor: "#00A86B",
    borderRadius: 20,
    gap: 14,
  },
  debitBox: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 150,
    backgroundColor: "#FD3C4A",
    borderRadius: 20,
    gap: 14,
  },
  creditBoxLeft: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  boxRight: {
    justifyContent: "space-between",
  },
  boxRightText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "white",
  },
  boxRightAmount: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 18,
    color: "white",
  },
  spentsFrequency: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  spentsFrequencyText: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "black",
    marginBottom: 10,
  },
  recentTransicitions: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recentTransicitionsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "black",
    width: "auto",
    overflow: "visible",
  },
  recentTransicitionsButton: {
    backgroundColor: "#7F3DFF",
    borderRadius: 20,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  recentTransicitionsButtonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "white",
    width: "100%",
    textAlign: "center",
    overflow: "visible",
  },
  recentTransactionsList: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 10,
    height: "auto",
    gap: 10,
  },
  recentTransactionsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.125,
    shadowRadius: 3.84,
    elevation: 4,
  },
  recentTransactionsItemMiddle: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 1,
    width: "55%",
  },
  recentTransactionsItemText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "black",
    width: "100%",
    textAlign: "flex-start",
    overflow: "visible",
  },
  recentTransactionsItemDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "grey",
    width: "100%",
    textAlign: "flex-start",
    overflow: "visible",
  },
  recentTransactionsItemAmount: {
    fontFamily: "Ubuntu_500Medium",
    fontSize: 18,
    width: "100%",
    textAlign: "flex-start",
    overflow: "visible",
  },
  recentTransactionsItemBottom: {
    alignItems: "center",
    gap: 1,
    width: 70,
    textAlign: "center",
    overflow: "visible",
  },
  recentTransactionsItemTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "grey",
    width: "100%",
    textAlign: "flex-start",
    overflow: "visible",
  },
})

export default index
