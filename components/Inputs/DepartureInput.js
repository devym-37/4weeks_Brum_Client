import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ifIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants";

const WIDTH = constants.width;
const HEIGHT = constants.height;

export const DestinationInput = function(props) {
  const Bottom = props.bottom ? props.bottom : 190;
  const iosBottom = props.bottom ? props.bottom : 2400;
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        styles.container,
        { top: HEIGHT - Bottom, ...ifIphoneX({ top: HEIGHT - iosBottom }) }
      ]}
    >
      <View style={styles.leftCol}>
        <Image
          style={{ width: 30, height: 28 }}
          source={require("../../assets/Delivery_departure.png")}
        />
        <Text note style={{ fontSize: 12, color: "#545454" }}>
          출발지
        </Text>
      </View>
      <View style={styles.centerCol}>
        <Text style={{ fontSize: 14, color: "#545454" }}>
          {props.destination.region} {props.destination.street}{" "}
          {props.destination.name}
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
    width: WIDTH - 100,
    height: 50,
    left: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  leftCol: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10
  },
  centerCol: {
    flex: 6,
    alignItems: "center"
  }
});
