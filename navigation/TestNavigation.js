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
import Term from "../screens/Auth/Term";
import Privacy from "../screens/Auth/Privacy";
import Userinfo from "../screens/Auth/UserInfo";
import PermissionApp from "../screens/Auth/Permissions";

const TestNavigation = createStackNavigator(
  {
    AuthHome,
    Userinfo,
    VerifyPhone,
    Signup,
    Term,
    Privacy,
    Login,
    Confirm,
    HomeScreen,
    ResetPw,
    PermissionApp
  },
  {
    initialRouteName: "Confirm",
    headerMode: "none"
  }
);

export default createAppContainer(TestNavigation);
