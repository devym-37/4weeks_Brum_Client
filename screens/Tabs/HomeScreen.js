import React, { Component } from "react";

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
import { login } from "../../redux/actions/authActions";

import AuthModal from "../Auth/AuthModal";

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
  }

  render() {
    return (
      <>
        <AuthModal />
        <Container style={styles.container}>
          <Content>
            <View>
              <Text>위치</Text>
            </View>
            <MapView
              style={styles.mapStyle}
              provider="google"
              region={this.state.region}
              onRegionChange={this.onRegionChange}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followsUserLocation={true}
              zoomEnabled={true}
              scrollEnabled={true}
              showsScale={true}
            />
          </Content>
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
