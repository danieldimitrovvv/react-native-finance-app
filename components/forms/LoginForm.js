import * as React from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'

import Card from '../UI/Card'
import Input from '../UI/Input'
import Dialog from '../UI/Dialog'

import AuthRest from '../../rests/AuthRest'

import Colors from '../../constants/Colors'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: {
        value: null,
        isValid: false
      },
      password: {
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
      formIsValid: state.email.isValid && state.password.isValid
    }))
  }
  submit = () => {
    this.setState({ isLoading: true })
    AuthRest.login(this.state.email.value, this.state.password.value)
      .then(_ => {
        this.setState({ isLoading: false })
        this.props.navigation.navigate('Statistics')
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
              title: 'Login'.toUpperCase(),
              titleStyle: styles.cardHeader
            }}
            style={{ ...styles.container, ...this.props?.style?.container }}
            buttons={{
              actionContainer: {
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              },
              ok: {
                compact: true,
                icon: 'login',
                mode: 'contained',
                loading: this.state.isLoading,
                onPress: this.submit,
                disabled: !this.state.formIsValid,
                label: 'login'
              }
            }}
          >
            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address.'
              onInputChange={this.inputChangeHandler}
              initialValue='dan@abv.b'
            />

            <Input
              id='password'
              label='Password'
              keyboardType='default'
              required
              password
              autoCapitalize='none'
              autoCompleteType='password'
              secureTextEntry={true}
              errorText='Please enter a valid password.'
              onInputChange={this.inputChangeHandler}
              initialValue='12'
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
    flex: 1
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
