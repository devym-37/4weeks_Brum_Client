import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { serverApi } from "../../../components/API";

import FormInput from "../../../components/Inputs/FormInput";
import RoutePicker from "../../../components/Pickers/RoutePicker";
import Loader from "../../../components/Loader";

import { AntDesign } from "@expo/vector-icons";
import { utils } from "react-native-gifted-chat";
import {
  nicknameSaver,
  majorSaver,
  introductionSaver
} from "../../../redux/actions/mypageActions";

const Container = styled.View`
  align-items: center;
  padding: 0 40px;
  margin-top: 50;
`;

const ScoreLabel = styled.Text`
  color: #737b84;
  /* padding-right: 10; */
  font-size: 13;
  margin-top: 2;
  font-weight: 400;
`;

const UserScore = styled.Text`
  color: ${props => props.color};
  margin-top: -4;
  font-weight: 700;
  font-size: 20;
`;

const ScoreContainer = styled.View`
  margin-top: 10;
  flex-direction: row;
  justify-content: center;
`;

const TotalScore = styled.Text`
  font-size: 13;
  font-weight: 300;
`;

const UserProfileScreen = ({ navigation, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState();
  const [introduction, setIntroduction] = useState(null);
  const [major, setMajor] = useState(null);
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [color, setColor] = useState("#757575");
  const preLoad = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const request = await serverApi.user(userToken);
      console.log(`유저프로필 : `, request);
      if (request.data.isSuccess) {
        setData({ ...request.data.data });
        let { nickname, major, introduction, getScore } = request.data.data;
        setNumOfReviews(getScore.length);
        // setNickname(nickname);
        props.reduxNickname(nickname);
        let score = getScore.length > 0 ? utils.avgOfScores(getScore) : 0;
        setScore(score);
        // let color =  colors&& utils.scoreColorPicker(score);
        // setColor(color);
        // setMajor(major);
        props.reduxMajor(major);
        // setIntroduction(introduction);
        props.reduxIntroduction(introduction);
      } else {
        Alert.alert("일시 오류", "잠시후 다시 시도해주세요");
      }
    } catch (e) {
      console.log(`Can't get the data of user's profile. Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={{ flex: 1 }}>
        <Container>
          {loading && <Loader />}
          <Image
            source={{ uri: data && data.image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20
            }}
          />
          <ScoreLabel>매너 점수</ScoreLabel>
          <ScoreContainer>
            <AntDesign
              name={
                score > 3.4
                  ? "smileo"
                  : score > 2.4
                  ? "meh"
                  : score === 0
                  ? "smileo"
                  : "frowno"
              }
              size={32}
              style={{ color, marginRight: 8, marginTop: -6 }}
            />
            <UserScore color={color}>{score === 0 ? "-" : score}</UserScore>
            <TotalScore>{` / 5.0 (${numOfReviews}개)`}</TotalScore>
          </ScoreContainer>

          <FormInput
            // width={50}
            // dividerWidth={50}
            value={props.nickname}
            maxLength={7}
            onChange={value => props.reduxNickname(value)}
          />
          <FormInput
            // width={50}
            // dividerWidth={50}
            value={data && data.phone}
            editable={false}
            color={"#BCBCBC"}
          />
          <RoutePicker
            text="비밀번호 재설정하기"
            color="#22252A"
            onPress={() =>
              navigation.navigate("VerifyPhone", {
                reset: true,
                myProfile: true
              })
            }
          />

          {data &&
            (data.university ? (
              <>
                <FormInput
                  value={data.university}
                  editable={false}
                  color={"#BCBCBC"}
                />
                <FormInput
                  placeholder="학과"
                  value={props.major}
                  // onChange={value => setMajor(major)}
                  onChange={value => props.reduxMajor(value)}
                />
              </>
            ) : (
              <>
                <RoutePicker
                  text="학교 인증하기"
                  color="#22252a"
                  onPress={() => navigation.navigate("VerifyCampusNavigation")}
                />
                <FormInput
                  placeholder="나의 한마디"
                  value={props.introduction}
                  // onChange={value => setIntroduction(value)}
                  onChange={value => props.reduxIntroduction(value)}
                />
              </>
            ))}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    major: state.mypageReducer.major,
    nickname: state.mypageReducer.nickname,
    introduction: state.mypageReducer.introduction
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxNickname: nickname => dispatch(nicknameSaver(nickname)),
    reduxMajor: major => dispatch(majorSaver(major)),
    reduxIntroduction: introduction => dispatch(introductionSaver(introduction))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
