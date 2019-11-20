import { createStackNavigator } from "react-navigation-stack";

import Term from "../screens/Auth/Terms";
import Privacy from "../screens/Auth/Privacy";

export default createStackNavigator(
  {
    Term: {
      screen: Term,
      navigationOptions: {
        title: "이용약관"
      }
    },
    Privacy: {
      screen: Privacy,
      navigationOptions: {
        title: "개인정보취급방침"
      }
    }
  },
  {
    defaultNavigationOptions: { headerMode: "float" }
  }
);
