import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "./config";
import departureAddress from "../screens/Tabs/Order/DepartureAddress";
import BackLink from "../components/HeaderLink/BackLink";

export default createStackNavigator({
  departureAddress: {
    screen: departureAddress,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      title: "출발지 주소 검색",
      mode: "card",
      headerLeft: <BackLink />
    }
  }
});
