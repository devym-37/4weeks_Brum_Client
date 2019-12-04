import React, { useState } from "react";
import styled from "styled-components";
import { Picker, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Header } from "react-native-elements";
import findKey from "lodash.findkey";
import MainButton from "../../components/Buttons/MainButton";
import constants from "../../constants";
import { campusSaver } from "../../redux/actions/campusActions";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;
const ButtonContainer = styled.TouchableOpacity``;
const Button = styled.View``;
const ButtonText = styled.Text``;

const SelectCampus = ({ navigation, ...props }) => {
  const [campus, setCampus] = useState("한양대");

  const handleNextButton = async () => {
    if (campus) {
      // console.log(`constants.campus`, constants.campus);
      const engCampus = findKey(constants.campus, obj => {
        return obj.kor === campus;
      });
      // console.log(engCampus);
      props.reduxCampus(engCampus);
      await AsyncStorage.setItem("campus", engCampus);
    }
    navigation.navigate("Home");
  };
  return (
    <>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "대학캠퍼스 선택",
          style: { color: "#000", fontSize: 17, fontWeight: "500" }
        }}
        containerStyle={{
          backgroundColor: "#FEFFFF",
          justifyContent: "space-around",
          borderBottomColor: "#CDCDCD"
        }}
      />
      <View>
        {/* <Text>Select Campus</Text> */}
        <Picker
          selectedValue={campus}
          style={{ height: 360, width: constants.width - 50 }}
          onValueChange={(itemValue, itemIndex) => setCampus(itemValue)}
        >
          <Picker.Item label="한양대" value="한양대" />
          <Picker.Item label="서울대" value="서울대" />
          <Picker.Item label="연세대" value="연세대" />
          <Picker.Item label="이화여대" value="이화여대" />
        </Picker>

        <MainButton text={"다음"} width={50} onPress={handleNextButton} />
      </View>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxCampus: campus => dispatch(campusSaver(campus))
  };
};

export default connect(null, mapDispatchToProps)(SelectCampus);
