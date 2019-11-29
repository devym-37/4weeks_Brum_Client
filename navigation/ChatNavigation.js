import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ChatListScreen from "../screens/Tabs/Chats/ChatScreen";
import Chat from "../screens/chat/Chat";
import { stackStyles } from "./config";
import BackLink from "../components/HeaderLink/BackLink";
import ChatHeaderLink from "../components/HeaderLink/ChatHeaderLink";
export default createStackNavigator({
  ChatListScreen: {
    screen: ChatListScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerShown: false
    }
  },

  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      ...stackStyles
    },
    title: navigation.getParam("username"),
    backgroundColor: "#f1f3f5",
    headerLeft: <BackLink />,
    headerRight: <ChatHeaderLink />
  })
});
