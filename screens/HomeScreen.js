import React, { Component } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
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
  Footer,
  FooterTab
} from "native-base";

import { connect } from "react-redux";
import { login } from "../redux/actions/authActions";

import AuthModal from "../screens/Auth/AuthModal";

import { CurrentLocationButton } from "../navigation/CurrentLocationBtn";

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
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted")
      console.log("Permission to access location was denied");
    let location = await Location.getCurrentPositionAsync({
      enabledHighAccuracy: true
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    };
    this.setState({ region: region });
  };

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  }

  render() {
    return (
      <>
        <AuthModal />
        <Container style={styles.container}>
          <Header style={styles.headerStyle} androidStatusBarColor="white">
            <Left style={{ flex: 2 }}>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate("ListScreen");
                }}
              >
                <Ionicons
                  name="md-list"
                  size={28}
                  color="black"
                  style={{ paddingLeft: 5 }}
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.titleStyle}>지도주소</Title>
            </Body>
            <Right style={{ flex: 1 }} />
            <Button transparent>
              <Ionicons
                name="ios-notifications-outline"
                size={28}
                color="black"
              />
            </Button>
            <Button transparent>
              <Ionicons name="md-refresh" size={28} color="black" />
            </Button>
            <Button
              transparent
              onPress={() => {
                this.props.reduxLogin(false);
                this.props.navigation.navigate("StartHome");
              }}
            >
              <Ionicons name="md-log-out" size={28} color="black" />
            </Button>
          </Header>

          <Content>
            <MapView
              style={styles.mapStyle}
              ref={map => {
                this.map = map;
              }}
              provider="google"
              region={this.state.region}
              onRegionChange={this.onRegionChange}
              showsCompass={true}
              rotateEnabled={false}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followsUserLocation={true}
              zoomEnabled={true}
              scrollEnabled={true}
              showsScale={true}
            />
          </Content>
          <CurrentLocationButton
            cb={() => {
              this.centerMap();
            }}
          />
        </Container>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
