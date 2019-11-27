import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, AsyncStorage } from "react-native";

import { withNavigation } from "react-navigation";
import { serverApi } from "../../../components/API";

import DefaultOrder from "../../../components/DefaultOrder";
import ChatCard from "../../../components/Cards/ChatCard";
import Loader from "../../../components/Loader";

const Container = styled.View`
  flex: 1;
  margin-top: 50%;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  margin-bottom: 4px;
`;

const ChatListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [chats, setChats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = username => {
    console.log(`username: `, username);
    navigation.navigate("ChatNavigation", { username: username });
  };

  const refresh = async () => {
    try {
      setRefreshing(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let requestChats = await serverApi.getAllChats(userToken);
      setChats([...requestChats.data]);
    } catch (e) {
      console.log(`Can't refresh data. error message: ${e}`);
    } finally {
      setRefreshing(false);
    }
  };
  const preLoad = async () => {
    try {
      setLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let requestChats = await serverApi.getAllChats(userToken);
      console.log(`chats: `, requestChats.data);
      setChats([...requestChats.data.data]);
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f5" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : chats ? (
        chats.map((chat, i) => (
          <ChatCard
            key={i}
            onPress={() => handleClick(chat.deliverInfo.nickname)}
            {...chat}
          ></ChatCard>
        ))
      ) : (
        <DefaultOrder />
      )}
    </ScrollView>
  );
};

export default ChatListScreen;
