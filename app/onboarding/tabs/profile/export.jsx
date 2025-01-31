import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins"
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu"
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeft"
import { useRouter } from "expo-router"
import { SelectList } from "react-native-dropdown-select-list"
import { DateTimePickerModal } from "react-native-modal-datetime-picker"
import moment from "moment"
import DownloadIcon from "./../../../../assets/icons/Download"

const ExportBox = () => {
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Ubuntu_500Medium,
  })

  const [selectedExportType, setSelectedExportType] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isStartDateVisible, setIsStartDateVisible] = useState(false)
  const [isEndDateVisible, setIsEndDateVisible] = useState(false)

  const handleExportData = () => {
    if (selectedExportType && selectedFormat && startDate && endDate) {
      console.log(
        `Exporting ${selectedExportType} data as ${selectedFormat} from ${startDate} to ${endDate}...`
      )
    } else {
      console.log("Please select data type, format, and date range.")
    }
  }

  const handleConfirmStartDate = (date) => {
    setStartDate(moment(date).format("YYYY-MM-DD"))
    setIsStartDateVisible(false)

    if (endDate && moment(date).isAfter(endDate)) {
      setEndDate(null)
    }
  }

  const handleConfirmEndDate = (date) => {
    setEndDate(moment(date).format("YYYY-MM-DD"))
    setIsEndDateVisible(false)
  }

  const exportOptions = [
    { key: "1", value: "Expense History" },
    { key: "2", value: "Income Records" },
  ]

  const formatOptions = [
    { key: "1", value: "CSV" },
    { key: "2", value: "PDF" },
    { key: "3", value: "Excel" },
  ]

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
        <View style={styles.top}>
          <ArrowLeftIcon
            height={30}
            width={30}
            color="black"
            strokeWidth={2}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Export Data</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>What to Export:</Text>
          <SelectList
            data={exportOptions}
            setSelected={setSelectedExportType}
            placeholder="Select data type"
            boxStyles={styles.selectBox}
            inputStyles={styles.selectInput}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
          />

          <Text style={styles.sectionTitle}>Select Format:</Text>
          <SelectList
            data={formatOptions}
            setSelected={setSelectedFormat}
            placeholder="Select format"
            boxStyles={styles.selectBox}
            inputStyles={styles.selectInput}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
          />

          <Text style={styles.sectionTitle}>Select Date Range:</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dateBox}
            onPress={() => setIsStartDateVisible(true)}
          >
            <Text style={styles.dateText}>
              Start Date: {startDate ? startDate : "Select Start Date"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dateBox}
            onPress={() => setIsEndDateVisible(true)}
            disabled={!startDate}
          >
            <Text style={styles.dateText}>
              End Date: {endDate ? endDate : "Select End Date"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportData}
            activeOpacity={0.9}
          >
            <DownloadIcon width={26} height={26} color="white" />
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <DateTimePickerModal
        isVisible={isStartDateVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setIsStartDateVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isEndDateVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setIsEndDateVisible(false)}
        minimumDate={startDate ? new Date(startDate) : undefined}
      />
    </>
  )
}

export default ExportBox

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingVertical: 25,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    width: "100%",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    width: "80%",
  },
  content: {
    paddingHorizontal: 20,
    width: "100%",
  },
  sectionTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "black",
    marginTop: 30,
  },
  selectBox: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  selectInput: {
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins_400Regular",
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
  },
  dropdownText: {
    color: "black",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    borderColor: "#ddd",
  },
  descriptionTextInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 15,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    transition: "border-color 0.3s",
    height: 80,
  },
  dateBox: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "black",
  },
  exportButton: {
    backgroundColor: "#7F3DFF",
    paddingVertical: 10,
    marginTop: 40,
    width: "100%",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 20
  },
  exportButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
})
