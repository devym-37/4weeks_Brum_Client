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
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  authCapitalize = "none"
}) => (
  <Container>
    <TextInput
      keyboardType={keyboardType}
      authCapitalize={authCapitalize}
      placeholder={placeholder}
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
  authCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"])
};

export default AuthInput;
