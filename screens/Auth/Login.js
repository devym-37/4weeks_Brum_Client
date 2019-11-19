import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from  "../../components/Buttons/GhostButton"
import { connect } from "react-redux";


// Imports: Redux Actions
import { login } from "../../redux/actions/authActions";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const LogIn = (props) => {

  return (
<View>
    <AuthInput
          placeholder="email@email.com"
          keyboardType="email-address"
          returnKeyType="send"
        />
        <AuthInput
          placeholder="비밀번호입력"
          keyboardType="default"
          returnKeyType="send"
        />
        {console.log("sdfsdfafsdf",props.navigation)}
        <MainButton
          onPress={
            () => 
              {props.reduxLogin(true)
              props.navigation.navigate("HomeScreen")}
           }
          text="로그인"
        />
        <GhostButton
          onPress={
            () => 
              {
              props.navigation.navigate("Signup")}
           }
          text="회원가입"
        />

        <GhostButton
          onPress={
            () => 
              {
              props.navigation.navigate("ResetPw")}
           }
          text="비밀번호 재설정"
        />
  </View>
  )
  
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    loggedIn: state.authReducer.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    
    // Login
    reduxLogin: trueFalse => dispatch(login(trueFalse))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogIn)