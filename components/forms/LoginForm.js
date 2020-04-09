import * as React from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'

import Card from '../UI/Card'
import Input from '../UI/Input'
import Dialog from '../UI/Dialog'
import Button from '../UI/Button'

import AuthRest from '../../rests/AuthRest'

import Colors from '../../constants/Colors'
import i18n from '../../constants/configurations/config_languages'
import { capitalizeFirst } from '../../utility/Capitalize'

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
        buttons: { ok: { onPress: this._hideDialog, label: i18n.t('ok') } }
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
            message: error.response.data.error,
            title: i18n.t('error').toUpperCase()
          }
        }))
      })
  }
  render() {
    return (
      <React.Fragment>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset={50}
          style={styles.screen}
        >
          <Card
            header={{
              title: i18n.t('login').toUpperCase(),
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
                label: i18n.t('login')
              }
            }}
          >
            <Input
              id='email'
              label={capitalizeFirst(i18n.t('email'))}
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText={i18n.t('please_enter_valid_email')}
              onInputChange={this.inputChangeHandler}
              initialValue='danieldimitrovvv@abv.bg'
            />

            <Input
              id='password'
              label={capitalizeFirst(i18n.t('password'))}
              keyboardType='default'
              required
              password
              autoCapitalize='none'
              autoCompleteType='password'
              secureTextEntry={true}
              errorText={i18n.t('please_enter_valid_password')}
              onInputChange={this.inputChangeHandler}
              initialValue='Dan95iel!'
            />
            <Button
              icon='registered-trademark'
              label={capitalizeFirst(i18n.t('signup'))}
              onPress={this.props.changeFormHandler}
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
    color: Colors.blue.dark,
    fontFamily: 'open-sans-bold'
  }
})
