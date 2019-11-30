import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProfileScreen = () => {
  return (
    <View>
      <Text>{"UserProfile"}</Text>
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

export default UserProfileScreen;
