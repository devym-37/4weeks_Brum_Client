import React,{ useState, useEffect} from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import utils from "../../utils";
import constants from "../../constants";
import styles from "../../styles";
import Fire from "../../screens/chat/Fire"

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  justify-content: center;
`;

const ChatContainer = styled.View`
  padding: 20px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding-top: 4px;
`;

const OrderContainer = styled.View`
  padding: 0 15px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding-top: 20;
  padding-bottom: 4;
`;

const OrderTitle = styled.Text`
  font-size: 14px;
  padding-left: 6;
  margin-top: -5;
  color: #737b84;
  font-weight: 500;
`;
const ChatColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.View`
  width: ${constants.width};
  height: 1px;
  background-color: ${styles.lightGreyColor};
`;

const TimeStamp = styled.Text``;
const ChatContent = styled.View``;
const ChatUsername = styled.Text`
  font-size: 18;
  font-weight: 500;
`;
const ChatPreview = styled.Text`
  margin-top: 5;
  font-size: 14;
  color: #737b84;
`;
const Image = styled.Image`
  width: 48;
  height: 48;
  border-radius: 16;
  margin-right: 12;
`;

const UserBadgeContainer = styled.View`
  background-color: ${props => (props.isHost ? styles.mainColor : "#3A249C")};
  width: 60;
  border-radius: 4px;
  color: white;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  margin-bottom: 4px;
  padding: 6px 8px;
`;
const UserBadge = styled.Text`
  color: white;
  font-size: 12;
  line-height: 0;
  font-weight: 800;
`;
const ChatCard = ({ onPress, ...props }) => {
  const { chats, deliverInfo,orderId, title, createdAt, hostId, deliverId } = props;
  const username = deliverInfo.nickname;
  const avatar = deliverInfo.image;
  const shortenTitle = utils.shortenText(title, 20);
  const isHost = hostId !== deliverId;
  const orderTimeStamp = `[19.11.26]`;
  // const orderTimeStamp = orderTim
  const latestChat = chats && chats.length > 0 ? chats[0] : null;
  const timeStamp =
    chats &&
    (chats.length > 0
      ? utils.transferChatTimeStamp(latestChat.createdAt)
      : "방금 전");
  const chatPreview = latestChat
    ? latestChat.chatDetail
    : "러너와 대화를 시작하세요:)";
  const [lastchat,setLastchat] = useState("")

  
  const getlastchat = async () =>{
    
    const result = await Fire.getlastone(orderId)

    setLastchat(result)
  }
  
  useEffect(()=>{
    let isCancelled = false;

    getlastchat()

    return () => {
      isCancelled = true;
    };
  },[])

  return (
    <Touchable onPress={onPress}>
      <Container>
        <OrderContainer>
          <UserBadgeContainer isHost={isHost}>
            <UserBadge>{isHost ? "러너" : "요청자"}</UserBadge>
          </UserBadgeContainer>
          <OrderTitle>{orderTimeStamp}</OrderTitle>
          <OrderTitle>{shortenTitle}</OrderTitle>
        </OrderContainer>

        <ChatContainer>
          <ChatColumn>
            <Image source={{ uri: avatar }} />
            <ChatContent>
              <ChatUsername>{username}</ChatUsername>
              <ChatPreview>{lastchat.text}</ChatPreview>
            </ChatContent>
          </ChatColumn>
          <ChatColumn>
            <TimeStamp>{timeStamp}</TimeStamp>
          </ChatColumn>
        </ChatContainer>
        <Divider />
      </Container>
    </Touchable>
  );
};

export default ChatCard;
