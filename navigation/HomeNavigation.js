// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";

import RequestScreen from "../screens/RequestScreen";
import ChatScreen from "../screens/ChatScreen";
import MyPageScreen from "../screens/MyPageScreen";
import AuthModal from "../screens/Auth/AuthModal";
// Imports: Navagation
import AuthNavigation from "../navigation/AuthNavigation";


const HomeNavigation = createStackNavigator(
  {
    HomeScreen,

    AuthNavigation,
    ListScreen,
    RequestScreen,
    ChatScreen,
    MyPageScreen

  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default createAppContainer(HomeNavigation);
