import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar, NativeModules, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from "native-base";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.55737,
        longitude: 127.047132,
        latitudeDelta: 0.006,
        longitudeDelta: 0.001
      }
    };
  }
  // getInitialState() {
  //   return {
  //     region: {
  //       latitude: 37.55737,
  //       longitude: 127.047132,
  //       latitudeDelta: 0.006,
  //       longitudeDelta: 0.001
  //     }
  //   };
  // }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle} androidStatusBarColor="white">
          <Left style={{ flex: 2 }}>
            <Button transparent>
              <Ionicons name="md-list" size={24} color="black" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.titleStyle}>Header</Title>
          </Body>
          <Right style={{ flex: 1.2 }} />
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
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  headerStyle: {
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 20 : 0 // android top-tab statusbar overlap fix
  },
  titleStyle: {
    color: "black"
  }
});
