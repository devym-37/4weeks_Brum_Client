import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  /* margin-bottom: 10px; */
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
  width: ${props => constants.width - props.width};
  padding: 22px 0px;
  background-color: white;
  font-size: 17px;

  ::placeholder {
    color: #d5dae0;
  }
`;

const FormInput = ({
  width = 30,
  placeholder,
  children,
  isUnderline = true,
  ...rest
}) => {
  return (
    <>
      <InputContainer>
        <TextInput
          width={width}
          placeholderTextColor="#d5dae0"
          placeholder={placeholder}
          {...rest}
        ></TextInput>
        {children}
      </InputContainer>
      {isUnderline && <Divider />}
    </>
  );
};

export default withNavigation(FormInput);
