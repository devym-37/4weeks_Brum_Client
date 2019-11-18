import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          provider="google"
          initialRegion={{
            // 한양대 default map
            latitude: 37.557615,
            longitude: 127.046963,
            latitudeDelta: 0.006,
            longitudeDelta: 0.001
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
