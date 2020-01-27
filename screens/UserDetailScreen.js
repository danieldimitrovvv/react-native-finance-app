import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Surface, ActivityIndicator, DataTable } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";
import AuthRest from "../rests/AuthRest";
import Card from "../components/UI/Card";

export default function UserDetailScreen() {
  let [userDetail, setUserDetail] = useState({
    id: null,
    email: null,
    password: null,
    name: null,
    sex: null,
    familyStatus: null,
    education: null,
    years: null
  });
  let [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    AuthRest.getUserDetail().then(userData => {
      setUserDetail(userData);
      setLoading(false);
    });
  }, []);
  return (
    <Surface style={styles.container}>
      {!isLoading ? (
        <Card
          header={{
            title: userDetail.name,
            subtitle: userDetail.email,
            leftContainer: {
              avatar: {
                type: "text",
                label: userDetail?.name?.charAt(0)
              },
              icon: { name: "human-handsdown", size: 50 }
            }
          }}
        >
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Gender</DataTable.Cell>
              <DataTable.Cell numeric>{userDetail.gender}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Family Status</DataTable.Cell>
              <DataTable.Cell numeric>{userDetail.familyStatus}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Education</DataTable.Cell>
              <DataTable.Cell numeric>{userDetail.education}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Age</DataTable.Cell>
              <DataTable.Cell numeric>{userDetail.age}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card>
      ) : (
        <ActivityIndicator animating={true} hidesWhenStopped={true} />
      )}
    </Surface>
  );
}

UserDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: "My Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30
  }
});
