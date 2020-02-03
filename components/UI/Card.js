import * as React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Caption,
  // Button
} from 'react-native-paper'

import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

import Button from './Button'

const card = props => {
  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
        ...props?.style?.container
      }}
    >
      <Card {...props.card}>
        {props.header ? cardHeader(props.header) : null}
        {props.cover ? cardCover(props.cover) : null}
        {props.content ? cardContent(props.content) : null}
        {props.children}
        {props.buttons ? cardActions(props.buttons) : null}
      </Card>
    </ScrollView>
  )
}

const cardHeader = props => {
  let LeftComponent = props.leftContainer
    ? LeftHeaderComponent(props.leftContainer)
    : null
  let RightComponent = props.rightContainer

  if (LeftComponent && RightComponent) {
    return (
      <Card.Title
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
      <Card.Title
        {...props}
        left={props => {
          return { ...LeftComponent, ...props }
        }}
      />
    )
  }

  if (RightComponent) {
    return (
      <Card.Title
        {...props}
        right={props => {
          return { ...RightComponent, ...props }
        }}
      />
    )
  }
  return <Card.Title {...props} />
}

const LeftHeaderComponent = props => {
  let LeftComponent =
    props?.avatar?.type == 'icon' ? (
      <Avatar.Icon
        {...props}
        icon={props?.icon?.name ? props.icon.name : 'credit-card'}
        color={props?.icon?.color ? props.icon.color : 'white'}
        size={props?.icon?.size ? props.icon.size : 25}
        style={{
          ...(props?.icon?.style ? props.icon.style : {}),
          backgroundColor: Colors.blue.main
        }}
      />
    ) : props?.avatar?.type == 'text' ? (
      <Avatar.Text
        color={props?.icon?.color ? props.icon.color : 'white'}
        size={props?.icon?.size ? props.icon.size : 25}
        style={{
          ...(props?.icon?.style ? props.icon.style : {}),
          backgroundColor: Colors.blue.main
        }}
        label={props.avatar.label ? props.avatar.label : ''}
      />
    ) : props.icon ? (
      <Ionicons
        name={props?.icon?.name ? props.icon.name : 'ios-card'}
        color={props?.icon?.color ? props.icon.color : Colors.blue.main}
        size={props?.icon?.size ? props.icon.size : 25}
        style={{
          ...(props?.icon?.style ? props.icon.style : {}),
          textAlign: 'center'
        }}
      />
    ) : null
  return LeftComponent
}

const cardCover = props => (
  <View>
    <Card.Cover {...props} source={{ uri: props.uri }} />
    {props.caption ? (
      <View style={styles.coverCaptionContainer}>
        <Caption style={styles.coverCaption}>{props.caption}</Caption>
      </View>
    ) : null}
  </View>
)

const cardContent = props => (
  <Card.Content {...props.contentContainer}>
    <Title {...props.titleContainer}>{props.title}</Title>
    <Paragraph {...props.descriptionContainer}>{props.description}</Paragraph>
  </Card.Content>
)

const cardActions = props => (
  <Card.Actions {...props.actionContainer}>
    {props.cancel ? (
      <Button {...props.cancel}>
        {props.cancel.label ? props.cancel.label : 'Cancel'}
      </Button>
    ) : null}
    {props.ok ? (
      <Button {...props.ok}>{props.ok.label ? props.ok.label : 'Ok'}</Button>
    ) : null}
  </Card.Actions>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30
  },
  coverCaptionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  coverCaption: {
    textAlign: 'center'
  }
})

export default card
