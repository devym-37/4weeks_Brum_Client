import React from "react";

import { StyleSheet, View, Text } from "react-native";

const CustomCallout = ({ title, departures, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.amount}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
              height: 18,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 3
            }}
          >
            {title}
          </Text>
          <Text note style={{ height: 12, marginBottom: 3 }}>
            가격 : {price ? price : "가격협의"}
          </Text>
          <Text note style={{ height: 12 }}>
            도착지 : {departures}
          </Text>
        </View>
      </View>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  bubble: {
    width: 140,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 0.5
  },
  amount: {
    flex: 1
  },
  arrow: {
    backgroundColor: "transparent",
    borderWidth: 16,
    borderColor: "transparent",
    borderTopColor: "#rgba(255,255,255,0.8)",
    alignSelf: "center",
    marginTop: -32
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderWidth: 16,
    borderColor: "transparent",
    borderTopColor: "rgba(255,255,255,0.8)",
    alignSelf: "center",
    marginTop: -0.5
  }
});

export default CustomCallout;
