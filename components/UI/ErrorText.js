import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const ErrorText = props => (
  <View style={{ ...styles.errorContainer, ...props.styles?.errorContainer }}>
    <Text style={{ ...styles.errorText, ...props.styles?.errorText }}>
      {props.errorText}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
})

export default ErrorText

