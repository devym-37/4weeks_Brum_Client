import React, { Component } from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
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
import { Constants } from "expo";

// or any pure javascript modules available in npm
import { Card } from "react-native-elements";

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>알림</Text>
        {/* <Card title="Local Modules">
          <AssetExample />
        </Card> */}
      </View>
    );
  }
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
