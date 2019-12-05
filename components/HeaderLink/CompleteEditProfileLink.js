import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AsyncStorage, Alert } from "react-native";
import { serverApi } from "../API";
import { refreshMaker } from "../../redux/actions/refreshActions";

const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-right: 15;
`;

const CompleteLink = ({ navigation, ...props }) => {
  const handleSubmit = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      const profileContents = {
        nickname: props.nickname,
        major: props.major,
        introduction: props.introduction
      };
      // console.log(`orderContents:`, orderContents.desiredArrivalTime);
      const requestEdit = await serverApi.editProfile(
        userToken,
        profileContents
      );
      console.log(`프로필 수정: `, requestEdit);
    } catch (e) {
      console.log(`Can't post order form on server. Error : ${e}`);
    } finally {
      props.reduxRefresh();
      navigation.goBack(null);
    }
  };
  return (
    <>
      <Container onPress={handleSubmit}>
        <Text>완료</Text>
      </Container>
    </>
  );
};
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    nickname: state.mypageReducer.nickname,
    introduction: state.mypageReducer.introduction,
    major: state.mypageReducer.major
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reduxRefresh: () => dispatch(refreshMaker())
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(CompleteLink)
);
