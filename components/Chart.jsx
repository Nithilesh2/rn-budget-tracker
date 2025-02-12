import React, { useContext, useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AppContext } from "../context/AppContext";

const SpendIncomeLineChart = () => {
  const { userData } = useContext(AppContext);
  const [selectedData, setSelectedData] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const aggregateDataByDay = (data) => {
    const dailyData = {};

    data.forEach((entry) => {
      if (!entry.timestamp || !entry.timestamp.seconds) {
        console.warn("Invalid timestamp in entry:", entry);
        return;
      }

      const date = new Date(entry.timestamp.seconds * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      if (entry.method === "Expense") {
        dailyData[date] -= entry.amount;
      } else if (entry.method === "Income") {
        dailyData[date] += entry.amount;
      }
    });

    const labels = Object.keys(dailyData);
    const amounts = Object.values(dailyData).map((amount) => {
      if (isNaN(amount)) return 0;
      if (!isFinite(amount)) return 0; 
      return amount;
    });

    return { labels, amounts };
  };

  useEffect(() => {
    if (userData && userData.length > 0) {
      const aggregatedData = aggregateDataByDay(userData);
      setChartData({
        labels: aggregatedData.labels,
        datasets: [
          {
            data: aggregatedData.amounts,
            strokeWidth: 5,
            color: () => "#7F3DFF",
          },
        ],
      });
    } else {
      setChartData({
        labels: [],
        datasets: [{ data: [], strokeWidth: 5, color: () => "#7F3DFF" }],
      });
    }
  }, [userData]);

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const screenWidth = Dimensions.get("window").width;

  const handleDataPointClick = (data) => {
    const { index } = data;
    const day = chartData.labels[index];
    const amount = chartData.datasets[0].data[index];
    setSelectedData({ day, amount });
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <LineChart
          data={chartData}
          width={screenWidth + 100}
          height={220}
          chartConfig={chartConfig}
          withDots={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withInnerLines={false}
          withOuterLines={false}
          bezier
          onDataPointClick={handleDataPointClick}
        />
      ) : (
        <Text>No data available</Text>
      )}
      {selectedData && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Selected Data:
          </Text>
          <Text style={{ fontSize: 14 }}>Day: {selectedData.day}</Text>
          <Text style={{ fontSize: 14 }}>Amount: ${selectedData.amount}</Text>
        </View>
      )}
    </View>
  );
};

export default SpendIncomeLineChart;