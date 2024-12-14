import { View, Text } from "react-native"
import React from "react"
import PieChart from "react-native-pie-chart"

const CircularChart = () => {
  return (
    <View>
      <Text>CircularChart</Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.45}
        coverFill={"#FFF"}
      />
    </View>
  )
}

export default CircularChart
