// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import VerifyPhone from "../screens/Auth/VerifyPhone";
import HomeScreen from "../screens/Tabs/HomeScreen";
import StartNavigation from "./StartNavigation";
const LoggedInNavigation = createStackNavigator(
  {
    HomeScreen,
    StartNavigation
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default createAppContainer(LoggedInNavigation);
