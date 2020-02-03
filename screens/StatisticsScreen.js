import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Button } from "react-native";
import Chart, { chartTypes } from "../components/Chart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import DataLineChart from "../constants/chart/line-chart-config";
import DataBarChart from "../constants/chart/bar-chart-config";
import DataPieChart from "../constants/chart/pie-chart-config";
import DataStackedBarChart from "../constants/chart/stacked-bar-chart-config";
import DataContributionGraphChart from "../constants/chart/contribution-graph-chart-config";
import DataProgressChart from "../constants/chart/progress-chart-config";
import HeaderButton from "../components/UI/HeaderButton";

import Colors, {getColorsTheme, THEME_TYPES} from "../constants/Colors";

import ColorRest from "../rests/ColorRest";

const getChart = (type, theme = THEME_TYPES.ORANGE, key) => {
  switch (type) {
    case "line-bazier":
      return (
        <Chart
          key={key}
          data={DataLineChart}
          title="Bezier Line"
          yAxisLabel={"$"}
          yAxisSuffix={"k"}
          bezier
          theme={theme}
        />
      );
    case "pie":
      return (
        <Chart
          key={key}
          title="Pie"
          chartType={chartTypes.pie}
          data={DataPieChart}
          accessor="population"
          backgroundColor='transparent'
          // backgroundColor={getColorsTheme(theme).main}
          paddingLeft="15"
          absolute
          theme={theme}
        />
      );
    case "progress":
      return (
        <Chart
          key={key}
          title="Progress"
          chartType={chartTypes.progress}
          data={DataProgressChart}
          theme={theme}
        />
      );

    case "bar":
      return (
        <Chart
          key={key}
          title="Bar"
          chartType={chartTypes.bar}
          data={DataBarChart}
          yAxisLabel={"$"}
          verticalLabelRotation={30}
          theme={theme}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      );

    case "stackedBar":
      return (
        <Chart
          key={key}
          title="Stacked Bar"
          chartType={chartTypes.stackedBar}
          data={DataStackedBarChart}
          theme={theme}
        />
      );

    case "contributionGraph":
      return (
        <Chart
          key={key}
          title="Contribution Graph"
          chartType={chartTypes.contributionGraph}
          values={DataContributionGraphChart}
          endDate={new Date("2017-04-01")}
          numDays={105}
          theme={theme}
        />
      );
    default:
      return (
        <Chart
          key={key}
          data={DataLineChart}
          title="Line"
          yAxisLabel={"$"}
          yAxisSuffix={"k"}
          theme={theme}
        />
      );
  }
};

export default function StatisticsScreen() {
  const typesChart = [
    "line",
    "line-bazier",
    "pie",
    "progress",
    "stackedBar",
    "bar",
    "contributionGraph"
  ];
  const [theme, setTheme] = useState("blue");

  ColorRest.getTheme().then(theme => setTheme(theme));

  return (
    <ScrollView
      style={{ ...styles.container }}
    >
      {typesChart.map((chartType, index) => getChart(chartType, theme, index))}
    </ScrollView>
  );
}

StatisticsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Statistics",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: getColorsTheme(theme).dark,
    paddingVertical: 30
  },
  controlContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonContainer: {
    width: "45%"
  },
  scannerContainer: {
    height: 500
  }
});
