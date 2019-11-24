import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";

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
  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const PickerContainer = styled.View`
  width: ${constants.width - 30};
  padding: 17px 0;
  background-color: white;
  font-size: 17px;
`;
const Text = styled.Text`
  color: ${props => props.color};
  font-size: 17px;
`;

const SelectPicker = ({
  navigation,
  text,
  onPress,
  isUnderline = true,
  isSelected = false,
  color = "#454545",
  ...rest
}) => {
  return (
    <Touchable onPress={onPress}>
      <View>
        <PickerContainer {...rest}>
          <Container>
            <Text color={isSelected ? "#F13564" : color}>{text}</Text>
            {isSelected && (
              <AntDesign name="check" size={20} style={{ color: "#F13564" }} />
            )}
          </Container>
        </PickerContainer>
        {isUnderline && <Divider />}
      </View>
    </Touchable>
  );
};

export default withNavigation(SelectPicker);
