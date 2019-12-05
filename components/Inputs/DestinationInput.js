import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ifIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { currentLocationSave } from "../../redux/actions/currentActions";

const WIDTH = constants.width;
const HEIGHT = constants.height;

const DestinationInput = ({ ...props }) => {
  const [address, setAddress] = useState({});
  const Bottom = props.bottom ? props.bottom : 190;
  const iosBottom = props.bottom ? props.bottom : 240;

  const reverseGeocode = async location => {
    const reverseGeo = await Location.reverseGeocodeAsync(location);
    return reverseGeo;
  };

  const recordEvent = async () => {
    console.log("regionChange", props.currentPosition);
    const address = await reverseGeocode(props.currentPosition);
    console.log("address", address[0]);
    console.log("address", address);
    setAddress(address[0]);
    // const inputDefaultAddress = `${address[0].region} ${address[0].name}`;
    // this.props.reduxCurrentLocation(address[0]);
  };

  useEffect(() => {
    (async () => {
      await recordEvent();
    })();
  }, [props.currentPosition]);

  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
        this.props.reduxCurrentLocation(address);
      }}
      style={[
        styles.container,
        {
          top: Platform.OS === "android" ? HEIGHT - Bottom : HEIGHT - 145,
          ...ifIphoneX({ top: HEIGHT - iosBottom })
        }
      ]}
    >
      <View style={styles.leftCol}>
        <Image
          style={{ width: 30, height: 28 }}
          source={require("../../assets/Delivery_arrival.png")}
        />
        {/* <Text note style={{ fontSize: 12, color: "#545454", paddingTop: 3 }}>
          도착지
        </Text> */}
      </View>
      <View style={styles.centerCol}>
        <Text style={{ fontSize: 16, color: "#858e96" }}>
          {props.destination
            ? props.destination
            : `${address.region} ${address.name}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: WIDTH - 35,
    height: 50,
    left: 20,
    borderRadius: 4,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 4,
    shadowOpacity: 0.1
  },
  leftCol: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10
  },
  centerCol: {
    flex: 6,
    alignItems: "center",
    paddingRight: 25
  }
});

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxCurrentLocation: currentLocation =>
      dispatch(currentLocationSave(currentLocation))
  };
};

export default connect(mapDispatchToProps)(DestinationInput);
