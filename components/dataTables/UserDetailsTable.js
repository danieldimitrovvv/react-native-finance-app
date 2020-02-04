import React from 'react'
import { StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'

const UserDetailsTable = props => {
  let userDetails = props.userDetails
  return (
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>Gender</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.gender ? userDetails.gender : '-'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Family Status</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.familyStatus ? userDetails.familyStatus : '-'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Education</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.education ? userDetails.education : '-'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Age</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.age ? userDetails.age : '-'}
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  )
}

const styles = StyleSheet.create({})

export default UserDetailsTable
