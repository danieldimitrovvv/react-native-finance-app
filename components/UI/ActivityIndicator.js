import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import  Colors  from '../../constants/Colors'

const activityIndicator = props => {
  return <ActivityIndicator animating={true} size='large' color={Colors.blue.dark} />
}

export default activityIndicator
