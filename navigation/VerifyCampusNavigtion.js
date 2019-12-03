import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { stackStyles } from "./config";
import BackLink from "../components/HeaderLink/BackLink";
import VerifyCampusScreen from "../screens/Tabs/MyPage/VerifyEmail";
import ConfirmEmailScreen from "../screens/Tabs/MyPage/ConfirmEmail";

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
  },
  ConfirmEmailScreen: {
    screen: ConfirmEmailScreen,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      title: "인증번호 확인",
      headerLeft: <BackLink />,
      mode: "card"
    }
  }
});
