import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  FooterTab,
  Footer
} from "native-base";

export default function RequestScreen() {
  return (
    <Container>
      <View style={styles.Container}>
        <Text>RequestScreen</Text>
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
  }
});
