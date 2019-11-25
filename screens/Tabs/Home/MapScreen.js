import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
import { login } from "../../../redux/actions/authActions";
import AuthModal from "../../Auth/AuthModal";
import MapView from "../../../components/MapView";
import { CurrentLocationButton } from "../../../navigation/CurrentLocationBtn";
import { MapLocationButton } from "../../../navigation/MapLocationBtn";

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

const Home = props => {
  console.log("HomeScreen props", props);
  // const [campus, setCampus] = useState("");
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [defaultCampus, setDefaultCampus] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const getCampusLatLng = selectCampus => {
    if (selectCampus === "hanyang") {
      return { latitude: 37.55737, longitude: 127.047132 };
    } else if (selectCampus === "yonsei") {
      return { latitude: 37.564624, longitude: 126.93755 };
    } else if (selectCampus === "snu") {
      return { latitude: 37.459228, longitude: 126.952052 };
    } else if (selectCampus === "ihwa") {
      return { latitude: 37.561865, longitude: 126.946714 };
    }
  };

  const getDefaultCampusMap = async () => {
    const selectedCampus = await AsyncStorage.getItem("campus");
    const campusRegion = getCampusLatLng(selectedCampus);

    const _region = {
      // class structure
      latitude: campusRegion.latitude,
      longitude: campusRegion.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    setRegion(_region);
    this.map.animateToRegion(_region);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng
      };
      setCurrentLocation({ ...currentRegion }); // 8
    });
  };

  const userCurrentLocation = () => {
    const { latitude = LATITUDE, longitude = LONGITUDE } = currentLocation;

    const _userRegion = {
      // class structure
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    this.map.animateToRegion(_userRegion);
  };

  const clearStorage = async () => {
    // await AsyncStorage.clear();
    const loggedIn = await AsyncStorage.getItem("userToken");
    // console.log(`ListScreen token: `, loggedIn);
    if (!loggedIn) {
      setIsOpen(!isOpen); // 7
    }
  };

  useEffect(() => {
    (async () => {
      // await getCampus(), // 1
      await clearStorage(), // 2
        await getLocation(), // 3
        await getDefaultCampusMap(); // 4
    })();
  }, []);

  return (
    <>
      {isOpen && <AuthModal />}
      <Container style={styles.container}>
        <Content>
          <MapLocationButton
            cb={() => {
              getDefaultCampusMap();
            }}
          />
          <CurrentLocationButton
            cb={() => {
              userCurrentLocation();
            }}
          />
          {region.latitude !== null && (
            <MapView latitude={region.latitude} longitude={region.longitude} />
          )}
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
