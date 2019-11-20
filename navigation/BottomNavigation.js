import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import ChatScreen from "../screens/Tabs/ChatsScreen";
import OrderScreen from "../screens/Tabs/OrderScreen";
import MyPageScreen from "../screens/Tabs/MyPageScreen";
import ListScreen from "../screens/Tabs/ListScreen";
import { createStackNavigator } from "react-navigation-stack";

import NotificationLink from "../components/HeaderLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

const BottomNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(ListScreen, {
        title: "홈",
        headerRight: <NotificationLink />
      }),
      navigationOptions: {
        title: "홈",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="home" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Order: {
      screen: stackFactory(OrderScreen, { title: "내요청" }),
      navigationOptions: {
        title: "내요청",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="form" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Chats: {
      screen: stackFactory(ChatScreen, { title: "채팅" }),
      navigationOptions: {
        title: "채팅",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="message1" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Mypage: {
      screen: stackFactory(MyPageScreen, { title: "마이페이지" }),
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

export default BottomNavigation;
