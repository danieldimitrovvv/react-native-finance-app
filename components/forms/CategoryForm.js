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
        state.name.isValid && state.type.isValid && state.limit.isValid
    }))
  }
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
              id='limit'
              label='Limit'
              keyboardType='number-pad'
              required
              autoCapitalize='none'
              errorText='Please enter a valid limit.'
              onInputChange={this.inputChangeHandler}
              initialValue=''
            />
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

            <View style={styles.typeContainer}>
              <Text style={styles.typeLabel}>Type</Text>
              <Surface style={styles.typeRadioBtnContainer}>
                <RadioButtonList
                  data={[
                    { title: 'Income', value: 'income' },
                    { title: 'Expense', value: 'expense' }
                  ]}
                  onValueChange={value =>
                    this.setState(state => ({
                      type: { ...state.type, value, isValid: true, touch: true }
                    }))
                  }
                />
              </Surface>
              {this.state.type.touch && !this.state.type.isValid && (
                <ErrorText errorText={this.state.type.errorMessage}/>
              )}
            </View>
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
    color: Colors['blue'].pale,
    fontFamily: 'open-sans-bold'
  },
  typeContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  typeRadioBtnContainer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    width: '100%',
  },
  typeLabel: {
    width: '100%',
    color: 'black',
    fontFamily: 'open-sans-bold'
  }
})
