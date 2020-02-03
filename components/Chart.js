import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import Card from './UI/Card'
import Colors, { getColorsTheme, THEME_TYPES } from '../constants/Colors'

let colors = getColorsTheme(THEME_TYPES.ORANGE)

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: colors.dark,
  backgroundGradientTo: colors.main,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: colors.main
  }
}

const chart = props => {
  const ChartComponent = props.chartType ? props.chartType : LineChart
  colors = props.theme ? getColorsTheme(props.theme) : Colors.blue
  return (
    <View style={{ ...styles.container, ...props.styles?.container }}>
      <Card card={{ style: styles.card }}>
        <ChartComponent
          {...props}
          data={props.data}
          width={
            props.width ? props.width : Dimensions.get('window').width - 30
          }
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
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: Dimensions.get('window').width - 30
  }
})

const chartTypes = {
  line: LineChart,
  pie: PieChart,
  progress: ProgressChart,
  bar: BarChart,
  stackedBar: StackedBarChart,
  contributionGraph: ContributionGraph
}

export { chartTypes }
export default chart
