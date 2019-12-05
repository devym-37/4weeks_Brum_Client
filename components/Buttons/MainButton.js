import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import styles from "../../styles";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props =>
    props.color !== "main"
      ? props.color
      : props.disabled
      ? styles.inActiveColor
      : props.theme.mainColor};
  padding: 14px 10px;
  width: ${props => constants.width - props.width};
  /* margin: 0px 50px; */
  margin-left: ${props => `${props.marginLeft}px`};
  border-radius: 4px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const MainButton = ({
  className = "",
  color = "main",
  disabled = false,
  text,
  width = 50,
  onPress,
  marginLeft = 0,
  loading = false
}) => (
  <Touchable disabled={loading || disabled} onPress={onPress}>
    <Container
      disabled={disabled}
      color={color}
      width={width}
      marginLeft={marginLeft}
    >
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

// MainButton.propTypes = {
//   text: PropTypes.string.isRequired,
//   onPress: PropTypes.func.isRequired,
//   loading: PropTypes.bool,
//   width: PropTypes.number,
//   color: PropTypes.string
// };

export default MainButton;
