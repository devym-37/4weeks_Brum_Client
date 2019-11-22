import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  RefreshControl,
  AsyncStorage
} from "react-native";
import { Content } from "native-base";
import AuthModal from "../Auth/AuthModal";
import { serverApi } from "../../components/API";

const ListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isopenLoginModal, setIsopenLoginModal] = useState(false);

  const refresh = async () => {
    try {
      setRefreshing(true);
      let getAllOrders = await serverApi.getAllOrders();
      // console.log(`refresh: `, getAllOrders);
    } catch (e) {
      console.log(`Can't refresh data. error message: ${e}`);
    } finally {
      setRefreshing(false);
    }
  };

  const preLoad = async () => {
    try {
      setLoading(true);
      const loggedIn = await AsyncStorage.getItem("userToken");
      console.log(`ListScreen token: `, loggedIn);
      if (!loggedIn) {
        setIsopenLoginModal(true);
      }
      let getAllOrders = await serverApi.getAllOrders();
      // console.log(`getAllOrders: `, getAllOrders);
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);
  return (
    <>
      {isopenLoginModal && <AuthModal />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <Text>List Screen</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 20 : 0 // android top-tab statusbar overlap fix
  },
  titleStyle: {
    color: "black"
  },
  footerStyle: {
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default ListScreen;
