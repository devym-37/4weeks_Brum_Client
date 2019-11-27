import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "native-base";

import { withNavigation } from "react-navigation";

const ChatFilterScreen = props => {
  return (
    <Container>
      <View style={styles.Container}>
        <Text>ChatFilterScreen</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  footerStyle: {
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default withNavigation(ChatFilterScreen);
