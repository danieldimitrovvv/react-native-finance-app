import React from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { DataTable} from 'react-native-paper'

const UsersDataTable = props => {
  return (
    <DataTable style={styles.dataTable}>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
        <DataTable.Title numeric>Years</DataTable.Title>
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
