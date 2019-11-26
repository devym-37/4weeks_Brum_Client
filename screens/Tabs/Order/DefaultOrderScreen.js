import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, AsyncStorage } from "react-native";

import { withNavigation } from "react-navigation";
import { serverApi } from "../../../components/API";

import DefaultOrder from "../../../components/DefaultOrder";
import OrderCard from "../../../components/Cards/OrderCard";
import Loader from "../../../components/Loader";

const Container = styled.View`
  flex: 1;
  margin-top: 50%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  margin-bottom: 4px;
`;

DefaultOrderScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    try {
      setRefreshing(true);
      const userToken = await AsyncStorage.getItem("userToken");
      let requestUserOrders = await serverApi.getUserOrders(userToken);
      // console.log(`리프레쉬 오더 `, requestUserOrders);
      setOrders([...requestUserOrders.data.data.orders]);
    } catch (e) {
      console.log(`Can't refresh data. error message: ${e}`);
    } finally {
      setRefreshing(false);
    }
  };
  const preLoad = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");

      let requestUserOrders = await serverApi.getUserOrders(userToken);
      console.log(`requestUserOrders: `, requestUserOrders);
      setOrders([...requestUserOrders.data.data.orders]);
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f5" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : orders.filter(order => {
          // console.log(order);
          return order.orderStatus < 5;
        }).length === 0 ? (
        <DefaultOrder />
      ) : (
        orders.map((order, i) => (
          <OrderCard
            key={i}
            {...order}
            onPress={() => {
              navigation.navigate("ApplicantsList", { orderId: "1" });
            }}
          />
        ))
      )}
    </ScrollView>
  );
};

export default DefaultOrderScreen;
