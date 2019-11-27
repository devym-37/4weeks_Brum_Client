import { createStackNavigator } from "react-navigation-stack";
import ChatFilter from "../screens/Tabs/Chats/ChatFilter";
import { stackStyles } from "./config";

export default createStackNavigator({
  ChatFilter: {
    screen: ChatFilter,
    navigationOptions: { ...stackStyles, title: "필터" }
  }
});
