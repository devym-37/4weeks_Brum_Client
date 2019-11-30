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
import { resetCounter } from "../../redux/actions/passwordErrorCountActions";
import Fire from "../../screens/chat/Fire";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .label("Password")
    .required("비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6글자 이상 입력해주세요"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("확인을 위해 비밀번호를 한번더 입력해주세요"),

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
        setLoading(true);
        const phone = await store.getState().phoneReducer.phone;
        const usertoken = await AsyncStorage.getItem("userToken");
        //console.log("리셋이 완료되었나", phone);

        if (phone) {
          const result = await serverApi.password(phone, value1, usertoken);

          console.log("비밀번호 리셋", result);

          //---firebase--///
          //Fire.shared.resetPassword(phone,value1)
        }
        Alert.alert(
          "성공",
          "비밀번호가 변경되었습니다",
          [{ text: "확인", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        props.reduxResetErrorCount();
        props.reduxLogin(false);

        props.navigation.navigate("Login");
      } catch (error) {
        console.log("resetpwerror", error);
      } finally {
        setLoading(true);
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
    reduxResetErrorCount: () => dispatch(resetCounter()),
    reduxLogin: trueFalse => dispatch(login(trueFalse))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPw);
