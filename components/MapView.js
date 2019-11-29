import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  AsyncStorage,
  Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Container } from "native-base";
import { DestinationInput } from "./Inputs/DestinationInput";
import { DepartureInput } from "./Inputs/DepartureInput";
import { connect } from "react-redux";
import {
  departureSave,
  arrivalSave
} from "../redux/actions/orderPositionActions";

import constants from "../constants";

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  center: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 100
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  centeredText: { textAlign: "center" }
});

const MapScreen = props => {
  const { latitude = LATITUDE, longitude = LONGITUDE } = props;
  const [regions, setRegions] = useState({});

  const region = {
    latitude,
    longitude,
    latitudeDelta: constants.LATITUDE_DELTA,
    longitudeDelta: constants.LONGITUDE_DELTA
  };
  const geoCode = async address => {
    const geo = await Location.geocodeAsync(address);
    return geo;
  };

  const reverseGeocode = async location => {
    const reverseGeo = await Location.reverseGeocodeAsync(location);
    return reverseGeo;
  };

  const recordEvent = async regionChange => {
    // const address = await reverseGeocode(regionChange);
    const geolatlng = await geoCode(props.marker);
    // console.log("address", address[0]);
    console.log("geolatlng[123]", JSON.stringify(geolatlng));
    setRegions(geolatlng);
    // this.props.reduxDepartureAddress(address[0]);
  };

  const changeToAddress = async props => {
    console.log("props : ", props);
    // if (props.arrivalLocation) {
    //   const geolatlng = await geoCode(props.arrivalLocation);
    //   this.props.reduxArrivalPosition(geolatlng);
    // }
    // if (props.departureLocation) {
    //   const geolatlng = await geoCode(props.departureLocation);
    //   this.props.reduxDeparturePosition(geolatlng);
    // }
  };

  useEffect(() => {
    changeToAddress();
  }, [props.arrivalLocation]);

  useEffect(() => {
    changeToAddress();
  }, [props.departureLocation]);

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
          onRegionChangeComplete={regionChange => recordEvent(regionChange)}
          showsCompass={true}
          showsUserLocation={props.showLocation === false ? false : true}
          showsMyLocationButton={false}
          followsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          rotateEnabled={false}
          loadingEnabled={true}
        ></MapView>
      </Container>
    </>
  );
};

// <Marker coordinate={props.position}>
// <Image
//   source={require("../assets/Delivery_arrival.png")}
//   style={{ width: 45, height: 45 }}
// />
// </Marker>
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    loggedIn: state.authReducer.loggedIn,
    arrivalLocation: state.destinationReducer.arrivalLocation,
    departureLocation: state.destinationReducer.departureLocation
  };
};
const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxDeparturePosition: departure => dispatch(departureSave(departure)),
    reduxArrivalPosition: arrival => dispatch(arrivalSave(arrival))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
