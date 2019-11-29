// Imports: Dependencies
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
// Imports: Custom components
import MainButton from "../../components/Buttons/MainButton";
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
// Imports: API
import { toastApi, serverApi } from "../../components/API";

// Imports: Redux Actions
import { otpSaver, otpMaker } from "../../redux/actions/otpActions";
import { phoneSaver } from "../../redux/actions/otpActions";

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

const Confirm = props => {
  // console.log(`Confirm props: `, props.navigation.getParam("reset"));
  const otpInput = useInput("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { value } = otpInput;
    // console.log(`유저 입력: `, value);
    // console.log(`props.otp: `, props.otp);
    if (value === "") {
      return Alert.alert("인증번호를 입력해주세요");
    } else if (value !== props.otp) {
      return Alert.alert("인증번호가 일치하지 않습니다");
    }
    // console.log("인증번호 일치");
    // const selectedPage = await AsyncStorage.getItem("page");
    // console.log("선택한 페이지", selectedPage);
    if (props.navigation.getParam("reset")) {
      props.navigation.navigate("ResetPw");
    } else {
      props.navigation.navigate("Signup");
    }
  };

  const handleResend = async () => {
    try {
      props.reduxNewOTP();
      const otp = props.otp;
      setLoading(true);
      const phone = props.phone;

      Alert.alert("인증번호가 문자로 전송됐습니다. (최대 20초 소요)");
      const requestSMS = await toastApi.postSMS(otp, phone);
    } catch (e) {
      console.log(`Cant' fetch toast api. error message: ${e} `);
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...otpInput}
          placeholder="인증문자 입력"
          keyboardType="numeric"
          returnKeyType="send"
        />
        <MainButton onPress={handleSubmit} text="확인" />
        <Touchable onPress={handleResend}>
          <TourLink>
            <TourLinkText>인증문자 다시 받기</TourLinkText>
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
    reduxNewOTP: () => dispatch(otpMaker()),
    reduxOTP: otp => dispatch(otpSaver(otp))
  };
};
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
