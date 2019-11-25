import React from "react";
import styled from "styled-components";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  border: 1px solid ${props => props.theme.mainColor};
  padding: 14px 0;
  padding-top: ${props => props.height};
  padding-bottom: ${props => props.height};
  width: ${props => constants.width - props.width};
  margin: 0px 50px;
  margin-top: 16px;
  border-radius: 4px;
`;
const Text = styled.Text`
  color: ${props => props.theme.mainColor};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const GhostButton = ({ text, width = 150, height = 10, onPress }) => (
  <Touchable onPress={onPress}>
    <Container width={width} height={height}>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);

export default GhostButton;
