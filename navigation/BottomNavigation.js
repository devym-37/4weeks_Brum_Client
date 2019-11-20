import React from "react";
import { Platform } from "react-native";
import { Icon } from "native-base";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import ChatScreen from "../screens/Tabs/ChatsScreen";
import OrderScreen from "../screens/Tabs/OrderScreen";
import MyPageScreen from "../screens/Tabs/MyPageScreen";
import ListScreen from "../screens/Tabs/ListScreen";
import NotificationScreen from "../screens/Tabs/NotificationScreen";

const BottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: ListScreen,
      navigationOptions: {
        title: "홈",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="home" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: "내요청",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="form" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Chats: {
      screen: ChatScreen,
      navigationOptions: {
        title: "채팅",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="message1" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Mypage: {
      screen: MyPageScreen,
      navigationOptions: {
        title: "마이페이지",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="user" size={24} style={{ color: tintColor }} />
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
      activeTintColor: "#666",
      inactiveTintColor: "#d1cece",
      upperCaseLabel: true,
      showLabel: true,
      showIcon: true
    }
  }
);

const BottomNavigation = createAppContainer(BottomNav);

export default BottomNavigation;
