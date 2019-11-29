import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ChatScreen from "../screens/Tabs/Chats/ChatScreen";
import { stackStyles } from "./config";
import BackLink from "../components/HeaderLink/BackLink";
import ChatHeaderLink from "../components/HeaderLink/ChatHeaderLink";
export default createStackNavigator({
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        ...stackStyles
      },
      title: navigation.getParam("username"),
      backgroundColor: "#f1f3f5",
      headerLeft: <BackLink />,
      headerRight: <ChatHeaderLink />
    })
  }
});
