import * as React from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'

import Card from '../UI/Card'
import Input from '../UI/Input'
import Dialog from '../UI/Dialog'

import AuthRest from '../../rests/AuthRest'

import Colors from '../../constants/Colors'
import AccountRest from '../../rests/AccountRest'

export default class AccountForm extends React.Component {
  constructor(props) {
    console.log(props.navigation);
    super(props)
    this.state = {
      name: {
        value: null,
        isValid: false
      },
      availability: {
        value: null,
        isValid: false
      },
      dialog: {
        visible: false,
        message: '',
        title: '',
        onDismiss: this._hideDialog,
        buttons: { ok: { onPress: this._hideDialog, label: 'ok' } }
      },
      formIsValid: false,
      isLoading: false
    }
  }

  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    this.setState((state, props) => ({
      [inputIdentifier]: { value: inputValue, isValid: inputValidity },
      formIsValid: state.name.isValid && state.availability.isValid
    }))
  }
  submit = () => {
    this.setState({ isLoading: true })
    AccountRest.add(this.state.name.value, this.state.availability.value)
      .then(_ => {
        this.setState({ isLoading: false })
        this.props.navigation.navigate('Accounts')
      })
      .catch(error => {
        this.setState(state => ({
          isLoading: false,
          dialog: {
            ...state.dialog,
            visible: true,
            message: error,
            title: 'ERROR'
          }
        }))
      })
  }
  render () {
    return (
      <React.Fragment>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={50}
          style={styles.screen}
        >
          <Card
            header={{
              title: 'Account'.toUpperCase(),
              titleStyle: styles.cardHeader
            }}
            style={{ ...styles.container, ...this.props?.style?.container }}
            buttons={{
              ok: {
                compact: true,
                icon: 'content-save-outline',
                mode: 'contained',
                loading: this.state.isLoading,
                onPress: this.submit,
                disabled: !this.state.formIsValid,
                label: 'Save'
              }
            }}
          >
            <Input
              id='name'
              label='Name'
              keyboardType='default'
              required
              autoCapitalize='none'
              errorText='Please enter a name.'
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />

            <Input
              id='availability'
              label='Availability'
              keyboardType='default'
              required
              autoCapitalize='none'
              errorText='Please enter a valid availability.'
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
          </Card>
        </KeyboardAvoidingView>
        <Dialog {...this.state.dialog} />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width:'100%'
  },
  container: {
    paddingHorizontal: 15,
    width: '80%'
  },
  cardHeader: {
    textAlign: 'center',
    color: Colors['blue'].pale,
    fontFamily: 'open-sans-bold'
  }
})
