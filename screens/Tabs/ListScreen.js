<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  RefreshControl
} from "react-native";
import { Content } from "native-base";
=======
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, FooterTab, Footer } from "native-base";
import { StyleSheet, View, Text, Platform } from "react-native";
import { createBottomTabNavigator, createAppContainer, TabNavigator } from "react-navigation";

>>>>>>> e64bde6983aeb7a5e6d4be81b7756f9b566c3399
import AuthModal from "../Auth/AuthModal";
import { serverApi } from "../../components/API";

const ListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

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
      <AuthModal />

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
  }
});

export default ListScreen;
