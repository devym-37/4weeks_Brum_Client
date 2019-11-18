import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from "../../components/Buttons/GhostButton";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 6;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5};
  margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;

const TourLink = styled.View``;

const TourLinkText = styled.Text`
  color: ${props => props.theme.lightGreyColor};
  font-weight: 400;
`;

export default ({ navigation }) => (
  <View>
    <Touchable>
      <TourLink>
        <TourLinkText>둘러보기</TourLinkText>
      </TourLink>
    </Touchable>
    <Image resizeMode={"contain"} source={require("../../assets/logo.png")} />
    <MainButton
      text={"가입하고 구경하기"}
      onPress={() => navigation.navigate("VerifyPhone")}
    />
    <GhostButton
      text={"로그인 하기"}
      onPress={() => navigation.navigate("Login")}
    />
  </View>
);
