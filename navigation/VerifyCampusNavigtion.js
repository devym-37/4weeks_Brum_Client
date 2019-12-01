import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import UserHistoryScreen from "../screens/Tabs/MyPage/UserHistory";
import { stackStyles } from "./config";
import BackLink from "../components/HeaderLink/BackLink";
import VerifyCampusScreen from "../screens/Tabs/MyPage/VerifyCampus";
export default createStackNavigator({
  VerifyCampusScreen: {
    screen: VerifyCampusScreen,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      title: "학교 인증하기",
      headerLeft: <BackLink />,
      mode: "card"
    }
  }
});
