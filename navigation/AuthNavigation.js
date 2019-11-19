// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";
import VerifyPhone from "../screens/Auth/VerifyPhone";
import ResetPw from "../screens/Auth/ResetPw";
import HomeScreen from "../screens/HomeScreen";
const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    VerifyPhone,
    Signup,
    Login,
    Confirm,
    HomeScreen,
    ResetPw
  },
  {
    initialRouteName: "AuthHome",
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
