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
import { CurrentLocationButton } from "../navigation/CurrentLocationBtn";
import { Container } from "native-base";

const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

const MapScreen = ({ latitude, longitude }) => {
  const [region, setRegion] = useState({});

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      setRegion({ ...currentRegion });
    });
  };

  const centerMap = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let currentLat = parseFloat(position.coords.latitude);
      let currentLng = parseFloat(position.coords.longitude);

      let currentRegion = {
        latitude: currentLat,
        longitude: currentLng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      setRegion({ ...currentRegion });
    });
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    console.log("region2222", region);
    this.map.animateToRegion({
      latitude,
      longitude,
      LATITUDE_DELTA,
      LONGITUDE_DELTA
    });
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Container>
        <CurrentLocationButton
          cb={() => {
            centerMap();
          }}
        />
        <MapView
          style={styles.mapStyle}
          provider="google"
          ref={map => {
            this.map = map;
          }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
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
