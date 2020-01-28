import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { List } from 'react-native-paper'

const list = props => {
  return (
    <List.Section
      contentContainerStyle={{
        ...styles.container,
        ...props?.style?.container
      }}
    >
      {props.data.map(item => listItem({ ...props, ...item }))}
    </List.Section>
  )
}

const listItem = props => {
  let LeftComponent = props.leftContainer
  let RightComponent = props.rightContainer


  if (LeftComponent && RightComponent) {
    return (
      <List.Item
        {...props}
        left={props => {
          return { ...LeftComponent, ...props }
        }}
        right={props => {
          return { ...RightComponent, ...props }
        }}
      />
    )
  }

  if (LeftComponent) {
    return (
      <List.Item
        {...props}
        left={props => {
          return { ...LeftComponent, ...props }
        }}
      />
    )
  }

  if (RightComponent) {
    return (
      <List.Item
        {...props}
        right={props => {
          return { ...RightComponent, ...props }
        }}
      />
    )
  }
  return <List.Item {...props} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30
  }
})

export default list
