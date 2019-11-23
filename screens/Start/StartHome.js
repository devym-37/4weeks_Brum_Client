import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import { AsyncStorage } from "react-native";

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
const ButtonText = styled.Text``;

export default ({ navigation }) => {
  const handleSelectSignUp = async () => {
    return await AsyncStorage.setItem("page", "SingUp");
  };

  return (
    <View>
      <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
      <ButtonContainer onPress={() => navigation.navigate("SelectCampus")}>
        <Button onPress={handleSelectSignUp}>
          <ButtonText>내 학교 설정하고 시작하기</ButtonText>
        </Button>
      </ButtonContainer>
    </View>
  );
};
