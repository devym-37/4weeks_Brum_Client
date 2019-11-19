import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width - 150};
  padding: 12px 10px;
  background-color: white;
  border: 1px solid ${props => props.theme.darkGreyColor};
  border-radius: 2px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "done",
  secureTextEntry = false,
  onEndEditing = () => null,
  editable = true,
  onBlur = () => null,
  ...rest
}) => (
  <Container>
    <TextInput
      {...rest}
      editable={editable}
      onChangeText={onChange}
      keyboardType={keyboardType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onEndEditing={onEndEditing}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      value={value}
      secureTextEntry={secureTextEntry}
      onBlur={onBlur}
    />
  </Container>
);

// AuthInput.propTypes = {
//   placeholder: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   keyboardType: PropTypes.oneOf([
//     "default",
//     "number-pad",
//     "decimal-pad",
//     "numeric",
//     "email-address",
//     "phone-pad"
//   ]),
//   autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
//   onChange: PropTypes.func.isRequired,
//   returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
//   onEndEditing: PropTypes.func,
//   secureTextEntry: PropTypes.bool,
//   editable: PropTypes.bool,
//   onBlur: PropTypes.func
// };

export default AuthInput;
