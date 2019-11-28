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

const NewOrderLink = ({ navigation }) => {
  return (
    <>
      <Container
        onPress={() => {
          navigation.navigate("NewOrder");
        }}
      >
        <AntDesign
          name="form"
          size={22}
          style={{ color: "#666", marginRight: 15, marginTop: 1 }}
        />
      </Container>
    </>
  );
};

export default withNavigation(NewOrderLink);
