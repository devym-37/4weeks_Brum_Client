import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

// const Container = styled.View`
//   justify-content: center;
//   align-items: center;
//   padding: 0 10px;
// `;
const Container = styled.View`
  /* margin-bottom: 10px; */
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputContainer = styled.View`
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  background-color: #fff;
`;
const Divider = styled.View`
  width: ${constants.width - 30};
  /* padding: 0 20px; */
  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const TextInput = styled.TextInput`
  width: ${constants.width - 30};
  padding: 22px 0px;
  background-color: white;
  font-size: 17px;
  ::placeholder {
    color: #d5dae0;
  }
`;

const FormInput = ({ placeholder, children, isUnderline = true, ...rest }) => {
  return (
    <>
      <InputContainer>
        <TextInput placeholder={placeholder} {...rest}></TextInput>
        {children}
      </InputContainer>
      {isUnderline && <Divider />}
    </>
  );
};

export default withNavigation(FormInput);
