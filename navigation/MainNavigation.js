// Imports: Dependencies
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import BottomNavigation from "./BottomNavigation";
import LoggedOutBottomNavigation from "./LoggedOutBottomNavigation";
import NotificationNavigation from "./NotificationNavigation";
import FilterNavigation from "./FilterNavigation";
import AuthNavigation from "./AuthNavigation";
import NewOrderNavigation from "./NewOrderNavigation";
import PhotoNavigation from "./PhotoNavigation";
import ChatNavigation from "./ChatNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    BottomNavigation,
    LoggedOutBottomNavigation,
    AuthNavigation,
    FilterNavigation,
    NewOrderNavigation,
    PhotoNavigation,
    ChatNavigation,
    NotificationNavigation
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

export default createAppContainer(MainNavigation);
