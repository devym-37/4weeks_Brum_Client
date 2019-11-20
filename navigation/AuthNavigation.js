// Imports: Dependencies
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Imports: Auth screens
<<<<<<< HEAD
import Signup from '../screens/Auth/Signup';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import AuthHome from '../screens/Auth/AuthHome';
import VerifyPhone from '../screens/Auth/VerifyPhone';
import ResetPw from '../screens/Auth/ResetPw';
import HomeScreen from '../screens/HomeScreen';
import Term from '../screens/Auth/Term';
import Privacy from '../screens/Auth/Privacy';
import Userinfo from '../screens/Auth/UserInfo';

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Userinfo,
=======
import Signup from "../screens/Auth/Signup";
import AuthModal from "../screens/Auth/AuthModal";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import VerifyPhone from "../screens/Auth/VerifyPhone";
import ResetPw from "../screens/Auth/ResetPw";
import Term from "../screens/Auth/Term";
import Privacy from "../screens/Auth/Privacy";

const AuthNavigation = createStackNavigator(
  {
    AuthModal,
>>>>>>> acd88873356f510a0f27ca7f38cf6765a387ae12
    VerifyPhone,
    Signup,
    Term,
    Privacy,
    Login,
    Confirm,
    ResetPw
  },
  {
<<<<<<< HEAD
    initialRouteName: 'AuthHome',
    headerMode: 'none'
=======
    initialRouteName: "AuthModal",
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
>>>>>>> acd88873356f510a0f27ca7f38cf6765a387ae12
  }
);

export default createAppContainer(AuthNavigation);
