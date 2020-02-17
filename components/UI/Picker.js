import * as React from 'react'
import { StyleSheet, View, Text, Picker } from 'react-native'
import InputLabel from './InputLabel'

const CustomPicker = props => {
  return (
    <View
      style={{
        ...styles.container,
        ...props.styles?.container,
        flexDirection: props.type ? props.type : 'row'
      }}
    >
      {props.label && (
        <View
          style={{ ...styles.labelContainer, ...props.styles?.labelContainer }}
        >
          <InputLabel label={props.label} required={props.required} />
        </View>
      )}
      <View
        style={{ ...styles.pickerContainer, ...props.styles?.pickerContainer }}
      >
        <Picker
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
          mode={props.mode ? props.mode : 'dropdown'}
        >
          {props.data.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  labelContainer: {
    flex: 1
  },
  pickerContainer: {
    flex: 2
  }
})

export default CustomPicker
