import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  SafeAreaView,
  AsyncStorage
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

const styles = StyleSheet.create({
  center: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 15
  }
});

const SearchAddress = ({ navigation, ...props }) => {
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [position, setPosition] = useState({});

  const getDefaultCampusMap = async () => {
    const selectedCampus = await AsyncStorage.getItem("campus");
    const campusRegion = constants.campus[selectedCampus].position;

    const _region = {
      latitude: campusRegion.latitude,
      longitude: campusRegion.longitude,
      latitudeDelta: constants.LATITUDE_DELTA,
      longitudeDelta: constants.LONGITUDE_DELTA
    };
    setRegion(_region);
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
      setCurrentLocation({ ...currentRegion });
    });
  };

  const userCurrentLocation = props => {
    const { latitude = LATITUDE, longitude = LONGITUDE } = currentLocation;

    const _userRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: constants.LATITUDE_DELTA,
      longitudeDelta: constants.LONGITUDE_DELTA
    };

    this.map.animateToRegion(_userRegion);
  };

  const handleClickDeparture = () => {
    navigation.navigate("departureAddress");
  };

  const handleClickArrival = () => {
    navigation.navigate("arrivalAddress");
  };

  useEffect(() => {
    (async () => {
      await getLocation();
      await getDefaultCampusMap();
    })();
  }, []);
  //   <Image
  //   style={{ width: 40, height: 40 }}
  //   source={require("../../../assets/Delivery_arrival.png")}
  // />
  // <Text>props.departureLocation : {JSON.stringify(position)}</Text>
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <DepartureInput
            onPress={handleClickDeparture}
            departure={props.departureLocation}
          />
          <DestinationInput
            onPress={handleClickArrival}
            destination={props.arrivalLocation}
          />
          <MapScreen
            latitude={region.latitude || currentLocation.latitude}
            longitude={region.longitude || currentLocation.longitude}
            showLocation={false}
            marker={props.departureLocation}
          >
            <Text style={styles.center}>{props.arrivalPosition}</Text>
          </MapScreen>
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
    arrivalLocation: state.destinationReducer.arrivalLocation,
    departureLocation: state.destinationReducer.departureLocation,
    arrivalPosition: state.orderPositionReducer.arrivalPosition
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxArrivalLocation: arrivalLocation =>
      dispatch(arrivalLocationSave(arrivalLocation)),
    reduxDepartureLocation: departureLocation =>
      dispatch(departureLocationSave(departureLocation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAddress);
