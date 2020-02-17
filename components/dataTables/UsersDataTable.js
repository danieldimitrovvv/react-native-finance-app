import React from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { DataTable } from 'react-native-paper'
import i18n from '../../constants/configurations/config_languages'
import { capitalizeFirst } from '../../utility/Capitalize'

const UsersDataTable = props => {
  return (
    <DataTable style={styles.dataTable}>
      <DataTable.Header>
        <DataTable.Title>{capitalizeFirst(i18n.t('name'))}</DataTable.Title>
        <DataTable.Title>{capitalizeFirst(i18n.t('email'))}</DataTable.Title>
        <DataTable.Title numeric>{capitalizeFirst(i18n.t('age'))}</DataTable.Title>
      </DataTable.Header>
      <ScrollView style={styles.dataTableRows}>
        {props.users.map(u => (
          <DataTable.Row>
            <DataTable.Cell>{u.name}</DataTable.Cell>
            <DataTable.Cell>{u.email}</DataTable.Cell>
            <DataTable.Cell numeric>{u.age ? u.age : '-'}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </ScrollView>
    </DataTable>
  )
}

const styles = StyleSheet.create({
  dataTable: {
    height: Dimensions.get('window').height < 650 ? '70%' : '85%'
  },
  dataTableRows: {
    height: '70%'
  },
  message: {
    textAlign: 'center'
  }
})

export default UsersDataTable
