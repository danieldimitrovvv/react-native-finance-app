import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import Colors from "../constants/Colors";

let colors = Colors.orange;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: colors.dark,
  backgroundGradientTo: colors.main,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: colors.main
  }
};

const chart = props => {
  const ChartComponent = props.chartType ? props.chartType : LineChart;
  colors = props.theme ? Colors[props.theme] : Colors.blue;
  return (
    <View style={{ ...styles.container, backgroundColor: colors.pale }}>
      <View style={{ ...styles.titleContainer, backgroundColor: colors.dark }}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <ChartComponent
        {...props}
        data={props.data}
        width={props.width ? props.width : Dimensions.get("window").width - 30}
        height={props.height ? props.height : 220}
        chartConfig={{
          ...chartConfig,
          ...props.chartConfig,
          backgroundGradientFrom: colors.dark,
          backgroundGradientTo: colors.main,
          propsForDots: {
            stroke: colors.main
          }
        }}
        style={{ ...styles.chart, ...props.styles }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 2
  },
  title: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    borderRadius: 50
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    elevation: 1
  }
});

const chartTypes = {
  line: LineChart,
  pie: PieChart,
  progress: ProgressChart,
  bar: BarChart,
  stackedBar: StackedBarChart,
  contributionGraph: ContributionGraph
};

export { chartTypes };
export default chart;
