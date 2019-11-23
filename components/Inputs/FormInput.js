import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;
const Divider = styled.View`
  width: ${constants.width - 30};
  padding: 0 20px;

  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const TextInput = styled.TextInput`
  width: ${constants.width};
  padding: 25px 15px;
  background-color: white;
  font-size: 17px;
  ::placeholder {
    color: #d5dae0;
  }
`;

const FormInput = ({ placeholder, ...rest }) => {
  return (
    <Container>
      <TextInput placeholder={placeholder} {...rest}></TextInput>
      <Divider />
    </Container>
  );
};

export default withNavigation(FormInput);
