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
import { phoneSaver } from "../../redux/actions/otpActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Confirm = props => {
  const otpInput = useInput("");
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
    props.navigation.navigate("Signup");
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    otp: state.otpReducer.otp
  };
};

// Exports
export default connect(mapStateToProps)(Confirm);
