// Imports: Dependencies
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage
} from "react-native";
// Imports: Custom components
import MainButton from "../../../components/Buttons/MainButton";
import AuthInput from "../../../components/Inputs/AuthInput";
import useInput from "../../../hooks/useInput";
// Imports: API
import { serverApi } from "../../../components/API";

// Imports: Redux Actions
import { otpSaver, otpMaker } from "../../../redux/actions/otpActions";
import { phoneSaver } from "../../../redux/actions/otpActions";

import utils from "../../../utils";
import { refreshMaker } from "../../../redux/actions/refreshActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Touchable = styled.TouchableOpacity``;

const TourLink = styled.View`
  margin-top: 20;
`;

const TourLinkText = styled.Text`
  color: ${props => props.theme.greyColor};
  font-weight: 400;
`;

const ConfirmEmail = ({ navigation, ...props }) => {
  // console.log(`Confirm props: `, props.navigation.getParam("reset"));
  const otpInput = useInput("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { value } = otpInput;
    const userToken = await AsyncStorage.getItem("userToken");
    if (value === "") {
      return Alert.alert("인증번호를 입력해주세요");
    } else if (value.length < 6) {
      return Alert.alert("인증번호가 일치하지 않습니다");
    } else {
      const email = navigation.getParam("email");
      const university = utils.formatUniversity(email);
      const requestConfirm = await serverApi.confirmEmail(
        value,
        university,
        userToken
      );
      console.log(`requestConfirm: `, requestConfirm);
      if (requestConfirm.data.isSuccess) {
        Alert.alert("인증완료", "학교인증이 완료되었습니다");
        props.reduxRefresh();
        navigation.navigate("Mypage", { university: university });
      } else {
        Alert.alert(
          "인증실패",
          "인증번호가 일치하지 않습니다. 다시 입력해주세요"
        );
      }
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const email = navigation.getParam("email");
      console.log(`email: `, email);
      const userToken = await AsyncStorage.getItem("userToken");
      const requestEmail = await serverApi.verifyEmail(email, userToken);
      if (requestEmail.data.isSuccess) {
        Alert.alert(
          "인증메일 전송완료",
          "입력하신 메일주소의 메일함을 확인해주세요"
        );
      } else {
        Alert.alert("일시 오류", "죄송합니다. 잠시후 다시 시도해주세요");
      }
    } catch (e) {
      console.log(`Cant' resend email. error message: ${e} `);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...otpInput}
          width={40}
          placeholder="인증번호 입력"
          keyboardType="numeric"
          returnKeyType="send"
        />
        <MainButton width={40} onPress={handleSubmit} text="확인" />
        <Touchable onPress={handleResend}>
          <TourLink>
            <TourLinkText>인증메일 다시 받기</TourLinkText>
          </TourLink>
        </Touchable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    otp: state.otpReducer.otp,
    phone: state.phoneReducer.phone
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Create 4-digits OTP
    reduxRefresh: () => dispatch(refreshMaker()),
    reduxNewOTP: () => dispatch(otpMaker()),
    reduxOTP: otp => dispatch(otpSaver(otp))
  };
};
// Exports

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
