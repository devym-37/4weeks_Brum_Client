import React from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text``;
const SearchAddress = () => {
  return (
    <Container>
      <Text>주소 검색 스크린</Text>
    </Container>
  );
};

export default SearchAddress;
