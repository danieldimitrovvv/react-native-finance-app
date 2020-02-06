import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text, Avatar } from 'react-native-paper'

import List from '../UI/List'

import Colors from '../../constants/Colors'
import { CATEGORY_TYPES } from '../../models/Category'

const CategoriesList = props => {
  return (
    <ScrollView>
      <List
        data={mapCategories(props.categories, props.navigation)}
        titleNumberOfLines={2}
      />
    </ScrollView>
  )
}

const mapCategories = (categories, navigation) => {
  return categories.map(category => ({
    key: category.id,
    title: category.name,
    onPress: () => {
      navigation.navigate('CategoryDetails', {
        categoryId: category.id,
        categoryTitle: category.name
      })
    },
    description: (
      <Text
        style={{
          color: category.type === CATEGORY_TYPES.REVENUE ? Colors.blue.main : Colors.red.main
        }}
      >
        {category.type}
      </Text>
    ),
    rightContainer: category.limit ? (
      <Avatar.Text
        color='white'
        size={30}
        style={{
          backgroundColor: category.limit.includes('%')
            ? Colors.blue.main
            : Colors.blue.dark,
          width: category.limit.includes('%')
            ? +category.limit.substr(0, category.limit.length - 1) / 3 +
              10 +
              '%'
            : '25%'
        }}
        label={category.limit}
      />
    ) : null,

    leftContainer: (
      <Text style={styles.listRightContainer} key={category.id}>
        {category.sum}
      </Text>
    )
  }))
}

const styles = StyleSheet.create({
  listRightContainer: {
    paddingHorizontal: 5,
    fontSize: 20,
    width: '25%',
    fontFamily: 'open-sans-bold'
  }
})

export default CategoriesList
