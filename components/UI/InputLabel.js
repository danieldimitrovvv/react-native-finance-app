import React from 'react'
import { Text, StyleSheet } from 'react-native'

const InputLabel = props => {
  return (
    <Text style={{ ...styles.label, ...props.styles?.label }}>
      {props.label}
      {props.required ? <Text style={{ ...styles.required }}> *</Text> : null}
    </Text>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  required: {
    color: 'red'
  }
})

export default InputLabel
