import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  align-items: flex-start;
`;

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;
const Divider = styled.View`
  width: ${props => constants.width - props.dividerWidth};

  height: 1;
  background-color: ${props => props.theme.lightGreyColor};
`;

const TextInput = styled.TextInput`
  width: ${props => constants.width - props.width};
  padding: 22px 0;
  background-color: white;
  font-size: 17;

  ::placeholder {
    color: #d5dae0;
  }
`;

const FormInput = ({
  width = 30,
  dividerWidth = 30,
  placeholder,
  children,
  onChange,
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
          onChangeText={onChange}
          {...rest}
        />
        {children}
      </InputContainer>
      {isUnderline && <Divider dividerWidth={width} />}
    </>
  );
};

export default withNavigation(FormInput);
