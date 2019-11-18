// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";
import VerifyPhone from "../screens/Auth/VerifyPhone";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    VerifyPhone,
    Signup,
    Login,
    Confirm
  },
  {
    initialRouteName: "AuthHome",
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
