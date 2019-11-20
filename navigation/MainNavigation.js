// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import BottomNavigation from "./BottomNavigation";

const MainNavigation = createStackNavigator(
  {
    BottomNavigation
  },
  { headerMode: "none", mode: "modal" }
);

export default createAppContainer(MainNavigation);
