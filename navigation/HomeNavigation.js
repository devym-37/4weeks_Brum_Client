// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";

const HomeNavigation = createStackNavigator(
  {
    HomeScreen,
    ListScreen
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default createAppContainer(HomeNavigation);
