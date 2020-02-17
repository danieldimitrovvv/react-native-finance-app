import React from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { DataTable, Text } from 'react-native-paper'
import FormatDate from '../../utility/FormatDate'
import TransferIcon from '../TransferIcon'
import i18n from '../../constants/configurations/config_languages'

const TransactionsDataTable = props => {
  return (
    <DataTable style={styles.dataTable}>
      <DataTable.Header>
        <DataTable.Title>{i18n.t('date')}</DataTable.Title>
        <DataTable.Title>$</DataTable.Title>
        <DataTable.Title numeric></DataTable.Title>
      </DataTable.Header>
      <ScrollView style={styles.dataTableRows}>
        {props.transactions.map(t => (
          <DataTable.Row>
            <DataTable.Cell>
              <Text>{FormatDate(t.dateOfCompletion)}</Text>
            </DataTable.Cell>
            <DataTable.Cell>{t.sum}</DataTable.Cell>
            <DataTable.Cell numeric>
              <TransferIcon type={t.type} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </ScrollView>
      {props.transactionPagination &&
        props.transactionPagination?.numberOfPages > 1 && (
          <DataTable.Pagination
            page={props.transactionPagination.page}
            numberOfPages={props.transactionPagination.numberOfPages}
            onPageChange={props.changeTransactionsPage}
            label={
              props.transactionPagination.page +
              1 +
              ' of ' +
              props.transactionPagination.numberOfPages
            }
          />
        )}
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

export default TransactionsDataTable
