import { StyleSheet, Text, View, FlatList } from "react-native"
import React from "react"
// import MenuIcon from "../../../assets/icons/Menu"
import { Searchbar } from "react-native-paper"
import ShoppingBagIcon from "../../../assets/icons/Shopping"
import FoodIcon from "../../../assets/icons/Food"
import CarIcon from "../../../assets/icons/Transport"
import SubscriptionIcon from "../../../assets/icons/Subscription"
import { useFonts } from "expo-font"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"
import { format, isToday, isYesterday, parseISO } from "date-fns"

const Transactions = () => {
  useFonts({
    Poppins_400Regular,
  })

  const transactionsData = [
    {
      id: 1,
      icon: (
        <ShoppingBagIcon width="32" height="32" color="goldenrod" fill="gold" />
      ),
      title: "Shopping",
      description: "Buy some groceries",
      amount: "- ₹123",
      time: "10:00 AM",
      date: "2025/02/01",
    },
    {
      id: 2,
      icon: <FoodIcon width="32" height="32" color="blue" fill="lightblue" />,
      title: "Restaurant",
      description: "Dinner at a cafe",
      amount: "- ₹456",
      time: "8:00 PM",
      date: "2025/01/31",
    },
    {
      id: 3,
      icon: <CarIcon width="32" height="32" color="red" fill="pink" />,
      title: "Transport",
      description: "Taxi fare",
      amount: "+₹200",
      time: "9:00 AM",
      date: "2025/01/30",
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
      date: "2025/01/30",
    },
    {
      id: 5,
      icon: (
        <ShoppingBagIcon width="32" height="32" color="goldenrod" fill="gold" />
      ),
      title: "Shopping",
      description: "Buy some groceries again",
      amount: "- ₹1873",
      time: "11:00 AM",
      date: "2025/01/29",
    },
    {
      id: 6,
      icon: <FoodIcon width="32" height="32" color="orange" fill="yellow" />,
      title: "Fast Food",
      description: "Ordered pizza",
      amount: "- ₹320",
      time: "7:30 PM",
      date: "2025/01/28",
    },
    {
      id: 7,
      icon: <CarIcon width="32" height="32" color="green" fill="lightgreen" />,
      title: "Fuel",
      description: "Filled gas tank",
      amount: "- ₹1500",
      time: "6:00 PM",
      date: "2025/01/27",
    },
    {
      id: 8,
      icon: (
        <SubscriptionIcon
          width="32"
          height="32"
          color="blue"
          fill="lightblue"
        />
      ),
      title: "Spotify",
      description: "Monthly subscription",
      amount: "- ₹149",
      time: "4:00 PM",
      date: "2025/01/26",
    },
    {
      id: 9,
      icon: <ShoppingBagIcon width="32" height="32" color="brown" fill="tan" />,
      title: "Clothing",
      description: "Bought new jeans",
      amount: "- ₹1999",
      time: "2:00 PM",
      date: "2025/01/25",
    },
    {
      id: 10,
      icon: <CarIcon width="32" height="32" color="gray" fill="silver" />,
      title: "Parking",
      description: "Parking fees",
      amount: "- ₹50",
      time: "9:30 AM",
      date: "2025/01/24",
    },
    {
      id: 11,
      icon: <SubscriptionIcon width="32" height="32" color="red" fill="pink" />,
      title: "Gym",
      description: "Monthly membership",
      amount: "- ₹799",
      time: "6:00 AM",
      date: "2025/01/23",
    },
    {
      id: 12,
      icon: <FoodIcon width="32" height="32" color="brown" fill="tan" />,
      title: "Coffee",
      description: "Starbucks coffee",
      amount: "- ₹250",
      time: "8:45 AM",
      date: "2025/01/22",
    },
  ]

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString.replace(/\//g, "-"))
    if (isToday(parsedDate)) return "Today"
    if (isYesterday(parsedDate)) return "Yesterday"
    return format(parsedDate, "yyyy/MM/dd")
  }

  const groupedTransactions = transactionsData.reduce((acc, transaction) => {
    const formattedDate = formatDate(transaction.date)
    if (!acc[formattedDate]) acc[formattedDate] = []
    acc[formattedDate].push(transaction)
    return acc
  }, {})

  return (
    <View style={styles.container}>
      {/* <View style={styles.topContainer}>
        <MenuIcon width={30} height={30} color="black" strokeWidth={2} />
      </View> */}
      <View style={styles.middleContainer}>
        <Searchbar
          placeholder="Search for items..."
          style={styles.searchContainer}
          inputStyle={{ fontFamily: "Poppins_400Regular", paddingBottom: 5 }}
        />
      </View>

      <FlatList
        data={Object.entries(groupedTransactions)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <>
            <Text style={styles.dateTitle}>{item[0]}</Text>
            <View style={styles.transactionContainer}>
              {item[1].map((transaction) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  {transaction.icon}
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>
                      {transaction.title}
                    </Text>
                    <Text style={styles.transactionDesc}>
                      {transaction.description}
                    </Text>
                  </View>
                  <Text style={styles.transactionAmount}>
                    {transaction.amount}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      />
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
  },
  topContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 20
  },
  middleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20
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
    paddingHorizontal: 20
  },
  transactionContainer: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20
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
})
