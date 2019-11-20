import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props =>
    props.color === "main" ? props.theme.mainColor : props.color};
  padding: 14px 10px;
  width: ${constants.width - 150};
  margin: 0px 50px 
  border-radius: 4px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const MainButton = ({ color = "main", text, onPress, loading = false }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container color={color}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  color: PropTypes.string
};

export default MainButton;
