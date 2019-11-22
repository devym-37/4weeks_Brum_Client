import React, { useState } from "react";
import styled from "styled-components";
import { Picker, AsyncStorage } from "react-native";
import { Header } from "react-native-elements";
import MainButton from "../../components/Buttons/MainButton";
import constants from "../../constants";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;
const ButtonContainer = styled.TouchableOpacity``;
const Button = styled.View``;
const ButtonText = styled.Text``;

export default ({ navigation }) => {
  const [campus, setCampus] = useState("");

  const handleNextButton = () => {
    campus && AsyncStorage.setItem("campus", campus);
    navigation.navigate("BottomNavigation");
  };
  return (
    <>
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content"
        centerComponent={{
          text: "대학캠퍼스 선택",
          style: { color: "#000", fontSize: 16 }
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
          style={{ height: 360, width: 200 }}
          onValueChange={(itemValue, itemIndex) => setCampus(itemValue)}
        >
          <Picker.Item label="한양대" value="HYU" />
          <Picker.Item label="서울대" value="SNU" />
          <Picker.Item label="연세대" value="YSU" />
        </Picker>

        <MainButton text={"다음"} width={200} onPress={handleNextButton} />
      </View>
    </>
  );
};
