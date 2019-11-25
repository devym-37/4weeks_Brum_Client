// Imports: Dependencies
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
        headerShown: false
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false
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
        headerShown: false
      }
    },
    Confirm: {
      screen: Confirm,
      navigationOptions: {
        headerShown: false
      }
    },
    ResetPw: {
      screen: ResetPw,
      navigationOptions: {
        headerShown: false
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
