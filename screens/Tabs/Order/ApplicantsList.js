import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default function ApplicantsList() {
  return (
    <Container>
      <Text>지원자리스트</Text>
    </Container>
  );
}
