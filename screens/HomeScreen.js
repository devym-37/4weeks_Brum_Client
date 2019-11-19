import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar, NativeModules } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { login } from "../redux/actions/authActions";

const { StatusBarManger } = NativeModules;
 class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     region: {}
  //   };
  // }
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor="black"
          hidden={false}
          networkActivityIndicatorVisible={true}
        />
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
          <Button transparent
          onPress={
            () => 
              {this.props.reduxLogin(false)
              this.props.navigation.navigate("StartHome")}
            }
          >
            <Ionicons name="md-log-out" size={24} color="black" />
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
              latitudeDelta: 0.007,
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
    flex: 1,
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

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    loggedIn: state.authReducer.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    
    // Login
    reduxLogin: trueFalse => dispatch(login(trueFalse))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)