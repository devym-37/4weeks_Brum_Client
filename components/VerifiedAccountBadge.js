import React from "react";
import styled from "styled-components";
import { Image } from "react-native";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  color: #858e96;
  font-size: 15;
`;
const VerifiedAccountBadge = ({ campus = "한양대" }) => {
  return (
    <Container>
      <Image
        source={require("../assets/verified-account.png")}
        style={{ width: 18, height: 18, marginRight: 4 }}
      />
      <Text>{`${campus}`}</Text>
    </Container>
  );
};

export default VerifiedAccountBadge;
