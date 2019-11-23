// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import StartHome from "../screens/Start/StartHome";
import SelectCampus from "../screens/Start/SelectCampus";
import SelectPhoto from "../screens/Photo/SelectPhoto";

// Imports: Navigation
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
const StartNavigation = createStackNavigator(
  {
    StartHome,
    SelectCampus,
    SelectPhoto,
    MainNavigation
  },
  {
    initialRouteName: "StartHome",
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(StartNavigation);
