import React from "react";
import styled from "styled-components";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  border: 1px solid
    ${props => (props.color ? props.color : props.theme.mainColor)};
  padding: 12px 10px;
  width: ${props => constants.width - props.width};
  /* margin: 0px 50px; */
  /* margin-top: 16px; */
  border-radius: 4px;
`;
const Text = styled.Text`
  color: ${props => (props.color ? "#22252A" : props.theme.mainColor)};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const GhostButton = ({ text, width = 150, color, onPress }) => (
  <Touchable onPress={onPress}>
    <Container width={width} color={color}>
      <Text color={color}>{text}</Text>
    </Container>
  </Touchable>
);

export default GhostButton;
