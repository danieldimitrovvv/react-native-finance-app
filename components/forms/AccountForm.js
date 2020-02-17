import * as React from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'

import Card from '../UI/Card'
import Input from '../UI/Input'
import Dialog from '../UI/Dialog'

import AuthRest from '../../rests/AuthRest'

import Colors from '../../constants/Colors'
import AccountRest from '../../rests/AccountRest'
import i18n from '../../constants/configurations/config_languages'
import { capitalizeFirst } from '../../utility/Capitalize'

export default class AccountForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: {
        value: null,
        isValid: false
      },
      balance: {
        value: null,
        isValid: false
      },
      goal: {
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
      formIsValid: state.name.isValid && state.balance.isValid
    }))
  }
  submit = () => {
    this.setState({ isLoading: true })
    AccountRest.add(this.state.name.value, this.state.balance.value)
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
            title: i18n.t('error').toUpperCase()
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
              title: i18n.t('account').toUpperCase(),
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
                label: capitalizeFirst(i18n.t('save'))
              }
            }}
          >
            <Input
              id='name'
              label={capitalizeFirst(i18n.t('name'))}
              keyboardType='default'
              required
              autoCapitalize='none'
              errorText={i18n.t('please_enter_name')}
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            <Input
              id='balance'
              label={capitalizeFirst(i18n.t('balance'))}
              keyboardType='default'
              required
              autoCapitalize='none'
              errorText={i18n.t('please_enter_balance')}
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            <Input
              id='goal'
              label={capitalizeFirst(i18n.t('goal'))}
              keyboardType='decimal-pad'
              autoCapitalize='none'
              errorText={i18n.t('please_enter_valid_goal')}
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
    width: '100%'
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
