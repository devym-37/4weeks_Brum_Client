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

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

const MapScreen = props => {
  const { latitude = LATITUDE, longitude = LONGITUDE } = props;

  const region = {
    latitude,
    longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
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
          initialRegion={{
            latitude: latitude || 122,
            longitude: longitude || 122,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
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

export default MapScreen;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
