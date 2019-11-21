// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import HomeScreen from "../screens/Tabs/HomeScreen";
import ListScreen from "../screens/Tabs/ListScreen";

import RequestScreen from "../screens/Tabs/OrderScreen";
import ChatScreen from "../screens/Tabs/ChatsScreen";
import MyPageScreen from "../screens/Tabs/MyPageScreen";
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
