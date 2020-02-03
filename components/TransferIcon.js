import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const TransferIcon = props => {
  let name = null
  let color = 'black'

  if (props.type === 'income') {
    name = Platform.OS === 'android' ? 'md-arrow-up' : 'ios-arrow-up'
    color = Colors.blue.main
  } else if (props.type === 'expense') {
    name = Platform.OS === 'android' ? 'md-arrow-down' : 'ios-arrow-down'

    color = Colors.red.main
  } else {
    name = Platform.OS === 'android' ? 'md-sync' : 'ios-sync'
    color = Colors.blue.dark
  }
  return <Ionicons name={name} size={25} color={color} />
}

export default TransferIcon
