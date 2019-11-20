// Imports: Dependencies
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

// Imports: Assets
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons, AntDesign } from "@expo/vector-icons";

// Imports: Navigations
import StartNavigation from "./navigation/StartNavigation";
import LoggedInNavigation from "./navigation/LoggedInNavigation";
import HomeNavigation from "./navigation/HomeNavigation";
<<<<<<< HEAD
import TestNavigation from "./navigation/TestNavigation";
=======
import MainNavigation from "./navigation/MainNavigation";
>>>>>>> acd88873356f510a0f27ca7f38cf6765a387ae12
// Imports: Screens

import Signup from "./screens/Auth/Signup";

<<<<<<< HEAD
import MapView from "./screens/HomeScreen";
import UserInfo from "./screens/Auth/UserInfo";
=======
import MapView from "./screens/Tabs/HomeScreen";
>>>>>>> acd88873356f510a0f27ca7f38cf6765a387ae12

// Imports: Redux Persist Persister
import { store, persistor } from "./redux/store/store";

// Imports: Styled Component Custom Colors Theme Provider
import { ThemeProvider } from "styled-components";
import styles from "./styles";

import HomeScreen from "./screens/Tabs/HomeScreen";

// React Native: App
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
        ...AntDesign.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);

      const loggedIn = await store.getState().authReducer.loggedIn;

      loggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);

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
          {isLoggedIn ? <MainNavigation /> : <StartNavigation />}
        </PersistGate>
      </ThemeProvider>
    </Provider>
  ) : (
    <AppLoading />
  );
}
