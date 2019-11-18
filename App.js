// Imports: Dependencies
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

// Imports: Assets
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";


// Imports: Navigations
import StartNavigation from "./navigation/StartNavigation";

// Imports: Screens
import Signup from "./screens/Signup";
import MapView from "./screens/HomeScreen";


// Imports: Redux Persist Persister
import { store, persistor } from "./redux/store/store";

// Imports: Styled Component Custom Colors Theme Provider
import { ThemeProvider } from "styled-components";
import styles from "./styles";
import Test from "./screens/Test";

// React Native: App
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
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

  return loaded && isLoggedIn !== null ? (
    // Redux: Global Store
    <Provider store={store}>
      <ThemeProvider theme={styles}>
        <PersistGate loading={null} persistor={persistor}>

          <MapView />

          {isLoggedIn ? (
            <Test />
          ) : (
      
            <StartNavigation />
          )}

        </PersistGate>
      </ThemeProvider>
    </Provider>
  ) : (
    <AppLoading />
  );
}
