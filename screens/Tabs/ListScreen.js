import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  RefreshControl,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Content } from "native-base";
import AuthModal from "../Auth/AuthModal";
import { serverApi } from "../../components/API";
import ListCard from "../../components/Cards/ListCard";
import OrderCard from "../../components/Cards/OrderCard";
import { connect } from "react-redux";

import { orderIdSaver } from "../../redux/actions/orderActions";

const ListScreen = ({ navigation, reduxOrderId }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isopenLoginModal, setIsopenLoginModal] = useState(false);

  const refresh = async () => {
    try {
      setRefreshing(true);
      let getAllOrders = await serverApi.getAllOrders();
      // console.log(`refresh: `, getAllOrders);
      console.log("imhere");
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
      setOrders([...getAllOrders.data.data.orders]);
      console.log(`getAllOrders: `, getAllOrders.data.data);
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);
  // console.log("preLoad", preLoad());
  return (
    <>
      {isopenLoginModal && <AuthModal />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <Content>
          {orders.map((data, i) => (
            <View key={data.orderId}>
              <TouchableOpacity
                onPress={() => {
                  // console.log("ㄴㅇㄴㅇㄹ", data.orderId);
                  reduxOrderId(data.orderId);
                  navigation.navigate("OrderDetailScreen");
                }}
              >
                <ListCard data={data} />
              </TouchableOpacity>
            </View>
          ))}
          {/* {orders.map((data, i) => (
            <OrderCard key={i} {...data} />
          ))} */}
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

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    orderId: state.orderReducer.orderId
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxOrderId: orderId => dispatch(orderIdSaver(orderId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
