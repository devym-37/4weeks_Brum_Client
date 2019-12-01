import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import UserHistoryScreen from "../screens/Tabs/MyPage/UserHistory";
import { stackStyles } from "./config";
import BackLink from "../components/HeaderLink/BackLink";

export default createStackNavigator({
  UserHistoryScreen: {
    screen: UserHistoryScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        ...stackStyles
      },
      title: navigation.getParam("title"),
      headerLeft: <BackLink />,
      mode: "card"
    })
  }
});
