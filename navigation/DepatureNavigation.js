import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "./config";
import orderAddress from "../screens/Tabs/Order/OrderAddress";
import BackLink from "../components/HeaderLink/BackLink";

export default createStackNavigator({
  orderAddress: {
    screen: orderAddress,
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
