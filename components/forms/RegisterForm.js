import * as React from 'react'
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'

import Card from '../UI/Card'
import Input from '../UI/Input'
import CustomToggleButton from '../UI/ToggleButton'
import ToggleButtonGroup from '../UI/ToggleButtonGroup'
import Dialog from '../UI/Dialog'
import Picker from '../UI/Picker'
import Button from '../UI/Button'

import Colors from '../../constants/Colors'

import UserRest from '../../rests/UserRest'

export default class RegisterForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: {
        text: null,
        isValid: false
      },
      name: {
        text: null,
        isValid: false
      },
      password: {
        value: null,
        isValid: false
      },
      confirmPassword: {
        value: null,
        isValid: false
      },
      gender: {
        value: null,
        isValid: false
      },
      familyStatus: {
        value: null,
        isValid: false
      },
      education: {
        value: null,
        isValid: false
      },
      age: {
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
  inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    this.setState((state, props) => ({
      [inputIdentifier]: { value: inputValue, isValid: inputValidity },
      formIsValid:
        state.name.isValid &&
        state.email.isValid &&
        state.password.isValid &&
        state.confirmPassword.isValid &&
        state.password.value === state.confirmPassword.value
    }))
  }
  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  onSubmit = () => {
    this.setState({ isLoading: true })
    UserRest.registerUser(
      this.state.email.value,
      this.state.password.value,
      this.state.gender.value,
      this.state.familyStatus.value,
      this.state.education.value,
      this.state.age.value
    )
      .then(userId => {
        this.setState({ isLoading: false })
        this.props.changeFormHandler()
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

  _changeFamilyStatusHandler = familyStatus => {
    this.setState({
      familyStatus: { value: familyStatus, isValid: true }
    })
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={50}
        style={styles.screen}
      >
        <ScrollView>
          <Card
            style={{ ...styles.container, ...this.props?.style?.container }}
            header={{
              title: 'Signup'.toUpperCase(),
              titleStyle: styles.cardHeader
            }}
            buttons={{
              ok: {
                compact: true,
                icon: 'registered-trademark',
                mode: 'contained',
                loading: this.state.isLoading,
                onPress: this.onSubmit,
                disabled: !this.state.formIsValid,
                label: 'Signup'
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
              initialValue=''
            />
            <Input
              id='name'
              label='Name'
              keyboardType='default'
              required
              autoCapitalize='none'
              errorText='Please enter name.'
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            <Input
              id='age'
              label='Age'
              keyboardType='numeric'
              errorText=''
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            {this._renderGenderSection()}
            {this._renderFamilyStatusSection()}
            <Input
              id='education'
              label='Education'
              keyboardType='default'
              errorText=''
              multiline={true}
              numberOfLines={3}
              onInputChange={this.inputChangeHandler}
              initialValue=''
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
              initialValue=''
            />
            <Input
              id='confirmPassword'
              label='Confirm Password'
              keyboardType='default'
              required
              password
              autoCapitalize='none'
              autoCompleteType='password'
              secureTextEntry={true}
              errorText='Please enter a valid confirm password.'
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            <Button
              icon='login'
              label='Login'
              onPress={this.props.changeFormHandler}
            />
          </Card>
        </ScrollView>
        <Dialog {...this.state.dialog} />
      </KeyboardAvoidingView>
    )
  }

  _renderGenderSection = () => {
    return (
      <ToggleButtonGroup
        onValueChange={value => this.setState({ gender: { value } })}
        value={this.state.gender.value}
        label='Gender'
        // type={Dimensions.get('window').width > 400 ? 'row' : 'column'}
        type='row'
      >
        <CustomToggleButton icon='gender-male' value='male' label='Male' />
        <CustomToggleButton
          icon='gender-female'
          value='female'
          label='Female'
        />
        {/* <CustomToggleButton
                icon='gender-male-female'
                value='gender'
                label='Gender'
              /> */}
      </ToggleButtonGroup>
    )
  }

  _renderFamilyStatusSection = () => {
    return (
      <Picker
        selectedValue={this.state.familyStatus.value}
        onValueChange={this._changeFamilyStatusHandler}
        label='Family Status'
        styles={{
          container: { paddingHorizontal: 15 }
        }}
        data={[
          { label: 'Select Options', value: null },
          { label: 'Single', value: 'single' },
          { label: 'Is Complicated', value: 'isComplicated' },
          { label: 'Married', value: 'married' }
        ]}
      />
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
