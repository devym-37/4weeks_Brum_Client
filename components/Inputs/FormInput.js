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
  background-color: ${props =>
    props.dividerColor ? props.dividerColor : props.theme.lightGreyColor};
`;

const TextInput = styled.TextInput`
  width: ${props => constants.width - props.width};
  padding: 20px 0;
  color: ${props => (props.color ? props.color : "#22252a")};
  background-color: white;
  font-size: 17;

  /* ::placeholder {
    color: #d5dae0;
  } */
`;

const FormInput = ({
  width = 30,
  dividerWidth = 30,
  placeholder,
  children,
  onChange,
  color = "#22252a",
  isUnderline = true,
  dividerColor,
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
          color={color}
          {...rest}
        />
        {children}
      </InputContainer>
      {isUnderline && (
        <Divider dividerWidth={dividerWidth} deviderColor={dividerColor} />
      )}
    </>
  );
};

export default FormInput;
