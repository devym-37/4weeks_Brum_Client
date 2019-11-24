import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import CloseLink from "../components/HeaderLink/CloseLink";
import CompleteFormLink from "../components/HeaderLink/CompleteFormLink";
import styles from "../styles";
const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: SelectPhoto,
      navigationOptions: {
        ...stackStyles,
        tabBarLabel: "라이브러리"
      }
    },
    TakePhoto: {
      screen: TakePhoto,
      navigationOptions: {
        ...stackStyles,
        tabBarLabel: "촬영 업로드"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor,
        marginBottom: 20
      },
      style: {
        paddingBottom: 20,
        ...stackStyles
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      }
    }
  }
);

export default createStackNavigator(
  {
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "사진 선택",
        headerBackTitle: null
      }
    },
    UploadPhoto: {
      screen: UploadPhoto,
      navigationOptions: {
        title: "사진 업로드"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      headerTintColor: styles.blackColor
    }
  }
);
