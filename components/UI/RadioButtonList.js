import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { RadioButton } from 'react-native-paper'

const RadioButtonList = props => {
  const [value, setValue] = useState(null)
  return (
    <RadioButton.Group
      onValueChange={value => {
        setValue(value)
        props.onValueChange(value)
      }}
      value={value}
    >
      {props.data.map((item, index) =>
        RadioButtonListItem({ ...item, key: index })
      )}
    </RadioButton.Group>
  )
}

const RadioButtonListItem = props => {
  return (
    <View
      key={props.key}
      style={{ ...styles.container, ...props.styles?.container }}
    >
      <Text style={{ ...styles.title, ...props.styles?.title }}>
        {props.title}
      </Text>
      <RadioButton value={props.value} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    padding: 10
  }
})

export default RadioButtonList
