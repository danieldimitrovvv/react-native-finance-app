import * as React from 'react'
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { Text, Surface } from 'react-native-paper'

import Card from '../UI/Card'
import Input from '../UI/Input'
import Dialog from '../UI/Dialog'

import Colors from '../../constants/Colors'
import CategoryRest from '../../rests/CategoryRest'
import RadioButtonList from '../UI/RadioButtonList'
import CustomToggleButton from '../UI/ToggleButton'
import CustomToggleButtonGroup from '../UI/ToggleButtonGroup'
import ErrorText from '../UI/ErrorText'
import InputLabel from '../UI/InputLabel'

export default class CategoryForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: {
        value: null,
        isValid: false
      },
      type: {
        value: null,
        isValid: false,
        touch: false,
        errorMessage: 'Please select a category type!!!'
      },
      limit: {
        value: null,
        isValid: false,
        type: 'cash'
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
      formIsValid:
        state.name.isValid && state.type.isValid
    }))
  }
  _changeTypeHandler = value =>
    this.setState(state => ({
      type: { ...state.type, value, isValid: true, touch: true }
    }))

  submit = () => {
    this.setState({ isLoading: true })
    CategoryRest.add(
      this.state.name.value,
      this.state.type.value,
      this.state.limit.value + this.state.limit.type
    )
      .then(_ => {
        this.setState({ isLoading: false })
        this.props.navigation.navigate('Categories')
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
          {this._renderFormCard()}
        </KeyboardAvoidingView>
        <Dialog {...this.state.dialog} />
      </React.Fragment>
    )
  }

  _renderFormCard = () => {
    return (
      <Card
        header={{
          title: 'Category'.toUpperCase(),
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
        {this._renderFormCardContent()}
      </Card>
    )
  }

  _renderFormCardContent = () => {
    return (
      <React.Fragment>
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
        {this._renderCategoryTypeSection()}
        {this.state.type.value === 'expense' && this._renderLimitSection()}
      </React.Fragment>
    )
  }

  _renderCategoryTypeSection = () => {
    return (
      <View style={styles.typeContainer}>
        <InputLabel label='Type' required />
        <Surface style={styles.typeRadioBtnContainer}>
          <RadioButtonList
            data={[
              { title: 'Income', value: 'income' },
              { title: 'Expense', value: 'expense' }
            ]}
            onValueChange={this._changeTypeHandler}
          />
        </Surface>
        {this.state.type.touch && !this.state.type.isValid && (
          <ErrorText errorText={this.state.type.errorMessage} />
        )}
      </View>
    )
  }
  _renderLimitSection = () => {
    return (
      <React.Fragment>
        <Input
          id='limit'
          label='Limit'
          keyboardType='number-pad'
          autoCapitalize='none'
          errorText='Please enter a valid limit.'
          onInputChange={this.inputChangeHandler}
          initialValue=''
        />
        {this._renderLimitTypeSection()}
      </React.Fragment>
    )
  }

  _renderLimitTypeSection = () => {
    return (
      <CustomToggleButtonGroup
        onValueChange={value =>
          this.setState(state => ({
            limit: { ...state.limit, type: value }
          }))
        }
        value={this.state.limit.type}
        label='Limit in:'
        type={'row'}
      >
        <CustomToggleButton icon='cash' value='cash' />
        <CustomToggleButton icon='percent' value='percent' />
      </CustomToggleButtonGroup>
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
  },
  typeContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  typeRadioBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})
