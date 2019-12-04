import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import styled from "styled-components";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";
import { connect } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";
import { campusSaver } from "../../redux/actions/campusActions";
import map from "lodash.map";
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

// const arrayOfCampus = constants.campus.map(obj => obj.kor);

const HomTitleLink = ({ navigation, ...props }) => {
  // const asyncCampus = AsyncStorage.getItem("campus");

  const [campus, setCampus] = useState("한양대");
  const [refreshing, setRefreshing] = useState(false);
  const arrayOfCampus = map(constants.campus, obj => obj.kor);

  const getCampusName = async () => {
    const asyncCampus = await AsyncStorage.getItem("campus");
    let selectedCampus = props.campus
      ? props.campus
      : asyncCampus
      ? asyncCampus
      : "hanyang";
    let engCampus = selectedCampus && constants.campus[selectedCampus].kor;
    setCampus(engCampus);
  };

  const handleSelect = e => {
    const reselectedCampus = arrayOfCampus[e];
    setCampus(reselectedCampus);
    const engCampus = findKey(
      constants.campus,
      obj => obj.kor === reselectedCampus
    );
    // await AsyncStorage.setItem("campus", engCampus);
    props.reduxCampus(engCampus);
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
};

const mapStateToProps = state => {
  return {
    campus: state.campusReducer.campus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxCampus: campus => dispatch(campusSaver(campus))
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(HomTitleLink)
);
