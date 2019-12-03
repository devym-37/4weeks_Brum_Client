// Imports: Dependencies
import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import Signup from "../screens/Auth/Signup";
import AuthModal from "../screens/Auth/AuthModal";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import Userinfo from "../screens/Auth/UserInfo";
import VerifyPhone from "../screens/Auth/VerifyPhone";
import ResetPw from "../screens/Auth/ResetPw";
import Term from "../screens/Auth/Terms";
import Privacy from "../screens/Auth/Privacy";
import { stackStyles } from "./config";
import AuthCloseLink from "../components/HeaderLink/AuthCloseLink";
const AuthNavigation = createStackNavigator(
  {
    // AuthModal: {
    //   screen: AuthModal,
    //   navigationOptions: {
    //     headerShown: false
    //   }
    // },
    VerifyPhone: {
      screen: VerifyPhone,
      navigationOptions: {
        title: "휴대폰번호 인증",
        headerLeft: <AuthCloseLink />
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        // headerShown: false
        title: "회원가입",
        headerLeft: <AuthCloseLink />
      }
    },
    Term: {
      screen: Term,
      navigationOptions: {
        ...stackStyles,
        title: "쌉가능 이용약관",
        headerBackTitleVisible: false,
        headerBackTitle: null
      }
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: {
        ...stackStyles,
        title: "쌉가능 개인정보취급방침",
        headerBackTitleVisible: false,
        headerBackTitle: null
      }
    },
    Userinfo: {
      screen: Userinfo,
      navigationOptions: {
        ...stackStyles,
        title: "추가 프로필 입력(선택)",
        headerBackTitle: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        // headerShown: false
        title: "로그인",
        headerLeft: <AuthCloseLink />
      }
    },
    Confirm: {
      screen: Confirm,
      navigationOptions: {
        // headerShown: false
        title: "인증번호 입력",
        headerLeft: <AuthCloseLink />
      }
    },
    ResetPw: {
      screen: ResetPw,
      navigationOptions: {
        // headerShown: false
        title: "비밀번호 재설정",
        headerLeft: <AuthCloseLink />
      }
    }
  },
  {
    // initialRouteName: "AuthModal",
    mode: "modal",
    // headerMode: "float",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(AuthNavigation);
