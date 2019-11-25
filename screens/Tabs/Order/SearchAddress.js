import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MapScreen from "../../../components/MapView";
import { CurrentLocationButton } from "../../../components/Buttons/CurrentLocationBtn";
import FormInput from "../../../components/Inputs/FormInput";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

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
  }, [currentLocation]);

  return (
    <>
      <Container>
        <MapScreen
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
        />
        <CurrentLocationButton
          callback={() => {
            userCurrentLocation();
          }}
        />
      </Container>
    </>
  );
};

export default SearchAddress;
