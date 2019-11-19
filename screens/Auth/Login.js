import React, { useState } from "react";
import styled from "styled-components";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage
} from "react-native";
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { connect } from "react-redux";
import { serverApi } from "../../components/API";
import axios from "axios";

// Imports: Redux Actions
import { login } from "../../redux/actions/authActions";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const LogIn = props => {
  let Id = useInput("");
  let Pw = useInput("");
  const [loading, setLoading] = useState(false);

  const handleFetchApi = async (val1, val2) => {
    const value1 = val1.value;
    const value2 = val2.value;
    if (value1 === "" || value2 === "") {
      console.log(val1, val2);

      return Alert.alert("휴대전화 혹은 비밀번호가 올바르지 않습니다");
    } else if (!/^\d{11}$/.test(value1)) {
      return Alert.alert("휴대전화번호가 유효하지 않습니다");
    }

    try {
      setLoading(true);
      Alert.alert("로그인되었습니다.");
      const requestLogin = await serverApi.logIn(value1, value2);

      if (requestLogin.data.token !== false) {
        console.log(`requestLogin응답: `, requestLogin.data.token);

        await AsyncStorage.setItem("userToken", requestLogin.data.token);
        props.reduxLogin(true);
        props.navigation.navigate("HomeScreen");
      }
    } catch (error) {
      Alert.alert("로그인에 실패했습니다");
      console.log("로그인실패", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <AuthInput
        {...Id}
        placeholder="01000000000"
        keyboardType="numeric"
        returnKeyType="send"
      />
      <AuthInput
        {...Pw}
        secureTextEntry={true}
        placeholder="비밀번호입력"
        keyboardType="default"
        returnKeyType="send"
      />
      {console.log("sdfsdfafsdf", props.navigation)}
      <MainButton
        onPress={() => {
          handleFetchApi(Id, Pw);
        }}
        text="로그인"
      />
      <GhostButton
        onPress={() => {
          props.navigation.navigate("Signup");
        }}
        text="회원가입"
      />

      <GhostButton
        onPress={() => {
          props.navigation.navigate("ResetPw");
        }}
        text="비밀번호 재설정"
      />
    </View>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
