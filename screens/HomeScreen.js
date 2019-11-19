import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar, NativeModules, Platform,AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { login } from "../redux/actions/authActions";
import {loginApi} from "../components/login"
const { StatusBarManger } = NativeModules;

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     region: {}
 class Home extends Component {
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
    this.handleToken= this.handleToken.bind(this)
  }
  async handleToken(){

const getuser = await AsyncStorage.getItem('userToken')
console.log(getuser)
const requestuser = await loginApi.user(getuser)
console.log("유저정보",requestuser.data.data)
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
          <Button transparent
          onPress={this.handleToken}
          >
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