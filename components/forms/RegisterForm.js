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
import i18n from '../../constants/configurations/config_languages'
import { capitalizeFirst, capitalizeAllFirst } from '../../utility/Capitalize'

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
        buttons: { ok: { onPress: this._hideDialog, label: i18n.t('ok') } }
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
    UserRest.register(
      this.state.email.value,
      this.state.name.value,
      this.state.password.value,
      this.state.gender.value,
      this.state.familyStatus.value,
      this.state.education.value,
      this.state.age.value
    )
      .then(_ => {
        this.setState({ isLoading: false })
        this.props.changeFormHandler()
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
              title: i18n.t('signup').toUpperCase(),
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
                label: capitalizeFirst(i18n.t('signup'))
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
              initialValue=''
            />
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
              id='age'
              label={capitalizeFirst(i18n.t('age'))}
              keyboardType='numeric'
              errorText=''
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            {this._renderGenderSection()}
            {this._renderFamilyStatusSection()}
            <Input
              id='education'
              label={capitalizeFirst(i18n.t('education'))}
              keyboardType='default'
              errorText=''
              multiline={true}
              numberOfLines={3}
              onInputChange={this.inputChangeHandler}
              initialValue=''
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
              initialValue=''
            />
            <Input
              id='confirmPassword'
              label={capitalizeAllFirst(i18n.t('confirm_password'))}
              keyboardType='default'
              required
              password
              autoCapitalize='none'
              autoCompleteType='password'
              secureTextEntry={true}
              errorText={i18n.t('please_enter_valid_confirm_password')}
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
            <Button
              icon='login'
              label={capitalizeFirst(i18n.t('login'))}
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
        label={capitalizeFirst(i18n.t('gender'))}
        // type={Dimensions.get('window').width > 400 ? 'row' : 'column'}
        type='row'
      >
        <CustomToggleButton
          icon='gender-male'
          value='male'
          label={capitalizeFirst(i18n.t('male'))}
        />
        <CustomToggleButton
          icon='gender-female'
          value='female'
          label={capitalizeFirst(i18n.t('female'))}
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
        // label={capitalizeAllFirst(i18n.t('family_status'))}
        styles={{
          container: { paddingHorizontal: 15 }
        }}
        type='row'
        data={[
          { label: capitalizeAllFirst(i18n.t('family_status')), value: null },
          { label: capitalizeFirst(i18n.t('single')), value: 'single' },
          { label: capitalizeFirst(i18n.t('married')), value: 'married' },
          {
            label: capitalizeFirst(i18n.t('cohabitation')),
            value: 'cohabitation'
          },
          {
            label: capitalizeFirst(i18n.t('widow_or_widower')),
            value: 'widow_or_widower'
          },
          { label: capitalizeFirst(i18n.t('other')), value: 'other' }
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
