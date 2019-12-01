import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform, View, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import NewOrder from "../screens/Tabs/Order/NewOrderScreen";
import CategoryFilter from "../screens/Tabs/Order/CategoryFilter";
import SearchAddress from "../screens/Tabs/Order/SearchAddress";
import { stackStyles } from "./config";
import CloseLink from "../components/HeaderLink/CloseLink";
import BackLink from "../components/HeaderLink/BackLink";
import CompleteFormLink from "../components/HeaderLink/CompleteFormLink";

const bottomTabFactory = (initialRoute, customConfig) =>
  createBottomTabNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Bulk: {
        screen: View,
        navigationOptions: {
          tabBarVisible: false,
          tabBarOnPress: () => null
        }
      },
      Bulk2: {
        screen: View,
        navigationOptions: {
          tabBarVisible: false,
          tabBarOnPress: () => null
        }
      },
      Bulk3: {
        screen: View,
        navigationOptions: {
          tabBarVisible: false,
          tabBarOnPress: () => null
        }
      },
      Photo: {
        screen: View,
        navigationOptions: {
          tabBarOnPress: ({ navigation }) =>
            Alert.alert(
              "사진 업로드",
              null,
              [
                {
                  text: "앨범에서 선택",
                  onPress: () =>
                    navigation.navigate("SelectPhoto", { userAvatar: false })
                },
                {
                  text: "닫기",
                  style: "cancel"
                },
                {
                  text: "카메라 촬영",
                  onPress: () => navigation.navigate("TakePhoto")
                }
              ],
              { cancelable: false }
            ),
          tabBarIcon: (focused, tintColor) => (
            <AntDesign name="camera" size={24} style={{ color: tintColor }} />
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
        showLabel: false,
        showIcon: true
      }
    }
  );

export default createStackNavigator({
  NewOrder: {
    screen: bottomTabFactory(NewOrder),
    navigationOptions: {
      title: "새 요청 글쓰기",
      headerLeft: <CloseLink />,
      headerRight: <CompleteFormLink />,
      mode: "card",
      ...stackStyles
    }
  },
  CategoryFilter: {
    screen: CategoryFilter,
    navigationOptions: {
      title: "카테고리 선택",
      headerLeft: <BackLink />
    }
  },
  SearchAddress: {
    screen: SearchAddress,
    navigationOptions: {
      title: "출발지･도착지 입력",
      headerLeft: <BackLink />
    }
  }
});
