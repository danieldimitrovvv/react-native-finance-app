import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { ToggleButton, Surface, Text } from 'react-native-paper'

import Colors from '../../constants/Colors'
import InputLabel from './InputLabel'

const CustomToggleButtonGroup = props => {
  let Element =
    props.type === 'row' ? (
      <ToggleButton.Row
        style={{ ...styles.btnContainer, ...props.styles?.btnContainer }}
        onValueChange={value => props.onValueChange(value)}
        value={props.value}
      >
        {props.children}
      </ToggleButton.Row>
    ) : (
      <ToggleButton.Group
        style={{ ...styles.btnContainer, ...props.styles?.btnContainer }}
        onValueChange={value => props.onValueChange(value)}
        value={props.value}
      >
        {props.children}
      </ToggleButton.Group>
    )
  return (
    <Surface
      style={{
        ...styles.container,
        ...props.styles?.container,
        flexDirection: props.type === 'row' ? 'row' : 'column'
      }}
    >
      <InputLabel label={props.label} required={props.required}/>

      {Element}
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    position: 'relative'
  }
})
export default CustomToggleButtonGroup
