import React from "react";
import { Platform, StyleSheet } from "react-native";
import { ToggleButton, Surface, Text } from "react-native-paper";

import Colors from "../../constants/Colors";

const CustomToggleButton = props => {
  return (
    <Surface style={{ ...styles.container, ...props.styles?.container }}>
      <Text style={{ ...styles.label, ...props.styles?.label }}>{props.label}</Text>
      <ToggleButton
        {...props}
        accessibilityLabel={props.label}
        style={{...styles.button, ... props.style?.button}}
        color={Platform.OS === "android" ? "black" : Colors["blue"].main}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    flexDirection:"row"
  },
  label: {
    fontFamily: "open-sans",
    marginVertical: 8
  },
  button: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    position: 'relative',
    marginHorizontal: 5
  },
});
export default CustomToggleButton;
