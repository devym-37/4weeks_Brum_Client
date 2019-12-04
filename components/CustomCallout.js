import React from "react";

import { StyleSheet, View, Text } from "react-native";
import utils from "../utils";
import { AntDesign } from "@expo/vector-icons";

const CustomCallout = ({ title, arrivals, price, createdAt }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.amount}>
          <Text
            style={{
              fontSize: 15,

              alignItems: "center",
              justifyContent: "center",
              marginBottom: 3,
              color: "#22252a"
            }}
          >
            {utils.shortenText(title, 8)}
          </Text>
          <Text
            note
            style={{ fontSize: 11, color: "#737b84", marginBottom: 8 }}
          >
            {utils.transferTime(createdAt)}
          </Text>
          <Text
            note
            style={{ fontSize: 13, color: "#22252a", marginBottom: 4 }}
          >
            {utils.shortenText(arrivals, 9)}
          </Text>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Text
              note
              style={{
                marginBottom: 6,
                color: "#22252a",
                fontWeight: "600",
                fontSize: 15,
                lineHeight: 15,
                marginRight: 48
              }}
            >
              {price !== "null"
                ? `${utils.numberWithCommas(price)}원`
                : "비용협의"}
            </Text>
            <AntDesign
              name="rightcircleo"
              size={20}
              style={{ color: "#737b84", marginTop: -5 }}
            />
          </View>
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
    width: 160,
    height: 100,
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
