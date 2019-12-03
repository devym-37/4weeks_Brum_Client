import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-left: 15;
`;
export default withNavigation(({ navigation }) => (
  <>
    <Container onPress={() => navigation.navigate("LoggedOutBottomNavigation")}>
      <AntDesign name="close" size={25} style={{ paddingLeft: 15 }} />
    </Container>
  </>
));
