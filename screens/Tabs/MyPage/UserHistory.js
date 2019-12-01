import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import constants from "../../../constants";
const UserHistoryScreen = ({ navigation }) => {
  const obj = { 요청내역: 0, 러너내역: 1, 관심목록: 2 };
  const title = navigation.getParam("title");
  const [index, setIndex] = useState(obj[title]);
  const [routes, setRoutes] = useState([
    { key: "first", title: "요청내역" },
    { key: "second", title: "러너내역" },
    { key: "third", title: "관심목록" }
  ]);

  const _renderTabBar = props => (
    <TabBar
      {...props}
      activeColor="#E2227"
      inactiveColor="#ABB2BB"
      indicatorStyle={{ backgroundColor: "#1E2227" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontSize: 16 }}
    />
  );
  const FirstRoute = () => (
    <View>
      <Text>{"요청리스트"}</Text>
    </View>
  );

  const SecondRoute = () => (
    <View>
      <Text>{"러너내역"}</Text>
    </View>
  );

  const ThirdRoute = () => (
    <View>
      <Text>{"관심목록"}</Text>
    </View>
  );
  return (
    <>
      <TabView
        navigationState={{ index, routes: [...routes] }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute
        })}
        renderTabBar={_renderTabBar}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: constants.width }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center"
  }
});

export default UserHistoryScreen;
