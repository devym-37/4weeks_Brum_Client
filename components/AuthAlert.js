import React from "react";
import { Alert } from "react-native";
import { withNavigation } from "react-navigation";

const AuthAlert = ({ navigation }) => {
  return Alert.alert(
    null,
    "가입 또는 로그인이 필요합니다. 회원가입 및 로그인을 하시겠어요?",
    [
      {
        text: "회원가입",
        onPress: () => navigation.navigate("VerifyPhone")
      },
      {
        text: "취소",
        onPress: () => navigation.backTo(null),
        style: "cancel"
      },
      { text: "로그인", onPress: () => navigation.navigate("Login") }
    ],
    { cancelable: false }
  );
};

export default withNavigation(AuthAlert);
