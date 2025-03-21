import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useCallback, useContext } from "react"
import NotificationIcon from "./../../../assets/icons/Bell"
import {
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins"
import { useFonts } from "expo-font"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import SpendIncomeLineChart from "../../../components/Chart"
import { useFocusEffect, useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../../../context/AppContext"
import IconMap from "../../../assets/IconMap/IconMap"
import data from "../../../components/IconsData"
import LottieView from "lottie-react-native"
import UpdateNotification from "./../../../components/UpdateNotification"
import currencySymbols from "./../../../components/CurrencySymbols"

const index = () => {
  const {
    userData,
    fetchData,
    userIncome,
    userExpenses,
    refreshing,
    setRefreshing,
    budget,
    selectedIcon,
    setStoredUserId,
    currencyType,
    notifications,
  } = useContext(AppContext)
  const router = useRouter()
  const date = new Date()
  const options = { month: "long" }
  const monthName = new Intl.DateTimeFormat("en-US", options).format(date)
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  const unreadNotifications = notifications.some((notif) => !notif.read)
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId")
          if (userId) {
            setStoredUserId(userId)
            fetchData()
          }
        } catch (error) {
          console.error("Error loading data:", error)
        }
      }
      loadData()
    }, [])
  )
  const handleRefreshing = () => {
    setRefreshing(true)
    fetchData()
    setRefreshing(false)
  }
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              onRefresh={handleRefreshing}
              refreshing={refreshing}
            />
          }
        >
          <UpdateNotification />
          <View style={styles.top}>
            <View style={styles.topLeft}>
              <Image source={selectedIcon} style={styles.userImg} />
            </View>
            <View style={styles.topMiddle}>
              <Text style={styles.monethSpents}>{monthName}</Text>
            </View>
            <View style={styles.notificationIconWrapper}>
              <TouchableOpacity
                onPress={() => router.push("/onboarding/tabs/notification")}
              >
                <NotificationIcon
                  height="32"
                  width="30"
                  color="#7F3DFF"
                  fill="#7F3DFF"
                />
              </TouchableOpacity>
              {unreadNotifications && <View style={styles.redDot} />}
            </View>
          </View>
          <View style={styles.accBal}>
            <Text style={styles.accBaltext}>Monthly Budget</Text>
            <Text style={styles.accBalAmount}>
              {budget === undefined || budget === null || budget === 0 ? (
                <View style={styles.setBudget}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.setBudgetButton}
                    onPress={() => router.push("/onboarding/tabs/budget")}
                  >
                    <Text style={styles.setBudgetButtonText}>Set Budget</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                `${currencySymbols[currencyType] || "₹"}${Math.ceil(budget)}`
              )}
            </Text>
          </View>
          <View style={styles.spentsDebitAndCredit}>
            <View style={styles.creditBox}>
              <Image
                source={require("../../../assets/images/IncomeWhiteBg.png")}
                style={styles.creditBoxLeft}
              />
              <View style={styles.boxRight}>
                <Text style={styles.boxRightText}>Income</Text>
                <Text style={styles.boxRightAmount}>
                  {currencySymbols[currencyType] || "₹"}
                  {userExpenses ? Math.ceil(userIncome) : "0"}
                </Text>
              </View>
            </View>
            <View style={styles.debitBox}>
              <Image
                source={require("../../../assets/images/ExpenseWhiteBg.png")}
                style={styles.creditBoxLeft}
              />
              <View style={styles.creditBoxRight}>
                <Text style={styles.boxRightText}>Expenses</Text>
                <Text style={styles.boxRightAmount}>
                  {currencySymbols[currencyType] || "₹"}
                  {userExpenses ? Math.ceil(userExpenses) : "0"}
                </Text>
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
            {userData && userData.length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.recentTransicitionsButton}
                onPress={() => router.push("/onboarding/tabs/transactions")}
              >
                <Text style={styles.recentTransicitionsButtonText}>
                  See All
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {userData.length === 0 ? (
            <>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <LottieView
                  source={require("../../../assets/Animations/noSpents.json")}
                  autoPlay
                  loop={true}
                  style={{ width: 300, height: 300 }}
                />
                <Text style={styles.recentTransactionsNoSpendsText}>
                  No recent transactions. Add expenses/income to see them here.
                </Text>
                <LottieView
                  source={require("../../../assets/Animations/ArrowDown.json")}
                  autoPlay
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.recentTransactionsList}>
                {[...userData]
                  .sort(
                    (a, b) =>
                      (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
                  )
                  .slice(0, 5)
                  .map((transaction, index) => {
                    const selectedItem = data.find(
                      (item) => item.value === transaction.categoryType
                    )
                    return (
                      <View key={index} style={styles.recentTransactionsItem}>
                        {selectedItem && IconMap[selectedItem.icon]
                          ? React.createElement(IconMap[selectedItem.icon], {
                              height: 34,
                              width: 34,
                              color: selectedItem.color,
                              fill: selectedItem.fill,
                            })
                          : null}
                        <View style={styles.recentTransactionsItemMiddle}>
                          <Text style={styles.recentTransactionsItemText}>
                            {transaction.categoryType}
                          </Text>
                          <Text
                            style={styles.recentTransactionsItemDescription}
                            numberOfLines={1}
                          >
                            {transaction.description}
                          </Text>
                        </View>
                        <View style={styles.recentTransactionsItemBottom}>
                          <Text
                            style={[
                              styles.recentTransactionsItemAmount,
                              {
                                color:
                                  transaction.method === "Income"
                                    ? "green"
                                    : "red",
                              },
                            ]}
                          >
                            {transaction.method === "Expense"
                              ? `- ${
                                  currencySymbols[currencyType] || "₹"
                                }${Math.ceil(transaction.amount)}`
                              : `+ ${
                                  currencySymbols[currencyType] || "₹"
                                }${Math.ceil(transaction.amount)}`}
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
                      </View>
                    )
                  })}
              </View>
            </>
          )}
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
  topLeft: {
    width: "auto",
    aspectRatio: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
  notificationIconWrapper: {
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 40,
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
  },
  setBudget: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  setBudgetText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "grey",
  },
  setBudgetButton: {
    backgroundColor: "#7F3DFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: 40,
    marginVertical: 5,
  },
  setBudgetButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "white",
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
  recentTransactionsNoSpendsText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    // marginTop: 20,
    width: "100%",
    // marginBottom: 20,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
})

export default index
