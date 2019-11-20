import { createStackNavigator } from "react-navigation-stack";
import Filter from "../screens/FilterScreen";

export default createStackNavigator({
  Filter: {
    screen: Filter,
    navigationOptions: { title: "필터", mode: "card" }
  }
});
