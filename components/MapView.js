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
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";
import CustomCallout from "./CustomCallout";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { API } from "../APIS";
import { Container } from "native-base";
import { connect } from "react-redux";
import {
  departureSave,
  arrivalSave
} from "../redux/actions/orderPositionActions";
import { withNavigation } from "react-navigation";
import constants from "../constants";
import MapViewDirections from "react-native-maps-directions";
import Polyline from "@mapbox/polyline";

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
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  centeredText: { textAlign: "center" },
  bubbles: {
    width: 180,
    // flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6
  }
});

const MapScreen = ({ navigation, ...props }) => {
  const {
    latitude = constants.LATITUDE,
    longitude = constants.LONGITUDE
  } = props;
  const [regions, setRegions] = useState({});
  const [coords, setCoords] = useState([]);

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: constants.LATITUDE_DELTA,
    longitudeDelta: constants.LONGITUDE_DELTA
  };

  // const getCurrent = async () => {
  //   console.log("region", region);
  //   console.log("props.", props.currentRegion);
  //   const _region = {
  //     latitude: props.currentRegion.latitude,
  //     longitude: props.currentRegion.longitude,
  //     latitudeDelta: constants.LATITUDE_DELTA,
  //     longitudeDelta: constants.LONGITUDE_DELTA
  //   };

  //   setRegions(_region);
  // };

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log("location", location);
  };

  // const recordEvent = async regionChange => {
  //   // const address = await reverseGeocode(regionChange);
  //   const geolatlng = await geoCode(props.marker);
  //   // console.log("address", address[0]);
  //   // console.log("geolatlng[123]", JSON.stringify(geolatlng));
  //   setRegions(geolatlng);
  //   // this.props.reduxDepartureAddress(address[0]);
  // };

  const getDirections = async () => {
    // console.log("props.departurePosition.lat", props);
    // console.log("this.map", this.map);
    // console.log("ㅁㅁㅁㅁㅁㅁㅁㅁ");
    if (props.departurePosition !== null && props.arrivalPosition !== null) {
      // const DEPARTURE = `ChIJlaxrQKakfDURwM3kL1L3lBk`;
      // const ARRIVAL = `ChIJx54O7aOkfDURml1ULDrn5PY`;

      const DEPARTURE = `${props.departurePosition.lat},${props.departurePosition.lng}`;
      const ARRIVAL = `${props.arrivalPosition.lat},${props.arrivalPosition.lng}`;

      console.log("DEPARTURE", DEPARTURE);

      console.log("step1");
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${DEPARTURE}&destination=${ARRIVAL}&mode=transit&departure_time=now&key=${API}`
      );

      console.log("resp", resp);
      let respJson = await resp.json();
      console.log("respJson", respJson);
      console.log("respJson.routes", respJson.routes);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      console.log("step2");
      setCoords(coords);
      console.log("coords", coords);
      console.log("step3");
    }
  };

  // fitTwoMarkers = (regions, coords) => {
  //   this.map.fitToCoordinates([regions, coords], {
  //     edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
  //     animated: true
  //   });
  // };

  useEffect(() => {
    // getCurrent();
    getDirections();
    _getLocationAsync();
  }, [props.departurePosition, props.arrivalPosition, props.currentRegion]);

  return (
    <>
      <Container>
        {props.currentRegion !== undefined && props.SearchScreen === true ? (
          <MapView
            style={styles.mapStyle}
            provider="google"
            ref={map => {
              this.map = map;
            }}
            region={region}
            // onRegionChange={this.onRegionChange}
            // onRegionChangeComplete={regionChange => recordEvent(regionChange)}
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
              <Marker
                coordinate={{
                  latitude: props.currentRegion.latitude,
                  longitude: props.currentRegion.longitude
                }}
              >
                <Image
                  source={require("../assets/Delivery_arrival.png")}
                  style={{ width: 45, height: 45 }}
                />
              </Marker>
            )}
            {/*{props.SearchScreen === true &&
      props.arrivalPosition !== null &&
      props.departurePosition !== null ? (
        <MapView.Polyline
          coordinates={coords}
          strokeWidth={3}
          strokeColor="red"
        />
      ) : (
        <Text>이건가</Text>
      )}*/}
          </MapView>
        ) : (
          <MapView
            style={styles.mapStyle}
            provider="google"
            ref={map => {
              this.map = map;
            }}
            region={region}
            // onRegionChange={this.onRegionChange}
            // onRegionChangeComplete={regionChange => recordEvent(regionChange)}
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
            {props.HomeScreen === true &&
              props.orders.map(marker => (
                <Marker
                  key={marker.orderId}
                  ref={marker => {
                    this.marker = marker;
                  }}
                  coordinate={{
                    latitude: Number(marker.arrLat) || 0,
                    longitude: Number(marker.arrLng) || 0
                  }}
                  image={require("../assets/Delivery_arrival.png")}
                  calloutOffset={{ x: -8, y: 28 }}
                  calloutAnchor={{ x: 0.5, y: 0.3 }}
                >
                  <Callout
                    alphaHitTest
                    tooltip
                    onPress={() =>
                      navigation.navigate("OrderDetailScreen", {
                        orderId: marker.orderId
                      })
                    }
                  >
                    <CustomCallout
                      title={marker.title}
                      departures={marker.departures}
                      price={marker.price}
                    ></CustomCallout>
                  </Callout>
                </Marker>
              ))}

            {props.orderDetail === true && props.depLat !== null ? (
              <Marker
                coordinate={{
                  latitude: props.depLat || 0,
                  longitude: props.depLng || 0
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
            {props.orderDetail === true && props.arrLat !== null ? (
              <Marker
                coordinate={{
                  latitude: props.arrLat || 0,
                  longitude: props.arrLng || 0
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
          </MapView>
        )}
      </Container>
    </>
  );
};

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
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(MapScreen)
);
