import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { serverApi } from "../../../components/API";
import constants from "../../../constants";
import Loader from "../../../components/Loader";

const Container = styled.View`
  justify-content: flex-start;
  align-items: center;
`;

const ChatMessages = styled.View`
  flex: 1;
  width: ${constants.width * 0.9};
  /* justify-content: center; */
  /* align-items: center; */
`;
const TimeStamp = styled.Text`
  align-self: center;
  font-weight: 400;
  margin-bottom: 20px;
`;
const IncomingMessage = styled.View`
  /* padding-left: 28px; */
  position: relative;
  flex-direction: row;
  align-self: flex-start;
`;

const SentMessage = styled.View`
  align-self: flex-end;
  /* margin-right: -10px; */
  flex-direction: row;
`;
const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 15px;
  margin-right: 20px;
  /* width: 40;
  height: 40;
  border-radius: 20; */
`;
const MessageContent = styled.View`
  margin-left: -8px;
  margin-top: 4px;
`;

const SentMessageContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const MessageAuthor = styled.Text`
  padding-bottom: 6px;
  font-size: 12;
  font-weight: 500;
`;
const SentMessageBubble = styled.View`
  background-color: white;
  box-shadow: 0 30px 60px rgba(50, 50, 93, 0.25);
  padding: 10px 20px;
  border-radius: 20px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: 2px 5px 4px rgba(0, 0, 0, 0.03);
`;

const IncomingMessageBubble = styled.View`
  background-color: white;
  box-shadow: 0 30px 60px rgba(50, 50, 93, 0.25);
  padding: 10px 20px;
  border-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 18px;
  box-shadow: 2px 5px 4px rgba(0, 0, 0, 0.03);
`;
const Message = styled.Text`
  display: flex;
  align-items: center;
  font-size: 15;
`;
const MessageTimestamp = styled.Text`
  align-self: flex-end;
  padding: 0 4px;
`;

// const ChatWrite = styled.View`
//   bottom: 0;
//   width: ${constants.width * 0.9};
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: 8px 16px;
//   padding-bottom: 24px;
//   background-color: #fcfcfc;
//   box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1);
// `;

// const ChatWriteColumn = styled.View``;

// const IconContainer = styled.View`
//   position: absolute;
//   right: 16;
//   top: 8;
//   z-index: 14;
// `;

// const TextInput = styled.TextInput`
//   border: 1px #666;
//   border-radius: 40px;
//   font-size: 19;
//   width: ${constants.width - 70};
//   padding-left: 15px;
//   padding-right: 30px;
//   height: 42;
// `;
const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const onChangeText = text => setMessage(text);
  const onSubmit = () => {
    if (message === "") {
      return;
    }
    try {
      //   await sendMessageMutation();
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      enabled
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: 20,
          //   paddingVertical: 50,
          backgroundColor: "#f1f3f5",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {/* {data.messages.map(m => (
          <View key={m.id} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>
        ))} */}

        <ChatMessages>
          <TimeStamp>Friday, January 11, 2019</TimeStamp>
          <IncomingMessage>
            <Image
              source={{
                uri:
                  "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png"
              }}
            />
            <MessageContent>
              <MessageAuthor>이영민</MessageAuthor>
              <IncomingMessageBubble>
                <Message>환영합니다!</Message>
              </IncomingMessageBubble>
            </MessageContent>
            <MessageTimestamp>11:23</MessageTimestamp>
          </IncomingMessage>

          <SentMessage>
            <SentMessageContent>
              <MessageTimestamp>11:23</MessageTimestamp>

              <SentMessageBubble>
                <Message>네 감사합니다</Message>
              </SentMessageBubble>
            </SentMessageContent>
          </SentMessage>
        </ChatMessages>
        {/* <ChatWrite>
          <ChatWriteColumn>
            <AntDesign name="plussquareo" size={28} style={{ color: "#666" }} />
          </ChatWriteColumn>
          <ChatWriteColumn>
            <TextInput
              placeholder={"Send message"}
              value={message}
              onChangeText={onChangeText}
              returnKeyType="send"
            ></TextInput>
            <IconContainer>
              <AntDesign
                name="smileo"
                size={24}
                style={{
                  color: "#666"
                }}
              />
            </IconContainer>
          </ChatWriteColumn>
        </ChatWrite> */}
        <TextInput
          placeholder="메세지를 입력해주세요"
          style={{
            marginTop: 50,
            width: "90%",
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            fontSize: 17
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>

    //     <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
    //       <ScrollView>
    //         <ChatMessages>
    //           <TimeStamp>Friday, January 11, 2019</TimeStamp>
    //           <IncomingMessage>
    //             <Image
    //               source={{
    //                 uri:
    //                   "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png"
    //               }}
    //             />
    //             <MessageContent>
    //               <MessageAuthor>이영민</MessageAuthor>
    //               <MessageBubble>
    //                 <Message>환영합니다!</Message>
    //               </MessageBubble>
    //             </MessageContent>
    //             <MessageTimestamp>11:23</MessageTimestamp>
    //           </IncomingMessage>

    //           <IncomingMessage>
    //             <MessageContent>
    //               <MessageTimestamp>11:23</MessageTimestamp>

    //               <MessageBubble>
    //                 <Message>네 감사합니다</Message>
    //               </MessageBubble>
    //             </MessageContent>
    //           </IncomingMessage>
    //         </ChatMessages>

    //         <ChatWrite>
    //           <ChatWriteColumn>
    //             <AntDesign name="plussquareo" size={28} style={{ color: "#666" }} />
    //           </ChatWriteColumn>
    //           <ChatWriteColumn>
    //             <TextInput
    //               placeholder={"Send message"}
    //               value={message}
    //               onChangeText={onChangeText}
    //               returnKeyType="send"
    //             ></TextInput>
    //             <IconContainer>
    //               <AntDesign
    //                 name="smileo"
    //                 size={24}
    //                 style={{
    //                   color: "#666"
    //                 }}
    //               />
    //             </IconContainer>
    //           </ChatWriteColumn>
    //         </ChatWrite>
    //       </ScrollView>
    //     </KeyboardAvoidingView>
  );
};

export default ChatScreen;
