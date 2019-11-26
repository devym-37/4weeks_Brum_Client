import React from "react";
import styled from "styled-components";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import utils from "../../utils";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Touchable = styled.TouchableOpacity``;
const ChatContainer = styled.View``;
const ChatColumn = styled.View``;
const TimeStamp = styled.Text``;
const ChatContent = styled.View``;
const ChatUsername = styled.Text``;
const ChatPreview = styled.Text``;
const Image = styled.Image`
  width: 48;
  height: 48;
  border-radius: 24;
`;
const ChatCard = ({ onPress, ...props }) => {
  const { chats, deliverInfo } = props;

  const username = deliverInfo.nickname;
  const avatar = deliverInfo.image;

  const latestChat = chats[0];
  const timeStamp = utils.transferChatTimeStamp(latestChat.createdAt);
  const chatPreview = latestChat.chatDetail;

  return (
    <Touchable onPress={onPress}>
      <ChatContainer>
        <ChatColumn>
          <Image source={{ uri: avatar }} />
          <ChatContent>
            <ChatUsername>{username}</ChatUsername>
            <ChatPreview>{chatPreview}</ChatPreview>
          </ChatContent>
        </ChatColumn>
        <ChatColumn>
          <TimeStamp>{timeStamp}</TimeStamp>
        </ChatColumn>
      </ChatContainer>
    </Touchable>
  );
};

export default ChatCard;
