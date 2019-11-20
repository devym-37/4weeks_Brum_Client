// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import Signup from "../screens/Auth/Signup";
import AuthModal from "../screens/Auth/AuthModal";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
// import AuthHome from "../screens/Auth/AuthHome";
import VerifyPhone from "../screens/Auth/VerifyPhone";
import ResetPw from "../screens/Auth/ResetPw";
import Term from "../screens/Auth/Term";
import Privacy from "../screens/Auth/Privacy";

const AuthNavigation = createStackNavigator(
  {
    AuthModal,
    VerifyPhone,
    Signup,
    Term,
    Privacy,
    Login,
    Confirm,
    ResetPw
  },
  {
    initialRouteName: "AuthModal",
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
