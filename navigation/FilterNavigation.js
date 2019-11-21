import { createStackNavigator } from "react-navigation-stack";
import Filter from "../screens/HomeHeader/FilterScreen";

export default createStackNavigator({
  Filter: {
    screen: Filter,
    navigationOptions: { title: "필터", mode: "card" }
  }
});
