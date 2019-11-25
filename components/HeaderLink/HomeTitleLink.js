import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import findKey from "lodash.findkey";
import constants from "../../constants";

const Touchable = styled.TouchableOpacity``;
const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Container = styled.View`
  /* padding-bottom: 1; */
`;
const Text = styled.Text`
  font-size: 17;
  padding-left: 15;
  font-weight: 600;
  color: #212529;
`;
export default withNavigation(({ navigation }) => {
  const [campus, setCampus] = useState(null);
  const getCampusName = async () => {
    const selectedCampus = await AsyncStorage.getItem("campus");
    setCampus(constants.campus[selectedCampus].kor);
  };

  useEffect(() => {
    getCampusName();
  }, []);

  return (
    <Touchable onPress={() => console.log(`홈화면 캠퍼스 이름 클릭`)}>
      <Container>
        {campus && (
          <TitleContainer>
            <Text>{campus}</Text>
            <AntDesign
              name="down"
              size={12}
              style={{ color: "#212529", marginLeft: 4 }}
            />
          </TitleContainer>
        )}
      </Container>
    </Touchable>
  );
});
