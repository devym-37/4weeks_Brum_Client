import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from "native-base";

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     region: {}
  //   };
  // }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "white" }} androidStatusBarColor="white">
          <Left>
            <Button transparent>
              <Ionicons name="md-list" size={24} color="black" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerStyle}>Header</Title>
          </Body>
          <Right />
          <Button transparent>
            <Ionicons name="md-notifications" size={24} color="black" />
          </Button>
          <Button transparent>
            <Ionicons name="md-refresh" size={24} color="black" />
          </Button>
        </Header>
        <Content>
          <MapView
            style={styles.mapStyle}
            provider="google"
            initialRegion={{
              // 한양대 default map
              latitude: 37.557615,
              longitude: 127.046963,
              latitudeDelta: 0.006,
              longitudeDelta: 0.001
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  headerStyle: {
    color: "black"
  }
});
