import { createStackNavigator } from "react-navigation-stack";
import Filter from "../screens/HomeHeader/FilterScreen";
import { stackStyles } from "./config";

export default createStackNavigator({
  Filter: {
    screen: Filter,
    navigationOptions: { ...stackStyles, title: "필터", mode: "card" }
  }
});
