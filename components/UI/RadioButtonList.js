import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { RadioButton, Surface } from 'react-native-paper'
import InputLabel from './InputLabel'

const RadioButtonList = props => {
  console.log(props.styles)
  return (
    <Surface style={{ ...styles.container, ...props.styles?.container }}>
      <InputLabel label={props.label} required={props.required}></InputLabel>
      <RadioButton.Group onValueChange={props.onValueChange} value={props.value}>
        {props.data.map((item, index) =>
          RadioButtonListItem({ ...item, key: index })
        )}
      </RadioButton.Group>
    </Surface>
  )
}

const RadioButtonListItem = props => {
  return (
    <View
      key={props.key}
      style={{ ...styles.itemContainer, ...props.styles?.itemContainer }}
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
    width: '90%'
  },
  itemContainer: {
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
