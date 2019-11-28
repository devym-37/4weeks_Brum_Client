import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LocationItem = () => {
  return (
    <View>
      <Text>{this.props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
});

export default LocationItem;
