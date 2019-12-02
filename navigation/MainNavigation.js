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
import OrderNavigation from "./OrderNavigation";
import ChatFilterNavigation from "./ChatFilterNavigation";
import DepatureNavigation from "./DepatureNavigation";
import ArrivalNavigation from "./ArrivalNavigation";
import UserHistoryNavigation from "./UserHistoryNavigation";
import VerifyCampusNavigation from "./VerifyCampusNavigtion";
import PostReviewNavigation from "./PostReviewNavigation";
import { stackStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    BottomNavigation,
    AuthNavigation,
    OrderNavigation,
    UserHistoryNavigation,
    VerifyCampusNavigation,
    FilterNavigation,
    NewOrderNavigation,
    PhotoNavigation,
    ChatNavigation,
    PostReviewNavigation,
    ChatFilterNavigation,
    NotificationNavigation,
    DepatureNavigation,
    ArrivalNavigation,
    LoggedOutBottomNavigation
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
