import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;
const ButtonContainer = styled.TouchableOpacity``;
const Button = styled.View``;
const ButtonText = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>Select Campus</Text>
    <ButtonContainer onPress={() => navigation.navigate("AuthHome")}>
      <Button>
        <ButtonText>한양대</ButtonText>
      </Button>
    </ButtonContainer>
  </View>
);
