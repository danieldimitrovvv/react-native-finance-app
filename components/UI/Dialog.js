import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Portal, Dialog, Button, Paragraph } from 'react-native-paper'

const dialog = props => {
  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={props.hideDialog}
        style={{ ...styles.dialogContainer, ...props.styles?.dialogContainer }}
      >
        {props.title && (
          <Dialog.Title style={{ ...styles.title, ...props.styles?.title }}>
            {props.title}
          </Dialog.Title>
        )}
        {dialogContent(props)}
        {props.buttons && dialogActions(props.buttons)}
      </Dialog>
    </Portal>
  )
}

const dialogContent = props => {
  let ContentDialogComponent = props.children ? (
    <Dialog.ScrollArea>
      <ScrollView
        contentContainerStyle={{
          ...styles.dialogScrollArea,
          ...props.styles?.ScrollArea
        }}
      >
        {props.message && <Paragraph>{props.message}</Paragraph>}
        {props.children}
      </ScrollView>
    </Dialog.ScrollArea>
  ) : props.message ? (
    <Dialog.Content>
      <Paragraph>{props.message}</Paragraph>
    </Dialog.Content>
  ) : null

  return ContentDialogComponent
}
const dialogActions = props => {
  return (
    <Dialog.Actions>
      {props.cancel && <Button {...props.cancel}>{props.cancel.label}</Button>}
      {props.ok && <Button {...props.ok}>{props.ok.label}</Button>}
    </Dialog.Actions>
  )
}

const styles = StyleSheet.create({
  dialogContainer: {
    maxHeight: '80%'
  },
  dialogScrollArea: {
    paddingHorizontal: 24,
  },
  title: {}
})

export default dialog
