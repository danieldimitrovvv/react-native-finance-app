import React from 'react'
import { Button, DefaultTheme } from 'react-native-paper'

import Colors from '../../constants/Colors'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue.dark,
    accent: Colors.blue.main
  }
}

const CustomButton = props => {
  return (
    <Button theme={theme} {...props} >
      {props.label}
    </Button>
  )
}

export default CustomButton