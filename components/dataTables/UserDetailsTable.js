import React from 'react'
import { StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import i18n from '../../constants/configurations/config_languages'
import Capitalize, { capitalizeFirst } from '../../utility/Capitalize'

const UserDetailsTable = props => {
  let userDetails = props.userDetails
  return (
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>{Capitalize(i18n.t('gender'))}</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.gender ? userDetails.gender : '-'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>{Capitalize(i18n.t('family_status'), true)}</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.familyStatus ? userDetails.familyStatus : '-'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>{capitalizeFirst(i18n.t('education'))}</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.education ? userDetails.education : '-'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>{capitalizeFirst(i18n.t('age'))}</DataTable.Cell>
        <DataTable.Cell numeric>
          {userDetails.age ? userDetails.age : '-'}
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  )
}

const styles = StyleSheet.create({})

export default UserDetailsTable
