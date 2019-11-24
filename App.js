// Imports: Dependencies
import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

// Imports: Assets
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons, AntDesign } from "@expo/vector-icons";

// Imports: Navigations
import StartNavigation from "./navigation/StartNavigation";
import MainNavigation from "./navigation/MainNavigation";
// Imports: Screens

import Signup from "./screens/Auth/Signup";

import MapView from "./screens/Tabs/HomeScreen";

// Imports: Redux Persist Persister
import { store, persistor } from "./redux/store/store";
import { permissions } from "./redux/actions/permissionsActions";

// Imports: Styled Component Custom Colors Theme Provider
import { ThemeProvider } from "styled-components";
import styles from "./styles";

import ListCard from "./screens/ListCard";
import PermissionApp from "./screens/Auth/Permissions";
import Userinfo from "./screens/Auth/UserInfo";
import SelectCampus from "./screens/Start/SelectCampus";
import SelectPhoto from "./screens/Photo/SelectPhoto";
import OderDetailScreen from "./screens/Tabs/Order/OrderDetailScreen";

// React Native: App
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAllowed, setisAllowed] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
        ...AntDesign.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);

      //
      await AsyncStorage.setItem("permiSsions", "true");
      //빼기
      const permiSsions = await AsyncStorage.getItem("permiSsions");
      const loggedIn = await AsyncStorage.getItem("userToken");

      loggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
      permiSsions ? setisAllowed(true) : setisAllowed(false);

      setLoaded(true);
    } catch (e) {
      console.log(`preLoad error: `, e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  // {isLoggedIn ? <LoggedInNavigation /> : <StartNavigation />}  // push 시 추가
  // <HomeNavigation />
  //<MainNavigation />
  return loaded && isLoggedIn !== null ? (
    // Redux: Global Store
    <Provider store={store}>
      <ThemeProvider theme={styles}>
        <PersistGate loading={null} persistor={persistor}>
          <OderDetailScreen />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  ) : (
    <AppLoading />
  );
}
/*
{isLoggedIn ? <MainNavigation /> : <StartNavigation />}



{isAllowed ? (
  isLoggedIn ? (
    <MainNavigation />
  ) : (
    <StartNavigation />
  )
) : (
  <PermissionApp />
)} */
