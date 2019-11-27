import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import constants from "../../constants";
import ModalDropdown from "react-native-modal-dropdown";
import map from "lodash.map";
import findKey from "lodash.findkey";
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

// const arrayOfCampus = constants.campus.map(obj => obj.kor);

export default withNavigation(({ navigation }) => {
  const [campus, setCampus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const arrayOfCampus = map(constants.campus, obj => obj.kor);
  const getCampusName = async () => {
    const selectedCampus = await AsyncStorage.getItem("campus");
    setCampus(constants.campus[selectedCampus].kor);
  };

  const handleSelect = async e => {
    const reselectedCampus = arrayOfCampus[e];
    setCampus(reselectedCampus);
    const engCampus = findKey(
      constants.campus,
      obj => obj.kor === reselectedCampus
    );
    await AsyncStorage.setItem("campus", engCampus);
    navigation.push("Home", { campus: engCampus });
  };

  useEffect(() => {
    getCampusName();
  }, []);

  return (
    <Touchable>
      <Container>
        {campus && (
          <Touchable>
            <TitleContainer>
              <ModalDropdown
                options={arrayOfCampus}
                defaultValue={campus}
                style={{ paddingLeft: 12 }}
                onSelect={handleSelect}
                dropdownStyle={{
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingTop: 2,
                  paddingBottom: 2
                }}
                dropdownTextStyle={{
                  fontSize: 17,
                  color: "#212529"
                }}
                textStyle={{
                  fontSize: 18,
                  paddingLeft: 8,
                  paddingRight: 0,
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontWeight: "600",
                  color: "#212529"
                }}
              />
              {/* <Text>{campus}</Text> */}
              <AntDesign
                name="down"
                size={12}
                style={{ color: "#212529", marginLeft: 4, marginTop: 1 }}
              />
            </TitleContainer>
          </Touchable>
        )}
      </Container>
    </Touchable>
  );
});
