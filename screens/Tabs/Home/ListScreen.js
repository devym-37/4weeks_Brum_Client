import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Platform,
  RefreshControl,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Content } from "native-base";
import styled from "styled-components";
import AuthModal from "../../Auth/AuthModal";
import { serverApi } from "../../../components/API";
import ListCard from "../../../components/Cards/ListCard";
import OrderCard from "../../../components/Cards/OrderCard";
import Loader from "../../../components/Loader";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { orderIdSaver } from "../../../redux/actions/orderActions";
import DefaultOrder from "../../../components/DefaultOrder";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState(props.orders);

  const refresh = async () => {
    try {
      setRefreshing(true);
      const selectedCampus = props.campus;
      let getCampusOrders = await serverApi.getCampusOrders(selectedCampus);
      // console.log(`refresh: `, getAllOrders);
      setOrders([...getCampusOrders.data.data.orders]);

      console.log(`order: `, getCampusOrders);
    } catch (e) {
      console.log(`Can't refresh data. error message: ${e}`);
    } finally {
      setRefreshing(false);
    }
  };

  const handleClick = async orderId => {
    // console.log(`orders: `, orders);
    const userToken = await AsyncStorage.getItem("userToken");

    if (userToken) {
      props.reduxOrderId(orderId);
      console.log(`orderId: `, orderId);
      props.navigation.navigate("OrderDetailScreen", {
        orderId: orderId
      });
    } else {
      Alert.alert(
        null,
        "가입 또는 로그인이 필요합니다. 회원가입 및 로그인을 하시겠어요?",
        [
          {
            text: "회원가입",
            onPress: () => props.navigation.navigate("VerifyPhone")
          },
          {
            text: "취소",
            style: "cancel"
          },
          { text: "로그인", onPress: () => props.navigation.navigate("Login") }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {/* {props.orders &&
            props.orders.map((data, i) => (
              <OrderCard
              {...data}
              key={i}
              onPress={() => handleClick(data.orderId)}
              />
            ))} */}
        {props.orders && props.orders.length > 0 ? (
          props.orders.map((data, i) => (
            <OrderCard
              {...data}
              key={i}
              onPress={() => handleClick(data.orderId)}
            />
          ))
        ) : (
          <Container style={{ marginTop: -50 }}>
            <DefaultOrder />
          </Container>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
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
    orderId: state.orderReducer.orderId,
    campus: state.campusReducer.campus
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxOrderId: orderId => dispatch(orderIdSaver(orderId))
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(ListScreen)
);
