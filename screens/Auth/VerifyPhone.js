// Imports: Dependencies
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

// Imports: Custom components
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import MainButton from "../../components/Buttons/MainButton";

// Imports: API
import { toastApi, serverApi } from "../../components/API";

// Imports: Redux Actions
import { otpSaver, otpMaker } from "../../redux/actions/otpActions";
import { phoneSaver } from "../../redux/actions/phoneActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const VerifyPhone = props => {
  const phoneNumberInput = useInput("");
  const [loading, setLoading] = useState(false);

  const handleRequestSMS = async () => {
    const { value } = phoneNumberInput;
    if (value === "") {
      return Alert.alert("휴대전화번호를 입력해주세요");
    } else if (!/^\d{11}$/.test(value)) {
      return Alert.alert("휴대전화번호가 유효하지 않습니다");
    }

    try {
      setLoading(true);

      const verifyId = await serverApi.verifyPhoneNumber(value);

      if (verifyId.data.isSuccess) {
        props.reduxPhone(value);

        const otp = props.otp;

        Alert.alert("인증번호가 문자로 전송됐습니다. (최대 20초 소요)");
        const requestSMS = await toastApi.postSMS(otp, value);

        props.navigation.navigate("Confirm");
      } else {
        Alert.alert("이미 가입된 번호입니다");
        props.navigation.navigate("Login");
      }
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
          {...phoneNumberInput}
          placeholder="휴대폰 번호(-없이 숫자만 입력)"
          keyboardType="numeric"
          returnKeyType="send"
        />
        <MainButton
          loading={loading}
          onPress={handleRequestSMS}
          text="인증문자 받기"
        />
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
    reduxOTP: otp => dispatch(otpSaver(otp)),
    reduxPhone: phone => dispatch(phoneSaver(phone))
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);
