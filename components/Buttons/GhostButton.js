import React from "react";
import styled from "styled-components";
import styles from "../../styles";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  border: 1px solid
    ${props =>
      props.color
        ? props.color
        : props.disabled
        ? styles.inActiveColor
        : styles.mainColor};
  padding: 12px 10px;
  width: ${props => constants.width - props.width};
  /* margin: 0px 50px; */
  margin-top: ${props => `${props.marginTop}px`};
  margin-bottom: ${props => `${props.marginBottom}px`};
  margin-left: ${props => `${props.marginLeft}px`};
  margin-right: ${props => `${props.marginRight}px`};
  border-radius: 4px;
`;
const Text = styled.Text`
  color: ${props =>
    props.color
      ? "#22252A"
      : props.disabledText
      ? styles.inActiveColor
      : styles.mainColor};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const GhostButton = ({
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
  text,
  width = 50,
  color,
  onPress,
  loading = false,
  disabled = false
}) => (
  <Touchable disabled={disabled || loading} onPress={onPress}>
    <Container
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      width={width}
      color={color}
      disabled={disabled}
    >
      <Text disabledText={disabled} color={color}>
        {text}
      </Text>
    </Container>
  </Touchable>
);

export default GhostButton;
