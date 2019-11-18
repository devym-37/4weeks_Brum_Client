import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import PropTypes from "prop-types";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props => props.theme.mainColor};
  padding: 14px 10px;
  width: ${constants.width - 150};
  margin: 0px 50px;
  border-radius: 4px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const MainButton = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Container>
      <Text>{text}</Text>
    </Container>
  </Touchable>
);

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default MainButton;
