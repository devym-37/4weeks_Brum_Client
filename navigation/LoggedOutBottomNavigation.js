import React from "react";
import { Platform, Alert, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

import ChatScreen from "../screens/Tabs/Chats/ChatListScreen";
import OrderScreen from "../screens/Tabs/Order/DefaultOrderScreen";
import MyPageScreen from "../screens/Tabs/MyPage/MyPageScreen";
import ListScreen from "../screens/Tabs/Home/ListScreen";
import HomeScreen from "../screens/Tabs/Home/HomeScreen";
import ApplicantsList from "../screens/Tabs/Order/ApplicantsList";
import { createStackNavigator } from "react-navigation-stack";
import OrderDetailScreen from "../screens/Tabs/Order/OrderDetail";
import NotificationLink from "../components/HeaderLink/HomeHeaderLink";
import HomeTitleLink from "../components/HeaderLink/HomeTitleLink";
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
      navigationOptions: {
        title: "내요청 상세보기"
      }
    },
    OrderDetailScreen: {
      screen: OrderDetailScreen,
      navigationOptions: {
        title: "요청 상세보기"
      }
    }
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
        backgroundColor: "#f1f3f5"
      }),
      navigationOptions: {
        backgroundColor: "#f1f3f5",
        title: "내요청",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="profile" size={26} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
          return Alert.alert(
            null,
            "가입 또는 로그인이 필요합니다. 회원가입 및 로그인을 하시겠어요?",
            [
              {
                text: "회원가입",
                onPress: () => navigation.navigate("VerifyPhone")
              },
              {
                text: "취소",
                style: "cancel"
              },
              { text: "로그인", onPress: () => navigation.navigate("Login") }
            ],
            { cancelable: false }
          );
        }
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        title: "글쓰기",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="form" size={26} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
          return Alert.alert(
            null,
            "가입 또는 로그인이 필요합니다. 회원가입 및 로그인을 하시겠어요?",
            [
              {
                text: "회원가입",
                onPress: () => navigation.navigate("VerifyPhone")
              },
              {
                text: "취소",
                style: "cancel"
              },
              { text: "로그인", onPress: () => navigation.navigate("Login") }
            ],
            { cancelable: false }
          );
        }
      }
    },
    Chats: {
      screen: stackFactory(ChatScreen, { title: "채팅" }),
      navigationOptions: {
        title: "채팅",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="message1" size={24} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
          return Alert.alert(
            null,
            "가입 또는 로그인이 필요합니다. 회원가입 및 로그인을 하시겠어요?",
            [
              {
                text: "회원가입",
                onPress: () => navigation.navigate("VerifyPhone")
              },
              {
                text: "취소",
                style: "cancel"
              },
              { text: "로그인", onPress: () => navigation.navigate("Login") }
            ],
            { cancelable: false }
          );
        }
      }
    },
    Mypage: {
      screen: stackFactory(MyPageScreen, { title: "마이페이지" }),
      navigationOptions: {
        title: "마이페이지",
        tabBarIcon: ({ focused, tintColor }) => (
          <AntDesign name="user" size={24} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
          return Alert.alert(
            null,
            "가입 또는 로그인이 필요합니다. 회원가입 및 로그인을 하시겠어요?",
            [
              {
                text: "회원가입",
                onPress: () => navigation.navigate("VerifyPhone")
              },
              {
                text: "취소",
                style: "cancel"
              },
              { text: "로그인", onPress: () => navigation.navigate("Login") }
            ],
            { cancelable: false }
          );
        }
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
