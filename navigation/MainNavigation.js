// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import BottomNavigation from "./BottomNavigation";
import NotificationNavigation from "./NotificationNavigation";
import FilterNavigation from "./FilterNavigation";
import AuthNavigation from "./AuthNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomNavigation,
    AuthNavigation,
    FilterNavigation,
    NotificationNavigation
  },
  { headerMode: "none", mode: "modal" }
);

export default createAppContainer(MainNavigation);
