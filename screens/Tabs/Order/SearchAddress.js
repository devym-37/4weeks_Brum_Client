import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Text, Image } from "react-native";
import styled from "styled-components";

import MapScreen from "../../../components/MapView";
import { CurrentLocationButton } from "../../../components/Buttons/CurrentLocationBtn";
import FormInput from "../../../components/Inputs/FormInput";
import constants from "../../../constants";
import SearchInput from "./SearchInput";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// const Text = styled.Text``;

const CenterPoint = styled.View`
  position: absolute;
  width: ${constants.width / 2};
  height: ${constants.height / 2};
  z-index: 4;
  font-size: 14;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

const styles = StyleSheet.create({
  center: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 15
  }
});

const SearchAddress = () => {
  const [currentLocation, setCurrentLocation] = useState({});

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng
      };
      setCurrentLocation({ ...currentRegion });
    });
  };

  const userCurrentLocation = () => {
    const { latitude = LATITUDE, longitude = LONGITUDE } = currentLocation;

    const _userRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    this.map.animateToRegion(_userRegion);
  };

  useEffect(() => {
    (async () => {
      await getLocation();
    })();
  }, []);

  return (
    <>
      <Container>
        <MapScreen
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          showLocation={false}
          orderPosition={true}
        />
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../../../assets/Delivery_arrival.png")}
        />
        <Text style={styles.center}></Text>
        <CurrentLocationButton
          callback={() => {
            userCurrentLocation();
          }}
          bottom={90}
        />
      </Container>
    </>
  );
};

export default SearchAddress;
