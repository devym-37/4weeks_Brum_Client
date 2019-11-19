import React, { Component } from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { login } from "../redux/actions/authActions";

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
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("ListScreen");
              }}
            >
              <Ionicons name="md-list" size={25} color="black" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.titleStyle}>지도주소</Title>
          </Body>
          <Right style={{ flex: 1 }} />
          <Button transparent>
            <Ionicons name="ios-notifications-outline" size={25} color="black" />
          </Button>
          <Button transparent>
            <Ionicons name="md-refresh" size={25} color="black" />
          </Button>
          <Button
            transparent
            onPress={() => {
              this.props.reduxLogin(false);
              this.props.navigation.navigate("StartHome");
            }}
          >
            <Ionicons name="md-log-out" size={25} color="black" />
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
