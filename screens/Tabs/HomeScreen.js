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
import { CurrentLocationButton } from "../../navigation/CurrentLocationBtn";

const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.55737,
        longitude: 127.047132,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
    // this._getLocationAsync();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({ region: currentRegion });
    });
  }

  // _getLocationAsync = async () => {
  //   console.log("2222>>>", l);
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted")
  //     console.log("Permission to access location was denied");
  //   let location = await Location.getCurrentPositionAsync({
  //     enabledHighAccuracy: true
  //   });
  //   console.log("location", location);
  //   let region = {
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA
  //   };
  //   console.log("region", region);
  //   this.setState({ region: region });
  // };

  centerMap() {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({ region: currentRegion });
    });
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
          <Content>
            <CurrentLocationButton
              cb={() => {
                this.centerMap();
              }}
            />
            <MapView
              style={styles.mapStyle}
              provider="google"
              ref={map => {
                this.map = map;
              }}
              initialRegion={this.state.region}
              onRegionChange={this.onRegionChange}
              showsCompass={true}
              showsUserLocation={true}
              showsMyLocationButton={false}
              followsUserLocation={true}
              zoomEnabled={true}
              scrollEnabled={true}
              showsScale={true}
              rotateEnabled={false}
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
