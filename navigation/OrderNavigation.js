import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "./config";
import OrderDetailScreen from "../screens/Tabs/Order/OrderDetail";

import ShareLink from "../components/HeaderLink/ShareLink";
import BackLink from "../components/HeaderLink/BackLink";

const OrderNavigation = createStackNavigator({
  OrderDetailScreen: {
    screen: OrderDetailScreen,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },

      mode: "card",

      headerTitle: "요청 상세보기",
      headerRight: <ShareLink />,
      headerLeft: <BackLink />
    }
  }
});

export default OrderNavigation;
