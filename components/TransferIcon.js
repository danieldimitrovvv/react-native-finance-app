import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { TRANSACTION_TYPES } from '../models/Transaction'

const TransferIcon = props => {
  let name = null
  let color = 'black'

  if (props.type === TRANSACTION_TYPES.REVENUE) {
    name = Platform.OS === 'android' ? 'md-arrow-up' : 'ios-arrow-up'
    color = Colors.blue.main
  } else if (props.type === TRANSACTION_TYPES.EXPENSE) {
    name = Platform.OS === 'android' ? 'md-arrow-down' : 'ios-arrow-down'

    color = Colors.red.main
  } else {
    name = Platform.OS === 'android' ? 'md-sync' : 'ios-sync'
    color = Colors.blue.dark
  }
  return <Ionicons name={name} size={25} color={color} />
}

export default TransferIcon
