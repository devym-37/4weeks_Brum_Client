import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default function RequestScreen() {
  return (
    <Container>
      <Text>NewOrderScreen</Text>
    </Container>
  );
}
