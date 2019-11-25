import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  RefreshControl,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import AuthModal from "../../Auth/AuthModal";
import { serverApi } from "../../../components/API";
import constants from "../../../constants";
import styles from "../../../styles";

import MapView from "../../../components/MapView";
import ListScreen from "./ListScreen";
import Loader from "../../../components/Loader";
import { CurrentLocationButton } from "../../../navigation/CurrentLocationBtn";
import { MapLocationButton } from "../../../navigation/MapLocationBtn";

const View = styled.View``;
const Container = styled.View`
  align-items: center;
  margin-top: 12;
`;
const ButtonContainer = styled.View`
  /* width: ${constants.width / 2}; */
  justify-content: center;
  align-content: center;
  height: 30;
  flex-direction: row;
`;

const Touchable = styled.TouchableOpacity``;

const LeftToggleButton = styled.View`
  flex: 1;
  width: 110;
  justify-content: center;
  align-items: center;
  border: 1.2px;
  background-color: ${props => (props.clicked ? styles.mainColor : "#fff")};
  border-color: ${styles.mainColor};
  border-right-width: 0.6px;
  border-bottom-left-radius: 6;
  border-top-left-radius: 6;
`;

const LeftToggleText = styled.Text`
  padding: 3px 0;
  font-size: 13;
  font-weight: ${props => (props.clicked ? 500 : 400)};
  color: ${props => (props.clicked ? "#fff" : styles.mainColor)};
  z-index: 10;
`;

const RightToggleButton = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 110;
  border: 1.2px;
  background-color: ${props => (props.clicked ? styles.mainColor : "#fff")};
  border-color: ${styles.mainColor};
  border-left-width: 0.6px;
  border-bottom-right-radius: 6;
  border-top-right-radius: 6;
  z-index: 8;
`;

const RightToggleText = styled.Text`
  padding: 3px 0;
  font-weight: ${props => (props.clicked ? 500 : 400)};
  color: ${props => (props.clicked ? "#fff" : styles.mainColor)};
  font-size: 13;
`;
const HomeScreen = ({ navigation }) => {
  const [leftClicked, setLeftClicked] = useState(true);
  const [rightClicked, setRightClicked] = useState(false);
  const [region, setRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isopenLoginModal, setIsopenLoginModal] = useState(false);

  const getDefaultCampusMap = campus => {
    const campusRegion = constants.campus[campus].position;

    const _region = {
      latitude: campusRegion.latitude,
      longitude: campusRegion.longitude,
      latitudeDelta: constants.LATITUDE_DELTA,
      longitudeDelta: constants.LONGITUDE_DELTA
    };
    setRegion(_region);
    this.map.animateToRegion(_region);
  };

  // const getLocation = async () => {
  //   const geo = await navigator.geolocation.getCurrentPosition();

  // await navigator.geolocation.getCurrentPosition(position => {
  //   let currentLat = parseFloat(position.coords.latitude);
  //   let currentLng = parseFloat(position.coords.longitude);

  //   let currentRegion = {
  //     latitude: currentLat,
  //     longitude: currentLng
  //   };
  //   setCurrentLocation({ ...currentRegion }); // 8
  // });
  // };

  const userCurrentLocation = () => {
    // const { latitude = LATITUDE, longitude = LONGITUDE } = currentLocation;
    console.log(`currentLocation: `, currentLocation);
    // const _userRegion = {
    //   // class structure
    //   latitude: latitude,
    //   longitude: longitude,
    //   latitudeDelta: constants.LATITUDE_DELTA,
    //   longitudeDelta: constants.LONGITUDE_DELTA
    // };

    // this.map.animateToRegion(_userRegion);
  };

  const preLoad = async () => {
    try {
      setLoading(true);
      const loggedIn = await AsyncStorage.getItem("userToken");
      if (!loggedIn) {
        setIsopenLoginModal(true);
      }

      const selectedCampus = await AsyncStorage.getItem("campus");
      let getCampusOrders = await serverApi.getCampusOrders(selectedCampus);
      setOrders([...getCampusOrders.data.data.orders]);

      getDefaultCampusMap(selectedCampus);
      getLocation();
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <>
      {isopenLoginModal && <AuthModal />}
      <View>
        {loading ? (
          <Loader />
        ) : (
          <>
            {leftClicked && region && (
              <>
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
                <MapView
                  latitude={region.latitude}
                  longitude={region.longitude}
                  orders={orders}
                />
              </>
            )}
            <Container>
              <ButtonContainer>
                <Touchable
                  onPress={() => {
                    setLeftClicked(!leftClicked);
                    setRightClicked(leftClicked);
                  }}
                >
                  <LeftToggleButton clicked={leftClicked}>
                    <LeftToggleText clicked={leftClicked}>
                      {"지도로 보기"}
                    </LeftToggleText>
                  </LeftToggleButton>
                </Touchable>
                <Touchable
                  onPress={() => {
                    setRightClicked(!rightClicked);
                    setLeftClicked(rightClicked);
                  }}
                >
                  <RightToggleButton clicked={rightClicked}>
                    <RightToggleText clicked={rightClicked}>
                      {"리스트로 보기"}
                    </RightToggleText>
                  </RightToggleButton>
                </Touchable>
              </ButtonContainer>
            </Container>

            {rightClicked && <ListScreen orders={orders} />}
          </>
        )}
      </View>
    </>
  );
};

export default HomeScreen;
