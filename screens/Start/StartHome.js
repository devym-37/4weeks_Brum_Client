import React from "react";
import styled from "styled-components";

import constants from "../../constants";
import { AsyncStorage, TouchableOpacity } from "react-native";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5};
  margin-bottom: 20px;
`;

const ButtonContainer = styled.TouchableOpacity``;
const Button = styled.View``;
const ButtonText = styled.Text`
  font-size: 17;
`;

export default ({ navigation }) => {
  const handleSelectSignUp = async () => {
    return await AsyncStorage.setItem("page", "SingUp");
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SelectCampus")}
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <ButtonContainer onPress={() => navigation.navigate("SelectCampus")}>
        <ButtonText>내 학교 설정하고 시작하기</ButtonText>
      </ButtonContainer>
    </TouchableOpacity>
  );
};
