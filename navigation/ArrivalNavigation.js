import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "./config";
import arrivalAddress from "../screens/Tabs/Order/ArrivalAddress";
import BackLink from "../components/HeaderLink/BackLink";

export default createStackNavigator({
  arrivalAddress: {
    screen: arrivalAddress,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      title: "도착지 주소 검색",
      mode: "card",
      headerLeft: <BackLink />
    }
  }
});
