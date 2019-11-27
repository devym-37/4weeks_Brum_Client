import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import styled from "styled-components";

import MapScreen from "../../../components/MapView";
import { CurrentLocationButton } from "../../../components/Buttons/CurrentLocationBtn";
import FormInput from "../../../components/Inputs/FormInput";
import constants from "../../../constants";
import { Marker } from "react-native-maps";
import { DestinationInput } from "../../../components/Inputs/DestinationInput";
import { DepartureInput } from "../../../components/Inputs/DepartureInput";
import { connect } from "react-redux";

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

const SearchAddress = ({ navigation, ...props }) => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [regions, setRegions] = useState({});

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
    const [regions, setRegions] = useState({});

    const _userRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    this.map.animateToRegion(_userRegion);
  };

  const handleClickDeparture = () => {
    navigation.navigate("orderAddress");
  };

  const handleClickArrival = () => {
    navigation.navigate("arrivalAddress");
  };

  const geoCode = async address => {
    const geo = await Location.geocodeAsync(address);
    return geo;
  };

  const reverseGeocode = async location => {
    const reverseGeo = await Location.reverseGeocodeAsync(location);
    return reverseGeo;
  };

  const recordEvent = async () => {
    // const address = await reverseGeocode(regionChange);
    // const geolatlng = await geoCode("한양대학교");
    // console.log("address", address[0]);
    // console.log("geolatlng", geolatlng);
    // setRegions(address[0]);
    // this.props.reduxDepartureAddress(address[0]);
    return geolatlng;
  };

  useEffect(() => {
    (async () => {
      await getLocation();
      await reverseGeocode();
      await recordEvent();
    })();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <DepartureInput
            onPress={handleClickDeparture}
            departure={props.orderDestination}
          />
          <DestinationInput
            onPress={handleClickArrival}
            destination={props.departureLocation}
          />
          <MapScreen
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
            showLocation={false}
          ></MapScreen>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../../assets/Delivery_arrival.png")}
          />
          <Text style={styles.center}></Text>
          <CurrentLocationButton
            callback={() => {
              userCurrentLocation();
            }}
            bottom={140}
          />
        </Container>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    orderDestination: state.destinationReducer.destination,
    departureLocation: state.destinationReducer.departureLocation
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxDestination: destination => dispatch(destinationSave(destination)),
    reduxDepartureLocation: departureLocation =>
      dispatch(departureLocationSave(departureLocation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAddress);
