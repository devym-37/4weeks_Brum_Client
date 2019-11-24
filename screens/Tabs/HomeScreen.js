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
import MapScreen from "../../components/MapScreen";
import { CurrentLocationButton } from "../../navigation/CurrentLocationBtn";
import { MapLocationButton } from "../../navigation/MapLocationBtn";

const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

const Home = props => {
  console.log("HomeScreen props", props);
  // const [campus, setCampus] = useState("");
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [defaultCampus, setDefaultCampus] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const getCampus = selectCampus => {
    // let selectCampus = await AsyncStorage.getItem("campus");
    // await setCampus(selectCampus); // 1
    if (selectCampus === "한양대") {
      return { latitude: 37.55737, longitude: 127.047132 };
    } else if (selectCampus === "연세대") {
      return { latitude: 37.564624, longitude: 126.93755 };
    } else if (selectCampus === "서울대") {
      return { latitude: 37.459228, longitude: 126.952052 };
    } else if (selectCampus === "이화여대") {
      return { latitude: 37.561865, longitude: 126.946714 };
    }

    // let campusRegion = {
    //   ...campusLatLng
    // };
    // await setRegion(campusRegion); // 2
    // await setDefaultCampus(campusRegion); // 3
  };

  const getDefaultCampusMap = async () => {
    const selectedCampus = await AsyncStorage.getItem("campus");
    const campusRegion = getCampus(selectedCampus);

    const _region = {
      // class structure
      latitude: campusRegion.latitude,
      longitude: campusRegion.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

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

  const centerMap = () => {
    const { latitude = 37, longitude = 126 } = currentLocation;

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

  useEffect(() => {
    console.log("[HomeScreen] region", region);
  }, [region]);

  useEffect(() => {
    console.log("[HomeScreen] defaultCampus", defaultCampus);
  }, [defaultCampus]);

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
              centerMap();
            }}
          />
          <MapScreen latitude={region.latitude} longitude={region.longitude} />
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
