import { createStackNavigator } from "react-navigation-stack";
import Notifications from "../screens/HomeHeader/NotificationScreen";
import { stackStyles } from "./config";

export default createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      headerStyle: {
        ...stackStyles
      },
      title: "알림",
      mode: "card"
    }
  }
});
