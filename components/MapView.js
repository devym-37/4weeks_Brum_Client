import React, {useState, useEffect} from "react";
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

const MapView = () => {
    const [campus, setCampus] = useState("");

    const getCampus = async() => {
        let selectCampus = await AsyncStorage.getItem("campus");
        setCampus(selectCampus);
    }

    return (
        <>
          {isOpen && <AuthModal />}
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
};

export default MapView;


constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      region: {
        latitude: 37.55737,
        longitude: 127.047132,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      campus: ""
    };
    this.getCampus();
  }
  getCampus = async () => {
    let selectCampus = await AsyncStorage.getItem("campus");
    this.setState({ campus: selectCampus });
  };

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
  async componentDidMount() {
    // await AsyncStorage.clear();
    const loggedIn = await AsyncStorage.getItem("userToken");
    // console.log(`ListScreen token: `, loggedIn);
    if (!loggedIn) {
      this.setState({ isOpen: true });
    }
  }

  render() {
    const { isOpen } = this.state;
    console.log("campus", campus);
    
  }