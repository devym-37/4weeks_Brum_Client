// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import RequestScreen from "../screens/RequestScreen";
import ChatScreen from "../screens/ChatScreen";
import MyPageScreen from "../screens/MyPageScreen";

const HomeNavigation = createStackNavigator(
  {
    HomeScreen,
    ListScreen,
    RequestScreen,
    ChatScreen,
    MyPageScreen
  },
  {
    initialRouteName: "ListScreen",
    headerMode: "none"
  }
);

export default createAppContainer(HomeNavigation);
