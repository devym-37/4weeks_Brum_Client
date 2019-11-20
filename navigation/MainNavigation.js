// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import BottomNavigation from "./BottomNavigation";
import NotificationNavigation from "./NotificationNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomNavigation,
    NotificationNavigation
  },
  { headerMode: "none", mode: "modal" }
);

export default createAppContainer(MainNavigation);
