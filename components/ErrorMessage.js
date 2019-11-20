import React from "react";
// import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import constants from "../constants";

const Container = styled.View`
  width: ${constants.width - 150};

  margin-top: -10px;
  margin-bottom: 2px;
`;

const Text = styled.Text`
  color: ${props => props.theme.redColor};
`;

const ErrorMessage = ({ errorValue }) => (
  <Container>
    <Text>{errorValue}</Text>
  </Container>
);

export default ErrorMessage;
