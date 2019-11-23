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
import { login } from "../../redux/actions/authActions";
import AuthModal from "../Auth/AuthModal";
import MapView from "../../components/MapView";
import { CurrentLocationButton } from "../../navigation/CurrentLocationBtn";

const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

const Home = () => {
  const [campus, setCampus] = useState("");
  const [region, setRegion] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const getCampus = async () => {
    let selectCampus = await AsyncStorage.getItem("campus");
    setCampus(selectCampus);
    if (selectCampus === "한양대") {
      var campusLatLng = {
        latitude: 37.55737,
        longitude: 127.047132
      };
    } else if (selectCampus === "연세대") {
      var campusLatLng = {
        latitude: 37.564624,
        longitude: 126.93755
      };
    } else if (selectCampus === "서울대") {
      var campusLatLng = {
        latitude: 37.459228,
        longitude: 126.952052
      };
    } else if (selectCampus === "이화여대") {
      var campusLatLng = {
        latitude: 37.561865,
        longitude: 126.946714
      };
    }
    let campusRegion = {
      ...campusLatLng
    };
    setRegion(campusRegion);
    console.log("selectCampus", selectCampus);
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng
      };
      setRegion({ ...currentRegion });
    });
  };

  const centerMap = () => {
    const { latitude, longitude } = region;
    console.log("region2222", region);
    this.map.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  };

  const clearStorage = async () => {
    // await AsyncStorage.clear();
    const loggedIn = await AsyncStorage.getItem("userToken");
    // console.log(`ListScreen token: `, loggedIn);
    if (!loggedIn) {
      setIsOpen(!isOpen);
    }
  };
  useEffect(() => {
    getCampus(), clearStorage(), getLocation();
  }, []);

  return (
    <>
      {isOpen && <AuthModal />}
      <Container style={styles.container}>
        <Content>
          <CurrentLocationButton
            cb={() => {
              centerMap();
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
