// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import BottomNavigation from "./BottomNavigation";
import NotificationNavigation from "./NotificationNavigation";
import FilterNavigation from "./FilterNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomNavigation,
    FilterNavigation,
    NotificationNavigation
  },
  { headerMode: "none", mode: "modal" }
);

export default createAppContainer(MainNavigation);
