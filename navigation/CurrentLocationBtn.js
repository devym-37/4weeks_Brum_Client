import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const CurrentLocationButton = function(props) {
  //if props.cb is passed, use it. if not, console.log() when cb() is called.
  const cb = props.cb ? props.cb : () => console.log("callback function not passed to CurrentLocationButton");
  // if props.bottom is passed, use it. if not, set bottom to 110
  const bottom = props.bottom ? props.bottom : 190;
  return (
    <View style={[styles.container, { top: HEIGHT - bottom }]}>
      <MaterialIcons
        name="my-location"
        color="#24282C"
        size={25}
        onPress={() => {
          cb();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    left: WIDTH - 60,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
