// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import StartHome from "../screens/Start/StartHome";
import SelectCampus from "../screens/Start/SelectCampus";

// Imports: Navigation
import AuthNavigation from "../navigation/AuthNavigation";
import HomeNavigation from "../navigation/HomeNavigation";
const StartNavigation = createStackNavigator(
  {
    StartHome,
    SelectCampus,
    HomeNavigation
  },
  {
    initialRouteName: "StartHome",
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(StartNavigation);
