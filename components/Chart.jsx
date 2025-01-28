import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SpendIncomeLineChart = () => {
  const [selectedData, setSelectedData] = useState(null);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [1000, 1200, 1500, 1400, 1600],
        strokeWidth: 5,
        color: () => '#7F3DFF',
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const screenWidth = Dimensions.get('window').width;

  const handleDataPointClick = (data) => {
    const { index } = data;
    const month = data.labels[index];
    const amount = data.datasets[0].data[index];
    setSelectedData({ month, amount });
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <LineChart
        data={data}
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
      {selectedData && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Selected Data:
          </Text>
          <Text style={{ fontSize: 14 }}>
            Month: {selectedData.month}
          </Text>
          <Text style={{ fontSize: 14 }}>
            Amount: ${selectedData.amount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SpendIncomeLineChart;
