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
import { login } from "../../redux/actions/authActions";
import { serverApi } from "../../components/API";
import { store, persistor } from "../../redux/store/store";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required("성함을 입력해주세요")
    .min(2, "성함은 최소 2글자 이상 입력해주세요"),
  password: Yup.string()
    .label("Password")
    .required("비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6글자 이상 입력해주세요"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("확인을 위해 비밀번호를 한번더 입력해주세요"),
  age: Yup.string().min(4, "출생연도는 4글자 입력해주세요. 예) 0000년도"),

  createdOn: Yup.date().default(function() {
    return new Date();
  })
});

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const ResetPw = props => {
  const pwInput1 = useInput("");
  const pwInput2 = useInput("");
  const [loading, setLoading] = useState(false);

  const handlePw = async () => {
    const value1 = pwInput1.value;
    const value2 = pwInput2.value;

    if (value1 === "" || value2 === "") {
      return Alert.alert("비밀번호를 입력해주세요");
    } else if (value1 !== value2) {
      Alert.alert(
        "비밀번호 오류",
        "비밀번호를 정확하게 입력해 주세요",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      try {
        const phone = await store.getState().phoneReducer.phone;
        const usertoken = await AsyncStorage.getItem("userToken");
        console.log("리셋이 완료되었나", phone);

        if (phone) {
          const result = await serverApi.password(phone, value1, usertoken);
        }
        Alert.alert(
          "성공",
          "비밀번호가 성공적으로 변경되었습니다",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        props.reduxLogin(false);

        props.navigation.navigate("Login");
      } catch (error) {
        console.log("resetpwerror", error);
      }
    }
  };
  return (
    <View>
      <AuthInput
        {...pwInput1}
        placeholder="비밀번호입력"
        keyboardType="default"
        returnKeyType="send"
      />
      <AuthInput
        {...pwInput2}
        placeholder="비밀번호재입력"
        keyboardType="default"
        returnKeyType="send"
      />
      <MainButton onPress={handlePw} text="비밀번호 재설정" />
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
export default connect(mapStateToProps, mapDispatchToProps)(ResetPw);
