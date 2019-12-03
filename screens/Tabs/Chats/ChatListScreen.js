import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, AsyncStorage, Button } from "react-native";

import { withNavigation } from "react-navigation";
import { serverApi } from "../../../components/API";

import DefaultOrder from "../../../components/DefaultOrder";
import ChatCard from "../../../components/Cards/ChatCard";
import Loader from "../../../components/Loader";

import Fire from "../../chat/Fire";
import firebase from "firebase";

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
  const [userId, setUserId] = useState(null);
  const [threads, setThreads] = useState(null);

  const handleClick = async (username, orderId) => {
    console.log(`username: `, username);
    ////////
    await AsyncStorage.setItem("orderid", orderId.toString());

    navigation.navigate("Chat", { username });
  };

  ////이동해야함
  const onList = userId => {
    if (userId !== null) {
      firebase
        .database()
        .ref(`users/${userId}/threads`)
        .on("value", data => {
          const newarr = [];
          for (const key in data.val()) {
            newarr.push(key);
          }
          console.log("arr", newarr);

          setThreads(newarr);
        });
    }
  };

  const fetchUserId = async () => {
    try {
      const usertoken = await AsyncStorage.getItem("userToken");
      const mypage = await serverApi.user(usertoken);
      if (mypage.data.isSuccess) {
        await AsyncStorage.setItem(
          "userId",
          mypage.data.data.userId.toString()
        );
        console.log("hi", mypage.data.data.userId);
        //const { userId } = mypage.data.data;
        //await AsyncStorage.setItem("userId", userId);
        onList(mypage.data.data.userId);

        setUserId(mypage.data.data.userId);

        //this.props.reduxuserId(mypage.data.data.userId);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const preLoad = async () => {
    try {
      setLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let requestChats = await serverApi.getAllChats(userToken);
      console.log(`chats: `, requestChats.data);
      setChats([...requestChats.data.data]);

      fetchUserId();
      Fire.shared.observeAuth();
      setUserId(requestChats.data.userId);
    } catch (e) {
      console.log(`Can't fetch data from server. error message: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
    return () => {
      Fire.shared.off();
    };
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f5" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={preLoad} />
      }
    >
      {loading ? (
        <Loader />
      ) : chats && chats.length > 0 ? (
        chats.map((chat, i) => (
          <ChatCard
            key={i}
            onPress={() => handleClick(chat.deliverInfo.nickname, chat.orderId)}
            userId={userId}
            {...chat}
            orderId={chat.orderId}
          ></ChatCard>
        ))
      ) : (
        <DefaultOrder />
      )}
    </ScrollView>
  );
};

export default ChatListScreen;
