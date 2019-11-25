import React from "react";
import styled from "styled-components";
import GhostButton from "../../../components/Buttons/GhostButton";
import { withNavigation } from "react-navigation";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  margin-bottom: 4px;
`;

DefaultChatsScreen = ({ navigation }) => {
  // console.log(`order nav: `, navigation);
  return (
    <Container>
      <Text>현재 진행중인 대화가 없어요.</Text>
      <Text>필요한 서비스의 요청서를 보내보세요.</Text>
      <GhostButton
        text="요청서 보내기"
        width={200}
        onPress={() => navigation.navigate("NewOrder")}
      />
    </Container>
  );
};

export default DefaultChatsScreen;
