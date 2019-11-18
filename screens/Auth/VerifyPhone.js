import React from "react";
import styled from "styled-components";
import AuthInput from "../../components/Inputs/AuthInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <AuthInput
      placeholder="휴대폰 번호(-없이 숫자만 입력)"
      value=""
      keyboardType="numeric"
    />
  </View>
);
