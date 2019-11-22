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
import AuthModal from "../Auth/AuthModal";
import { serverApi } from "../../components/API";
import ListCard from "../ListCard";

const ListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);

  const refresh = async () => {
    try {
      setRefreshing(true);
      let getAllOrders = await serverApi.getAllOrders();
      // console.log(`refresh: `, getAllOrders);
      console.log(orders);
    } catch (e) {
      console.log(`Can't refresh data. error message: ${e}`);
    } finally {
      setRefreshing(false);
    }
  };

  const preLoad = async () => {
    try {
      let getAllOrders = await serverApi.getAllOrders();
      setOrders([...getAllOrders.data.data.orders]);
      // console.log(`getAllOrders: `, getAllOrders.data.data.orders);
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
        <Content>
          {orders.map(data => (
            <ListCard data={data} />
          ))}
        </Content>
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
