import React from "react";
import styled from "styled-components";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { serverApi } from "../API";
import { AsyncStorage, Alert } from "react-native";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 14;
  font-weight: 200;
  padding-right: 15;
`;
export default withNavigation(({ navigation, orderId }) => {
  const handleCancel = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const request = await serverApi.cancelMyOrder(orderId, userToken);
      console.log(`요청취소 server response: `, request);
      const resetAction = StackActions.reset({
        key: null,
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "BottomNavigation" })]
      });

      navigation.dispatch(resetAction);
    } catch (e) {
      console.log(`Can't cancel order with server API. Error: ${e}`);
    }
  };
  const handleClick = () => {
    Alert.alert(
      null,
      "요청을 취소하면 모든 요청내용이 삭제됩니다. 계속 진항하시겠습니까?",
      [
        {
          text: "확인",
          onPress: handleCancel
        },
        {
          text: "취소",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <>
      <Container onPress={handleClick}>
        <Text>요청취소</Text>
      </Container>
    </>
  );
});
