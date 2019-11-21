// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import AuthModal from "../screens/Auth/AuthModal";
// Imports: Navagation
import AuthNavigation from "../navigation/AuthNavigation";

const HomeNavigation = createStackNavigator(
  {
    HomeScreen,
    AuthNavigation,
    ListScreen
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default createAppContainer(HomeNavigation);
