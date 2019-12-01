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
// import { API } from "../APIS";
import { Container } from "native-base";
import { DestinationInput } from "./Inputs/DestinationInput";
import { DepartureInput } from "./Inputs/DepartureInput";
import { connect } from "react-redux";
import {
  departureSave,
  arrivalSave
} from "../redux/actions/orderPositionActions";
import constants from "../constants";
import MapViewDirections from "react-native-maps-directions";

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;
const API = "AIzaSyB_wEQ8hDQnVHqYdUfqNJxtngA-xmvbTcg";

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
    // console.log("geolatlng[123]", JSON.stringify(geolatlng));
    setRegions(geolatlng);
    // this.props.reduxDepartureAddress(address[0]);
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
        >
          <Marker
            coordinate={{
              latitude: 37.556279,
              longitude: 127.046422
            }}
          >
            <Image
              source={require("../assets/Delivery_arrival.png")}
              style={{ width: 45, height: 45 }}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: 37.559184,
              longitude: 127.044512
            }}
          >
            <Image
              source={require("../assets/Delivery_departure.png")}
              style={{ width: 45, height: 45 }}
            />
          </Marker>
          <MapViewDirections
            origin={{
              latitude: 37.556279,
              longitude: 127.046422
            }}
            destination={{
              latitude: 37.559184,
              longitude: 127.044512
            }}
            apikey={API}
            strokeWidth={5}
            strokeColor="hotpink"
            mode="WALKING"
            precision="low"
          />
          {props.HomeScreen === true &&
            props.orders.map(marker => (
              <Marker
                coordinate={{
                  latitude: Number(marker.arrLat),
                  longitude: Number(marker.arrLng)
                }}
                title={marker.title}
              >
                <Image
                  source={require("../assets/Delivery_arrival.png")}
                  style={{ width: 45, height: 45 }}
                />
              </Marker>
            ))}
          {props.SearchScreen === true && props.departurePosition !== null ? (
            <Marker
              coordinate={{
                latitude: props.departurePosition.lat || 0,
                longitude: props.departurePosition.lng || 0
              }}
            >
              <Image
                source={require("../assets/Delivery_departure.png")}
                style={{ width: 45, height: 45 }}
              />
            </Marker>
          ) : (
            <Text></Text>
          )}
          {props.SearchScreen === true && props.arrivalPosition !== null ? (
            <Marker
              coordinate={{
                latitude: props.arrivalPosition.lat || 0,
                longitude: props.arrivalPosition.lng || 0
              }}
            >
              <Image
                source={require("../assets/Delivery_arrival.png")}
                style={{ width: 45, height: 45 }}
              />
            </Marker>
          ) : (
            <Text></Text>
          )}
          {props.SearchScreen === true &&
          props.arrivalPosition !== null &&
          props.departurePosition !== null ? (
            <MapViewDirections
              origin={{
                latitude: props.arrivalPosition.lat,
                longitude: props.arrivalPosition.lng
              }}
              destination={{
                latitude: props.departurePosition.lat,
                longitude: props.departurePosition.lng
              }}
              apikey={API}
              strokeWidth={5}
              strokeColor="hotpink"
              mode="WALKING"
              precision="low"
            />
          ) : (
            <Text>이건가</Text>
          )}
        </MapView>
      </Container>
    </>
  );
};
// <Marker
//             coordinate={{
//               latitude: props.orders[0].arrLat,
//               longitude: props.orders[0].arrLng
//             }}
//           />

// {props.orders.map(marker => (
//   <Marker
//     coordinate={{ latitude: marker.arrLat, longitude: marker.arrLng }}
//   />
// ))}

// {props.HomeScreen === true &&
//   props.orders.map(order => {
//     <Marker
//       coordinate={{ latitude: order.arrLat, longitude: order.arrLng }}
//       title={order.arrivals}
//     />;
//   })}
// <Text>{JSON.stringify(props.orders)}</Text>
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
    departureLocation: state.destinationReducer.departureLocation,
    arrivalPosition: state.orderPositionReducer.arrivalPosition,
    departurePosition: state.orderPositionReducer.departurePosition
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
