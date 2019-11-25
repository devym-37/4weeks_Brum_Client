import { createStackNavigator } from "react-navigation-stack";
import NewOrder from "../screens/Tabs/Order/NewOrderScreen";
import { stackStyles } from "./config";
import OrderDetailScreen from "../screens/Tabs/Order/OrderDetailScreen";
import HeaderLink from "../components/HeaderLink";
import { Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const OrderNavigation = createStackNavigator(
  {
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: {
        headerTitle: " ",
        headerRight: handle => (
          <AntDesign name="share-alt" size={24} style={{ color: "#24282C" }} />
        )
      }
    },
    VerifyPhone: {
      screen: VerifyPhone,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "AuthModal",
    mode: "modal",
    // headerMode: "float",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
