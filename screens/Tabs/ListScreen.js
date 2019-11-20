import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, FooterTab, Footer } from "native-base";
import { StyleSheet, View, Text, Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer, TabNavigator } from "react-navigation";

class ListScreen extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.headerStyle} androidStatusBarColor="white">
          <Left style={{ flex: 1 }} />
          <Body>
            <Title style={styles.titleStyle}>학교이름</Title>
          </Body>
          <Right style={{ flex: 1 }} />
          <Button transparent>
            <Ionicons name="md-options" size={25} color="black" />
          </Button>
          <Button transparent>
            <Ionicons name="ios-notifications-outline" size={25} color="black" />
          </Button>
          <Button transparent>
            <Ionicons name="md-refresh" size={25} color="black" />
          </Button>
        </Header>
        <Content>
          <View style={styles.Container}>
            <Text>List Screen</Text>
          </View>
        </Content>
      </Container>
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
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 20 : 0 // android top-tab statusbar overlap fix
  },
  titleStyle: {
    color: "black"
  },
  footerStyle: {
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default ListScreen;
