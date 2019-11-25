import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
// const Container = styled.View`
//   justify-content: flex-start;
//   align-items: flex-start;
// `;
const View = styled.View`
  justify-content: center;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;
const Divider = styled.View`
  width: ${constants.width - 30};

  height: 1;
  background-color: ${props => props.theme.lightGreyColor};
`;

const PickerContainer = styled.View`
  width: ${constants.width - 30};
  padding: 22px 0;

  background-color: white;
  font-size: 17;
`;
const Text = styled.Text`
  color: ${props => props.color};
  font-size: 17;
`;

const Picker = ({
  navigation,
  text,
  onPress,
  isUnderline = true,
  isRightArrow = true,
  color = "#d5dae0",
  ...rest
}) => {
  return (
    <Touchable onPress={onPress}>
      <View>
        <PickerContainer {...rest}>
          <Container>
            <Text color={color}>{text}</Text>
            {isRightArrow && (
              <AntDesign name="right" size={14} style={{ color: "#1D2025" }} />
            )}
          </Container>
        </PickerContainer>
        {isUnderline && <Divider />}
      </View>
    </Touchable>
  );
};

export default withNavigation(Picker);
