import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { AsyncStorage, View } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import Fire from "./Fire";
import { serverApi } from "../../components/API";

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!"
  });

  constructor() {
    super();
    this.state = {
      messages: [],
      Loading: false,
      orderId: null,
      userId: null,
      notification: null,
      username: null,
      avatar: null
    };
  }
  get user() {
    //const user = redux
    return {
      //  name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
      name: this.state.username,
      avatar: this.state.avatar
    };
  }

  /*   registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    // Defined in following steps
    console.log("pushtoken", token);

    return await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: {
        to: token,
        sound: "default",
        title: "Vroom",
        body: "메시지 간다 메시지 받아라"
      }
      
      this.notificationSubscription = Notifications.addListener(this.handleNotification);
 
    }).catch(err => {
      throw err;
    });
  }; */

  render() {
    return (
      this.state.userId !== null && (
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
        />
      )
    );
  }

  onChats = orderid =>
    firebase
      .database()
      .ref(`threads/${orderid}/messages`)
      .on("value", data => {
        const newarr = [];
        for (const key in data.val()) {
          newarr.push(key);
        }
        console.log(newarr);

        this.setState({
          chats: newarr
        });
      });

  componentDidMount() {
    //const orderid= this.props.orderid
    console.log("propsprops", this.props);

    //this.registerForPushNotificationsAsync();

    this.getUserId();

    Fire.shared.on(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }));
    });

    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  handleNotification = notification => {
    this.setState({ notification });
  };

  componentWillUnmount() {
    Fire.shared.off();
  }

  ///
  async getUserId() {
    const userid = await AsyncStorage.getItem("userId");
    const orderid = await AsyncStorage.getItem("orderid");
    const usertoken = await AsyncStorage.getItem("userToken");

    const mypage = await serverApi.user(usertoken);

    const avatar = mypage.data.data.image;
    const name = mypage.data.data.nickname;

    console.log("유저아이디", userid);

    this.setState({
      avatar: avatar,
      userId: userid,
      orderId: orderid,
      username: name
    });
  }
}

export default Chat;

/* import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { Button, View } from "react-native";
import Fire from "./Fire";
import { ScrollView } from "react-native-gesture-handler";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Footer,
  Row
} from "native-base";

class ChatRooms extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "채팅"
  });

  state = {
    messages: []
  };

  handlechooseone() {
    const userId = 1;
    const orderId = 2;
    const deliverId = 3;
    Fire.shared.appendChatrooms(userId, orderId, deliverId);
  }
  handleadduser() {
    const userId = 1;
    const orderId = 3;
    const deliverId = 4;
    Fire.shared.appendUser(userId, orderId, deliverId);
  }

  handlechats() {
    const userId = 1;
    Fire.shared.onList(userId);
  }

  render() {
    return (
      <Card>
         <CardItem cardBody style={{ marginTop: 10 }}>

           
         </CardItem>
        <Button
          title="채팅으로"
          onPress={() => {
            this.props.navigation.navigate("Chat");
          }}
        />
        <Button onPress={this.handlechooseone.bind(this)} title="지원자선택" />
        <Button onPress={this.handleadduser.bind(this)} title="유저추가" />
        <Button onPress={this.handlechats.bind(this)} title="채팅방목록" />
      </Card>
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default ChatRooms;
 */
