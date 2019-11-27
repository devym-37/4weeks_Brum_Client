import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, AsyncStorage } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { withNavigation } from "react-navigation";
import { serverApi } from "../../../components/API";

import DefaultOrder from "../../../components/DefaultOrder";
import OrderCard from "../../../components/Cards/OrderCard";
import Loader from "../../../components/Loader";
import constants from "../../../constants";
import styles from "../../../styles";
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
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "first", title: "지원자 리스트" },
    { key: "second", title: "내요청 상세보기" }
  ]);
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
      // console.log(`requestUserOrders: `, requestUserOrders);
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

  const _renderTabBar = props => (
    <TabBar
      {...props}
      activeColor="#333"
      inactiveColor="#333"
      indicatorStyle={{ backgroundColor: styles.mainColor }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontSize: 16 }}
    />
  );

  const FirstRoute = () => (
    <>
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
              navigation.navigate("ApplicantsList", { orderId: order.orderId });
            }}
          />
        ))
      )}
    </>
  );

  const SecondRoute = () => (
    <Container>
      <Text>내요청상세</Text>
    </Container>
  );
  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f5" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <TabView
        navigationState={{ index, routes: [...routes] }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute
        })}
        renderTabBar={_renderTabBar}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: constants.width }}
      />
      {/* {loading ? (
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
              navigation.navigate("ApplicantsList", { orderId: order.orderId });
            }}
          />
        ))
      )} */}
    </ScrollView>
  );
};

export default DefaultOrderScreen;
