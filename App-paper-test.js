import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import {
  Button,
  Snackbar,
  Provider as PaperProvider,
  DefaultTheme,
  Colors,
  Surface,
  List
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Card from "./components/UI/Card";
import AppColors from "./constants/Colors";

const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 20,
  mode: "exact",
  colors: {
    ...DefaultTheme.colors
    // ...AppColors.orange.theme
    // primary: "#3498db",
    // accent: "#f1c40f"
  }
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

class App extends React.Component {
  state = {
    visible: false
  };
  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  _getData = async () => {
    try {
      let value = await AsyncStorage.getItem("@MySuperStore:key");
      console.log("STORAGE DATA VALUE: " + value);
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    this._getData();
    console.log(Colors, DefaultTheme);
    return (
      <Surface style={styles.container}>
        <ScrollView>
          <Card
            header={{ title: "", subtitle: "" }}
            cover={{
              uri: "https://picsum.photos/700",
              caption: "Image Caption"
            }}
            content={{
              contentContainer: {
                style: {
                  backgroundColor: "red"
                }
              },
              titleContainer: {
                style: {
                  color: "white",
                  textAlign: "center"
                }
              },
              title: "Iphone 11",
              description:
                "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
            }}
            buttons={{
              cancel: {
                label: "Remove",
                loading: true,
                mode: "contained",
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              },
              ok: {
                mode: "contained",
                style: {
                  marginLeft: 10
                },
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              }
            }}
          />
          <Card header={{ title: "My Title", subtitle: "My subtitle" }}>
            <List.Section title="Accordions">
              <List.Accordion
                title="Uncontrolled Accordion"
                left={props => <List.Icon {...props} icon="folder" />}
              >
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>

              <List.Accordion
                title="Controlled Accordion"
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={this.state.expanded}
                onPress={this._handlePress}
              >
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>
            </List.Section>
          </Card>

          <Card
            cover={{
              uri: "https://picsum.photos/700",
              caption: "Image Caption"
            }}
            content={{
              title: "Iphone 11",
              description:
                "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
            }}
            buttons={{
              cancel: { label: "Remove" },
              ok: {
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              }
            }}
          />

          <Card
            content={{
              title: "Iphone 11",
              description:
                "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
            }}
            buttons={{
              cancel: { label: "Remove" },
              ok: {
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              }
            }}
          />

          <Card
            header={{
              title: "My Title",
              subtitle: "My subtitle",
              rightContainer: {
                icon: "camera",
                onPress: () => {
                  this.setState(state => ({ visible: !state.visible }));
                }
              }
            }}
            cover={{
              uri: "https://picsum.photos/700",
              caption: "Image Caption"
            }}
            buttons={{
              cancel: { label: "Remove" },
              ok: {
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              }
            }}
          />

          <Card
            cover={{
              uri: "https://picsum.photos/700",
              style: { borderRadius: 60 }
            }}
          />

          <Card
            header={{
              title: "My Title",
              subtitle: "My subtitle",
              leftContainer: { avatar: true },
              rightContainer: {
                icon: "camera",
                onPress: () => {
                  this.setState(state => ({ visible: !state.visible }));
                }
              }
            }}
            cover={{
              uri: "https://picsum.photos/700",
              caption: "Image Caption"
            }}
            content={{
              title: "Iphone 11",
              description:
                "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
            }}
            buttons={{
              cancel: { label: "Remove" },
              ok: {
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              }
            }}
          />

          <Card
            header={{
              title: "",
              subtitle: "",
              leftContainer: {
                avatar: true,
                icon: { name: "folder", size: 50 }
              }
            }}
            cover={{
              uri: "https://picsum.photos/700",
              caption: "Image Caption"
            }}
            content={{
              title: "Iphone 11",
              description:
                "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
            }}
            buttons={{
              cancel: { label: "Remove" },
              ok: {
                onPress: () =>
                  this.setState(state => ({ visible: !state.visible }))
              }
            }}
          />
        </ScrollView>
        <Button
          onPress={() => this.setState(state => ({ visible: !state.visible }))}
        >
          {this.state.visible ? "Hide" : "Show"}
        </Button>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: "Undo",
            onPress: () => {
              // Do something
            }
          }}
        >
          Hey there! I'm a Snackbar.
        </Snackbar>
      </Surface>
    );
  }
}

// const App = props => {
//   console.log(props, DefaultTheme);
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <Card
//           {...props}
//           header={{
//             title: "My Title",
//             subtitle: "My subtitle",
//             avatar: true
//           }}
//           cover={{
//             uri: "https://picsum.photos/700",
//             caption: "Image Caption"
//           }}
//           content={{
//             title: "Iphone 11",
//             description:
//               "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
//           }}
//           buttons={{
//             cancel: { label: "Remove" },
//             ok: {
//               onPress: () =>
//                 this.setState(state => ({ visible: !state.visible }))
//             }
//           }}
//         />

//         <Card
//           header={{ title: "", subtitle: "", icon: true }}
//           cover={{
//             uri: "https://picsum.photos/700",
//             caption: "Image Caption"
//           }}
//           content={{
//             title: "Iphone 11",
//             description:
//               "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
//           }}
//           buttons={{
//             cancel: { label: "Remove" },
//             ok: {
//               onPress: () =>
//                 this.setState(state => ({ visible: !state.visible }))
//             }
//           }}
//         />
//         <Card
//           header={{ title: "", subtitle: "" }}
//           cover={{
//             uri: "https://picsum.photos/700",
//             caption: "Image Caption"
//           }}
//           content={{
//             title: "Iphone 11",
//             description:
//               "skjdh ajksdhk jasshdjkhadjakjsghd kjashdkj hakjsd kashdkjah sjkdhasj kasd "
//           }}
//           buttons={{
//             cancel: { label: "Remove", loading: true, onPress= ()=> },
//             ok: {
//               onPress: () =>
//                 this.setState(state => ({ visible: !state.visible }))
//             }
//           }}
//         />
//       </ScrollView>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    paddingTop: 30
    // backgroundColor: "#ecf0f1"
  }
});
