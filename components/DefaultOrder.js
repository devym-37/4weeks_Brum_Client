import React from "react";
import styled from "styled-components";
import GhostButton from "../components/Buttons/GhostButton";
import { withNavigation } from "react-navigation";
import constants from "../constants";
import { Button } from "react-native";

const Container = styled.View`
  margin-top: -80px;
  width: ${constants.width};
  height: ${constants.height - 40};
  background-color: white;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.View`
  margin-top: 16;
`;
const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  margin-bottom: 4px;
`;

DefaultOrder = ({ navigation, refresh }) => {
  return (
    <Container>
      <Text>현재 진행중인 요청이 없어요.</Text>
      <Text>필요한 서비스의 요청서를 보내보세요.</Text>
      <ButtonContainer>
        <GhostButton
          text="요청서 보내기"
          width={200}
          onPress={() => navigation.navigate("NewOrderNavigation")}
        />
      </ButtonContainer>
      {/* <Button
        title="다음페이지"
        onPress={() => {
          navigation.navigate("ChatRooms");
        }}
      >
        <Text>다음페이지</Text>
      </Button> */}
    </Container>
  );
};

export default withNavigation(DefaultOrder);
