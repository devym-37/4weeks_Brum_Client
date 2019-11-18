// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Imports: Auth screens
import StartHome from "../screens/Start/StartHome";
import SelectCampus from "../screens/Start/SelectCampus";

// Imports: Navigation
import AuthNavigation from "../navigation/AuthNavigation";

const StartNavigation = createStackNavigator(
  {
    StartHome,
    SelectCampus,
    AuthNavigation
  },
  {
    initialRouteName: "StartHome",
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(StartNavigation);
