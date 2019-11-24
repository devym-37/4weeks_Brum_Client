// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import NotificationNavigation from "./NotificationNavigation";
import FilterNavigation from "./FilterNavigation";
import AuthNavigation from "./AuthNavigation";
import LoggedOutBottomNavigation from "./LoggedOutBottomNavigation";
import StartNavigation from "./StartNavigation";
import { stackStyles } from "./config";
import MainNavigation from "./MainNavigation";
const LoggedOutMainNavigation = createStackNavigator(
  {
    StartNavigation,
    LoggedOutBottomNavigation,
    AuthNavigation,
    FilterNavigation,
    NotificationNavigation,
    MainNavigation
  },
  {
    navigationOptions: {
      headerStyler: {
        ...stackStyles
      }
    },
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(LoggedOutMainNavigation);
