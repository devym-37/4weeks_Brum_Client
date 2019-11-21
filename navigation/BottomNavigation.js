import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import ChatScreen from "../screens/ChatScreen";
import RequestScreen from "../screens/RequestScreen";
import MyPageScreen from "../screens/MyPageScreen";
import ListScreen from "../screens/ListScreen";
import HomeScreen from "../screens/HomeScreen";

const BottomNav = createBottomTabNavigator(
  {
    홈: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="ios-home" style={{ color: tintColor }} />
        )
      }
    },
    요청하기: {
      screen: RequestScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name="md-clipboard"
            size={30}
            style={{ color: tintColor }}
          />
        )
      }
    },
    채팅: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name="md-chatboxes"
            size={31}
            style={{ color: tintColor }}
          />
        )
      }
    },
    마이페이지: {
      screen: MyPageScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons name="md-person" size={30} style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "white",
        marginBottom: 3
      },
      iconStyle: {
        ...Platform.select({
          ios: {
            height: 35,
            marginBottom: 20
          }
        })
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      upperCaseLabel: true,
      showLabel: true,
      showIcon: true
    }
  }
);

const BottomNavigation = createAppContainer(BottomNav);

export default BottomNavigation;
