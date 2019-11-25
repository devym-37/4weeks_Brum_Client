import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  AsyncStorage
} from "react-native";
import MapView from "react-native-maps";
import { Container } from "native-base";

import constants from "../constants";

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;

const MapScreen = props => {
  const { latitude, longitude } = props;

  const region = {
    latitude,
    longitude,
    latitudeDelta: constants.LATITUDE_DELTA,
    longitudeDelta: constants.LONGITUDE_DELTA
  };

  return (
    <>
      <Container>
        <MapView
          style={styles.mapStyle}
          provider="google"
          ref={map => {
            this.map = map;
          }}
          initialRegion={region}
          onRegionChange={this.onRegionChange}
          showsCompass={true}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          rotateEnabled={false}
          loadingEnabled={true}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default MapScreen;
