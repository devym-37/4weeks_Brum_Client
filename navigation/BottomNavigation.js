import React from "react";
import { Platform, Alert, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import ChatListScreen from "../screens/Tabs/Chats/ChatListScreen";
import OrderScreen from "../screens/Tabs/Order/DefaultOrderScreen";
import OrderDetailScreen from "../screens/Tabs/Order/OrderDetail";
import MyPageScreen from "../screens/Tabs/MyPageScreen";
import ListScreen from "../screens/Tabs/Home/ListScreen";
import HomeScreen from "../screens/Tabs/Home/HomeScreen";
import ApplicantsList from "../screens/Tabs/Order/ApplicantsList";
import ChatScreen from "../screens/Tabs/Chats/ChatScreen";
import NotificationLink from "../components/HeaderLink/HomeHeaderLink";
import BackLink from "../components/HeaderLink/BackLink";
import HomeTitleLink from "../components/HeaderLink/HomeTitleLink";
import ChatHeaderLink from "../components/HeaderLink/ChatHeaderLink";
import ChatListHeaderLink from "../components/HeaderLink/ChatListHeaderLink";
import CancelOrderLink from "../components/HeaderLink/CancelOrderlLink";
import NewOrderLink from "../components/HeaderLink/NewOrderLink";
import { stackStyles } from "./config";
import { AsyncStorage } from "react-native";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    initialRoute: {
      screen: initialRoute,
      navigationOptions: {
        ...customConfig,
        headerStyle: { ...stackStyles }
      }
    },
    ApplicantsList: {
      screen: ApplicantsList,
      navigationOptions: ({ navigation }) => ({
        title: "내요청 상세보기",
        headerRight: (
          <CancelOrderLink orderId={navigation.getParam("orderId")} />
        )
      })
    }
    // OrderDetailScreen: {
    //   screen: OrderDetailScreen,
    //   navigationOptions: {
    //     title: "요청 상세보기"
    //   }
    // }
  });

const BottomNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(HomeScreen, {
        headerRight: <NotificationLink />,
        headerLeft: <HomeTitleLink />
      }),
      navigationOptions: {
        title: "홈",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="home" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Order: {
      screen: stackFactory(OrderScreen, {
        title: "내 요청",
        backgroundColor: "#f1f3f5",
        headerRight: <NewOrderLink />
      }),
      navigationOptions: {
        backgroundColor: "#f1f3f5",
        title: "내요청",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="form" size={24} style={{ color: tintColor }} />
        )
      }
    },
    Chats: {
      screen: stackFactory(ChatListScreen, {
        title: "채팅",
        headerRight: <ChatListHeaderLink />
      }),
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
        backgroundColor: "#FEFFFF",
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
      activeTintColor: "#24282C",
      inactiveTintColor: "#A4A4A4",
      upperCaseLabel: true,
      showLabel: true,
      showIcon: true
    }
  }
);

export default BottomNavigation;
