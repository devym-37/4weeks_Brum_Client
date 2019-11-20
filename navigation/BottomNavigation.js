import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import ChatScreen from "../screens/Tabs/ChatsScreen";
import OrderScreen from "../screens/Tabs/OrderScreen";
import MyPageScreen from "../screens/Tabs/MyPageScreen";
import ListScreen from "../screens/Tabs/ListScreen";

const BottomNav = createBottomTabNavigator(
  {
    홈: {
      screen: ListScreen,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="ios-home" style={{ color: tintColor }} />
        )
      }
    },
    요청하기: {
      screen: OrderScreen,
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
            size={35}
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
