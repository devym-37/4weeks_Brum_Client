import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, FooterTab, Footer } from "native-base";

export default function FilterScreen() {
  return (
    <Container>
      <View style={styles.Container}>
        <Text>FilterScreen</Text>
      </View>
    </Container>
  );
}

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
