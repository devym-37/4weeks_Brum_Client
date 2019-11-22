import React, { useState } from "react";
import styled from "styled-components";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { connect } from "react-redux";
import { serverApi } from "../../components/API";

// Imports: Redux Actions
import { login } from "../../redux/actions/authActions";
import { phoneSaver } from "../../redux/actions/phoneActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const LogIn = props => {
  let Id = useInput(`${props.phone ? props.phone : ""}`);
  let Pw = useInput("");
  const [loading, setLoading] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("ios-eye-off");

  const handlePasswordVisibility = () => {
    if (passwordIcon === "ios-eye") {
      setPasswordIcon("ios-eye-off");
      setPasswordVisibility(true);
    } else {
      setPasswordIcon("ios-eye");
      setPasswordVisibility(false);
    }
  };

  const handleFetchApi = async (val1, val2) => {
    const value1 = val1.value;
    const value2 = val2.value;

    if (value1 === "" || value2 === "") {
      // console.log(val1, val2);

      return Alert.alert("휴대전화 혹은 비밀번호를 입력해주세요");
    } else if (!/^\d{11}$/.test(value1)) {
      return Alert.alert("휴대전화번호가 유효하지 않습니다");
    }

    try {
      setLoading(true);
      // 아이디(휴대전화번호)가 DB에 존재하는지 확인
      const verifyId = await serverApi.verifyPhoneNumber(value1);
      console.log("번호@", verifyId);
      // 유저가 아닐 경우, 유저가 입력한 휴대전화번호를 저장한 채 회원가입 페이지로 이동
      if (verifyId.data.isSuccess) {
        props.reduxPhone(value1); //
        Alert.alert("가입되지 않은 휴대전화번호입니다");
        props.navigation.navigate("VerifyPhone");

        // 유저일 경우, 로그인 프로세스 진행
      } else {
        const requestLogin = await serverApi.logIn(value1, value2);
        console.log("아이디검증됨", requestLogin.data);

        if (requestLogin.data.token !== false) {
          // console.log(`requestLogin응답: `, requestLogin.data.token);
          Alert.alert("로그인되었습니다.");
          await AsyncStorage.setItem("userToken", requestLogin.data.token);
          props.reduxLogin(true);
          props.navigation.navigate("BottomNavigation");
        }
      }
    } catch (error) {
      console.log("로그인실패", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <AuthInput
        {...Id}
        placeholder="휴대폰 번호(-없이 숫자만 입력)"
        keyboardType="numeric"
        returnKeyType="next"
      />

      <AuthInput
        {...Pw}
        secureTextEntry={passwordVisibility}
        placeholder="비밀번호 입력"
        keyboardType="default"
        returnKeyType="send"
      >
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Ionicons
            style={{ marginLeft: -34 }}
            name={passwordIcon}
            size={22}
            color="rgb(230, 230, 230)"
          />
        </TouchableOpacity>
      </AuthInput>
      {/* {console.log("sdfsdfafsdf", props.navigation)} */}
      <MainButton
        onPress={() => {
          handleFetchApi(Id, Pw);
        }}
        text="로그인"
      />
      <GhostButton
        onPress={() => {
          props.navigation.navigate("VerifyPhone");
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
    loggedIn: state.authReducer.loggedIn,
    phone: state.phoneReducer.phone
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxLogin: trueFalse => dispatch(login(trueFalse)),
    reduxPhone: phone => dispatch(phoneSaver(phone))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
