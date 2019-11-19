import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width - 150};
  padding: 10px;
  background-color: ${props => props.theme.greyColor};
  border: 1px solid ${props => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  authCapitalize = "none",
  onChange,
  returnKeyType = "done",
  secureTextEntry,
  onEndEditing = () => null
}) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      authCapitalize={authCapitalize}
      placeholder={placeholder}
      onEndEditing={onEndEditing}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      value={value}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  authCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onEndEditing: PropTypes.func
};

export default AuthInput;
