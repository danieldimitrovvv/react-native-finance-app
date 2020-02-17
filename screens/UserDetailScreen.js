import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/UI/HeaderButton'
import UserDetailsTable from '../components/dataTables/UserDetailsTable'
import Card from '../components/UI/Card'
import ActivityIndicator from '../components/UI/ActivityIndicator'

import AuthRest from '../rests/AuthRest'
import i18n from '../constants/configurations/config_languages'

export default class UserDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      userDetails: {
        id: null,
        email: null,
        password: null,
        name: null,
        gender: null,
        familyStatus: null,
        education: null,
        years: null
      }
    }
  }

  componentDidMount () {
    this._setLoading(true)
    AuthRest.getUserDetail().then(userData => {
      this._setUserDetail(userData)
      this._setLoading(false)
    })
  }

  _setUserDetail = userDetails => this.setState({ userDetails })

  _setLoading = isLoading => this.setState({ isLoading })

  render () {
    let { userDetails, isLoading } = this.state
    return (
      <Surface style={styles.container}>
        {!isLoading ? (
          <Card
            header={{
              title: userDetails.name,
              subtitle: userDetails.email,
              leftContainer: {
                avatar: {
                  type: 'text',
                  label: userDetails?.name?.charAt(0)
                }
              }
            }}
          >
            <UserDetailsTable userDetails={userDetails} />
          </Card>
        ) : (
          <ActivityIndicator />
        )}
      </Surface>
    )
  }
}

UserDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: i18n.t('my_profile'),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title={i18n.t('menu')}
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30
  }
})
