import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native"
import React, { useContext, useState } from "react"
import { Searchbar } from "react-native-paper"
import { useFonts } from "expo-font"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"
import { format, isToday, isYesterday } from "date-fns"
import { AppContext } from "../../../context/AppContext"
import IconMap from "../../../assets/IconMap/IconMap"
import data from "./../../../components/IconsData"
import LottieView from "lottie-react-native"
import { useRouter } from "expo-router";

const Transactions = () => {
  const { userData, refreshing, setRefreshing, fetchData } =
    useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useFonts({ Poppins_400Regular })

  const sortedTransactions = [...userData].sort(
    (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
  )

  const formatDate = (timestamp) => {
    const date = new Date(timestamp?.seconds * 1000)
    if (isToday(date)) return "Today"
    if (isYesterday(date)) return "Yesterday"
    return format(date, "yyyy/MM/dd")
  }

  const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
    const dateLabel = formatDate(transaction.timestamp)
    if (!acc[dateLabel]) acc[dateLabel] = []
    acc[dateLabel].push(transaction)
    return acc
  }, {})

  const filteredTransactions = Object.entries(groupedTransactions).reduce(
    (acc, [date, transactions]) => {
      const filteredItems = transactions.filter(
        (transaction) =>
          transaction.categoryType
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          transaction.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      if (filteredItems.length > 0) acc[date] = filteredItems
      return acc
    },
    {}
  )

  const handleRefreshing = () => {
    setRefreshing(true)
    fetchData()
    setRefreshing(false)
  }

  return (
    <View style={styles.container}>
      {userData.length === 0 ? (
        <>
          <View style={styles.lottieContainer}>
            <LottieView
              source={require("../../../assets/Animations/noSpents.json")}
              autoPlay
              loop={true}
              style={{ width: 360, height: 360, marginLeft: 5 }}
            />
            <Text style={styles.recentTransactionsNoSpendsText}>
              No recent transactions. Add expenses/income to see them here.
            </Text>
            <LottieView
              source={require("../../../assets/Animations/ArrowDown.json")}
              autoPlay
              loop={true}
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                bottom: 0,
                alignItems: "center",
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.middleContainer}>
            <Searchbar
              placeholder="Search for items..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchContainer}
              inputStyle={{
                fontFamily: "Poppins_400Regular",
                paddingBottom: 5,
              }}
            />
          </View>
          <FlatList
            data={Object.entries(filteredTransactions)}
            keyExtractor={(item) => item[0]}
            refreshControl={
              <RefreshControl
                onRefresh={handleRefreshing}
                refreshing={refreshing}
              />
            }
            renderItem={({ item }) => (
              <>
                <Text style={styles.dateTitle}>{item[0]}</Text>
                <View style={styles.transactionContainer}>
                  {item[1].map((transaction) => {
                    const selectedItem = data.find(
                      (item) => item.value === transaction.categoryType
                    )
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={transaction.id}
                        style={styles.transactionItem}
                        onPress={() => router.push(`onboarding/tabs/detailedData?id=${transaction.id}`)}
                      >
                        {selectedItem && IconMap[selectedItem.icon]
                          ? React.createElement(IconMap[selectedItem.icon], {
                              height: 34,
                              width: 34,
                              color: selectedItem.color,
                              fill: selectedItem.fill,
                            })
                          : null}
                        <View style={styles.transactionDetails}>
                          <Text style={styles.transactionTitle}>
                            {transaction.categoryType}
                          </Text>
                          <Text style={styles.transactionDesc} numberOfLines={1}>
                            {transaction.description}
                          </Text>
                        </View>

                        <View style={styles.moneyAndTimeContainer}>
                          <Text
                            style={[
                              styles.transactionAmount,
                              {
                                color:
                                  transaction.method === "Income"
                                    ? "green"
                                    : "red",
                              },
                            ]}
                          >
                            {transaction.method === "Expense"
                              ? `- ₹${transaction.amount}`
                              : `+ ₹${transaction.amount}`}
                          </Text>
                          <Text style={styles.recentTransactionsItemTime}>
                            {transaction.timestamp?.seconds
                              ? new Date(
                                  transaction.timestamp.seconds * 1000
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              : "N/A"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </>
            )}
          />
        </>
      )}
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: "white",
  },
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  middleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 14,
    paddingHorizontal: 20,
  },
  transactionContainer: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    height: 70,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 20,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDesc: {
    fontSize: 14,
    color: "gray",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moneyAndTimeContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
    gap: 3,
    width: 100,
  },
  recentTransactionsItemTime: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "grey",
    textAlign: "flex-start",
    overflow: "visible",
  },
  recentTransactionsNoSpendsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 20,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
})
