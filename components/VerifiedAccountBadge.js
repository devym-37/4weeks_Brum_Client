import React from "react";
import styled from "styled-components";
import { Image } from "react-native";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  color: ${props => (props.color ? props.color : "#858e96")};
  font-size: ${props => (props.fontSize ? props.fontSize : 15)};
`;
const VerifiedAccountBadge = ({
  campus = "한양대",
  iconSize = 18,
  fontSize,
  color
}) => {
  return (
    <Container>
      <Image
        source={require("../assets/verified-account.png")}
        style={{ width: iconSize, height: iconSize, marginRight: 4 }}
      />
      <Text fontSize={fontSize} color={color}>{`${campus}`}</Text>
    </Container>
  );
};

export default VerifiedAccountBadge;
