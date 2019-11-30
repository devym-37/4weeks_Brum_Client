import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import { serverApi } from "../API";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-right: 15;
`;

const CompleteLink = ({ navigation, ...props }) => {
  const handleSubmit = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const orderContents = {
        title: props.title,
        category: props.category,
        desiredArrivalTime: props.time,
        price: props.price,
        isPrice: props.isPrice,
        details: props.message,
        departures: props.departureLocation,
        depLat: props.departurePosition.latitude,
        depLng: props.departurePosition.longitude,
        arrivals: props.arrivalLocation,
        arrLat: props.arrivalPosition.latitude,
        arrLng: props.arrivalPosition.longitude
      };
      console.log(`orderContents:`, orderContents);
      const requestPost = await serverApi.postOrder(
        userToken,
        orderContents,
        props.images[0].uri
      );
      console.log(`새요청 작성하기: `, requestPost);
    } catch (e) {
      console.log(`Can't post order form on server. Error : ${e}`);
    } finally {
      navigation.navigate("Home");
    }
  };
  return (
    <>
      <Container onPress={handleSubmit}>
        <Text>완료</Text>
      </Container>
    </>
  );
};
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    title: state.orderReducer.title,
    category: state.orderReducer.category,
    time: state.orderReducer.desiredArrivalTime,
    isPrice: state.orderReducer.isPrice,
    message: state.orderReducer.details,
    images: state.orderReducer.images,
    price: state.orderReducer.price,
    arrivalLocation: state.destinationReducer.arrivalLocation,
    departureLocation: state.destinationReducer.departureLocation,
    arrivalPosition: state.orderPositionReducer.arrivalPosition,
    departurePosition: state.orderPositionReducer.departurePosition
  };
};

export default withNavigation(connect(mapStateToProps, null)(CompleteLink));
