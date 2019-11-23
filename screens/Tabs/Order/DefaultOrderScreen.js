import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, AsyncStorage } from "react-native";
import GhostButton from "../../../components/Buttons/GhostButton";
import DefaultOrder from "../../../components/DefaultOrder";
import { withNavigation } from "react-navigation";
import { serverApi } from "../../../components/API";
import OrderCard from "../../../components/Cards/OrderCard";
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

      // console.log(`유저 오더: `, requestUserOrders.data.data.orders);

      setOrders([...requestUserOrders.data.data.orders]);
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <Container>
        {orders.length === 0 ? (
          <DefaultOrder />
        ) : (
          orders.map((order, i) => <OrderCard key={i} {...order} />)
        )}
      </Container>
    </ScrollView>
  );
};

export default withNavigation(DefaultOrderScreen);
