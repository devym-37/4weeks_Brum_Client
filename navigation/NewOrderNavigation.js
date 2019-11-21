import { createStackNavigator } from "react-navigation-stack";
import NewOrder from "../screens/Tabs/Order/NewOrderScreen";
import { stackStyles } from "./config";

export default createStackNavigator({
  NewOrder: {
    screen: NewOrder,
    navigationOptions: {
      title: "새 요청 글쓰기",
      mode: "card",
      ...stackStyles
    }
  }
});
