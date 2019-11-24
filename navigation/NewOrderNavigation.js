import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import NewOrder from "../screens/Tabs/Order/NewOrderScreen";

import { stackStyles } from "./config";
import CloseLink from "../components/HeaderLink/CloseLink";
import CompleteFormLink from "../components/HeaderLink/CompleteFormLink";
export default createStackNavigator({
  NewOrder: {
    screen: NewOrder,
    navigationOptions: {
      title: "새 요청 글쓰기",
      headerLeft: <CloseLink />,
      headerRight: <CompleteFormLink />,
      mode: "card",
      ...stackStyles
    }
  }
});
