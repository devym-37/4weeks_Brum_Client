import { createStackNavigator } from "react-navigation-stack";
import Notifications from "../screens/NotificationScreen";

export default createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: { title: "알림", mode: "card" }
  }
});
