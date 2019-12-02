// Imports: Dependencies
import React, { useState } from "react";
import { Text, TouchableHighlight, View, Alert } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
// Imports: Custom components
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from "../../components/Buttons/GhostButton";

import constants from "../../constants";

const Image = styled.Image`
  width: ${constants.width / 3};
  height: ${constants.width / 4};
  margin: 24px 0;
`;
const Container = styled.View`
  padding: 22px;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ButtonContainer = styled.View`
  padding: 12px 0;
`;

const ContentTitle = styled.Text`
  font-size: 20;
  margin-bottom: 20px;
`;
const Touchable = styled.TouchableOpacity``;

const TourLink = styled.View`
  /* margin-top: 40; */
`;

const TourLinkText = styled.Text`
  color: ${props => props.theme.greyColor};
  font-weight: 400;
`;
const AuthModal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleSignupBtn = () => {
    setModalVisible(false);
    navigation.navigate("VerifyPhone");
  };

  const handleLoginBtn = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Modal isVisible={modalVisible}>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginBottom: -30,
            marginRight: 12,
            zIndex: 3
          }}
        >
          <Touchable onPress={() => setModalVisible(!modalVisible)}>
            <TourLink>
              <TourLinkText>둘러보기</TourLinkText>
            </TourLink>
          </Touchable>
        </View>
        <Container>
          <Image
            resizeMode={"contain"}
            source={require("../../assets/brand_symbol.png")}
          />
          <ContentTitle>지금 가입하면 무엇이든 쌉가능</ContentTitle>
          <ButtonContainer>
            <MainButton
              width={90}
              text={"가입하고 구경하기"}
              onPress={handleSignupBtn}
            />
          </ButtonContainer>

          <GhostButton
            width={90}
            text={"로그인 하기"}
            onPress={handleLoginBtn}
          />
        </Container>
      </Modal>
    </View>
  );
};

export default withNavigation(AuthModal);
