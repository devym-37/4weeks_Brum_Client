// Imports: Dependencies
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";

// Imports: Assets
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

// Imports: Screens
import Signup from "./screens/Signup";

// Imports: Redux Persist Persister
import { store, persistor } from "./redux/store/store";

// React Native: App
export default function App() {
  const [loaded, setLoaded] = useState(false);

  const preLoad = async () => {
    try {
      await Font.loadAsync({ ...Ionicons.font });
      await Asset.loadAsync([require("./assets/logo.png")]);
      setLoaded(true);
    } catch (e) {
      console.log(`preLoad error: `, e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Signup />
        {/* <View style={styles.container}>
          <Text>Brum Client</Text>
        </View> */}
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
