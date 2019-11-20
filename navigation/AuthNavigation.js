// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import Signup from "../screens/Auth/Signup";
import AuthModal from "../screens/Auth/AuthModal";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import VerifyPhone from "../screens/Auth/VerifyPhone";
import ResetPw from "../screens/Auth/ResetPw";
import Term from "../screens/Auth/Terms";
import Privacy from "../screens/Auth/Privacy";

import TermsAndPrivacyNavigation from "../navigation/TermsAndPrivacyNavigation";

const AuthNavigation = createStackNavigator(
  {
    AuthModal,
    VerifyPhone,
    Signup,
    TermsAndPrivacyNavigation,
    Login,
    Confirm,
    ResetPw
  },
  {
    initialRouteName: "AuthModal",
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createAppContainer(AuthNavigation);
