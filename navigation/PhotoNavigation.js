import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: SelectPhoto,
      navigationOptions: {
        title: "라이브러리"
      }
    },
    TakePhoto: {
      screen: TakePhoto,
      navigationOptions: {
        title: "사진 업로드"
      }
    }
  },
  {
    tabBarPosition: "bottom"
  }
);

export default createStackNavigator({
  PhotoTabs,
  UploadPhoto
});
