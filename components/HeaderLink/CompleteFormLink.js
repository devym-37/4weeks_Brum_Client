import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-right: 15;
`;

const CompleteLink = ({ navigation }) => {
  // const handleSubmit = async () => {

  // }
  return (
    <>
      <Container
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text>완료</Text>
      </Container>
    </>
  );
};

export default withNavigation(CompleteLink);
