import React, { useState, useEffect } from "react";
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
import firebase from "firebase";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import Fire from "../../screens/chat/Fire";
// Imports: Redux Actions
import { login } from "../../redux/actions/authActions";
import { phoneSaver } from "../../redux/actions/phoneActions";
import {
  increaseCounter,
  resetCounter
} from "../../redux/actions/passwordErrorCountActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ButtonContainer = styled.View`
  padding: 12px 0;
`;

const Text = styled.Text``;

const LogIn = props => {
  let Id = useInput(`${props.phone ? props.phone : ""}`);
  let Pw = useInput("");
  const [loading, setLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("ios-eye-off");
  const [pushtoken, setPushtoken] = useState(null);

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
      // console.log("번호@", verifyId);
      // 유저가 아닐 경우, 유저가 입력한 휴대전화번호를 저장한 채 회원가입 페이지로 이동
      if (verifyId.data.isSuccess) {
        props.reduxPhone(value1); //
        Alert.alert("가입되지 않은 휴대전화번호입니다");
        props.navigation.navigate("VerifyPhone");

        // 유저일 경우, 로그인 프로세스 진행
      } else if (props.errorCount === 5) {
        Alert.alert(
          `비밀번호 입력 가능 횟수를 초과했습니다. 비밀번호를 재설정해주세요.`
        );
      } else {
        const requestLogin = await serverApi.logIn(value1, value2, pushtoken);

        //////////////
        /*  return await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: {
            to: token,
            sound: "default",
            title: "Vroom",
            body: "메시지 간다 메시지 받아라"
          }
          
          this.notificationSubscription = Notifications.addListener(this.handleNotification);
     
        }).catch(err => {
          throw err;
        }); */

        console.log("아이디검증됨", requestLogin.data);

        if (requestLogin.data.token !== false) {
          // console.log(`requestLogin응답: `, requestLogin.data.token);
          // Alert.alert("로그인되었습니다.");
          await AsyncStorage.setItem("userToken", requestLogin.data.token);
          props.reduxLogin(true);
          console.log("토큰", requestLogin.data.token);
          /* firebase
            .auth()
            .signInWithEmailAndPassword(`${value1}@shoppossible.com`, value2);
 */
          // Fire.shared.signin(`${value1}@shoppossible.com`, value2);

          ////redux/////
          /*  await AsyncStorage.setItem("email", `${value1}@shoppossible.com`);
          await AsyncStorage.setItem("password", value2);
          ////

          const login = await AsyncStorage.getItem("email"); */
          //console.log("로그인했고 이메일 정보", login);
          /////-------redux?------//////
          const mypage = await serverApi.user(requestLogin.data.token);
          const { userId } = mypage.data.data;
          await AsyncStorage.setItem("userId", userId.toString());

          await Fire.shared.appendPushtoken(
            userId,
            pushtoken.slice(18, pushtoken.length - 1)
          );
          //////////////////////////////

          props.reduxResetErrorCount();
          props.navigation.navigate("BottomNavigation");
        } else {
          props.reduxErrorCount();
          // setErrorCount(errorCount + 1);
          Alert.alert(
            `비밀번호가 ${props.errorCount + 1}회 틀렸습니다. 남은횟수 : ${4 -
              props.errorCount}회`
          );
        }
      }
    } catch (error) {
      console.log("로그인실패", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedPage = async () => {
    // console.log("handle");
    //바꾸기
    return await AsyncStorage.setItem("page", "resetpw");
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    registerForPushNotificationsAsync();
  }, []);

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    console.log("푸쉬토큰");

    let token = await Notifications.getExpoPushTokenAsync();
    // Defined in following steps
    console.log("푸쉬토큰", token);
    setPushtoken(token);
    await AsyncStorage.setItem("pushToken", token);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          onSubmitEditing={Keyboard.dismiss}
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
        <ButtonContainer>
          <GhostButton
            onPress={() => {
              props.navigation.navigate("VerifyPhone");
            }}
            text="회원가입"
          />
        </ButtonContainer>
        <GhostButton
          onPress={() => {
            props.navigation.navigate("VerifyPhone", { reset: true });
            handleSelectedPage();
          }}
          text="비밀번호 재설정"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    loggedIn: state.authReducer.loggedIn,
    phone: state.phoneReducer.phone,
    errorCount: state.passwordErrorCountReducer.errorCount
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxErrorCount: () => dispatch(increaseCounter()),
    reduxResetErrorCount: () => dispatch(resetCounter()),
    reduxLogin: trueFalse => dispatch(login(trueFalse)),
    reduxPhone: phone => dispatch(phoneSaver(phone))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
