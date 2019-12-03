import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ReviewDetailScreen from "../screens/chat/ReviewDetailScreen";
import { stackStyles } from "./config";
import CloseLink from "../components/HeaderLink/CloseLink";

export default createStackNavigator({
  ReviewDetailScreen: {
    screen: ReviewDetailScreen,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      headerLeft: <CloseLink />,
      title: "내가 남긴 리뷰"
    }
  }
});
