import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;
const CategoryFilter = () => {
  return (
    <Container>
      <Text>카테고리 선택 스크린</Text>
    </Container>
  );
};

export default CategoryFilter;
