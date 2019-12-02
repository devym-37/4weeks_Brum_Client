import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ReviewScreen from "../screens/chat/ReviewScreen";
import { stackStyles } from "./config";
import CloseLink from "../components/HeaderLink/CloseLink";

export default createStackNavigator({
  ReviewScreen: {
    screen: ReviewScreen,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      headerLeft: <CloseLink />,
      title: "리뷰 작성하기",
      mode: "modal"
    }
  }
});
