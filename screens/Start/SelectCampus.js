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

export default ({ navigation }) => {
  console.log(`대학캠퍼스: `, navigation);
  return (
    <View>
      <Text>Select Campus</Text>
      <ButtonContainer onPress={() => navigation.navigate("BottomNavigation")}>
        <Button>
          <ButtonText>한양대</ButtonText>
        </Button>
      </ButtonContainer>
    </View>
  );
};
