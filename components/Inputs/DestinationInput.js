import React from "react";
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

const WIDTH = constants.width;
const HEIGHT = constants.height;

export const DestinationInput = function(props) {
  const Bottom = props.bottom ? props.bottom : 140;
  const iosBottom = props.bottom ? props.bottom : 190;
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        styles.container,
        {
          top: Platform.OS === "android" ? HEIGHT - Bottom : HEIGHT - 95,
          ...ifIphoneX({ top: HEIGHT - iosBottom })
        }
      ]}
    >
      <View style={styles.leftCol}>
        <Image
          style={{ width: 30, height: 28 }}
          source={require("../../assets/Delivery_arrival.png")}
        />
        <Text note style={{ fontSize: 12, color: "#545454", paddingTop: 3 }}>
          도착지
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
    width: WIDTH - 35,
    height: 50,
    left: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 0.2
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
