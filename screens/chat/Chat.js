import React from "react";
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat"; // 0.3.0
import {
  AsyncStorage,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  Image,
  Platform
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import utils from "../../utils";

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
      avatar: null,
      usertoken: null,
      orderstatus: null,
      position: null,
      deliverId: null,
      hostinfo: null,
      deliverinfo: null
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

  renderTime(props) {
    return (
      <Time
        {...props}
        containerStyle={{
          left: { marginLeft: 0, marginRight: 0, marginBottom: 0 }
        }}
        textStyle={{
          left: { textAlign: "left", fontSize: 12 }
        }}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#F13564"
          }
        }}
      />
    );
  }
  render() {
    return (
      this.state.userId !== null && (
        <View style={{ flex: 1 }}>
          {this.state.orderStatus !== null && (
            <View
              style={{
                height: 100,
                marginTop: 30,
                backgroundColor: "rgb(230,230,230)"
              }}
            >
              {this.statusbar()}
            </View>
          )}
          <GiftedChat
            inverted={true}
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            renderBubble={this.renderBubble}
            renderTime={this.renderTime}
            scrollToBottom={true}
            timeTextStyle={{
              left: { color: "red" },
              right: { color: "yellow" }
            }}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : null}
            keyboardVerticalOffset={8}
          />
        </View>
      )
    );
  }

  statusbar = () => {
    return (
      <View style={{ alignSelf: "center", marginTop: 15 }}>
        <View>
          {this.state.position === "host" ? (
            <Image
              style={{ height: 20, width: 20, borderRadius: 10 }}
              source={{ uri: this.state.deliverinfo.image }}
            />
          ) : (
            <Image
              style={{ height: 20, width: 20, borderRadius: 20 }}
              source={{ uri: this.state.hostinfo.image }}
            />
          )}
        </View>
        {this.state.position === "deliver"
          ? this.deliverView()
          : this.hostView()}
      </View>
    );
  };

  deliverView = () => {
    const { orderstatus } = this.state;
    console.log("배송상태확인하기", this.state);
    const changestatus = async orderstat => {
      const pushtoken = await AsyncStorage.getItem("pushToken");
      const result = await serverApi.orderstatus(
        this.state.orderId,
        orderstat,
        this.state.usertoken,
        pushtoken
      );
      console.log(result);
      this.getUserId();
    };
    switch (orderstatus) {
      case 1:
        return (
          <View>
            <Text>배송시작하기</Text>
            <Button
              title={utils.transferOrderStatus(this.state.orderstatus + 1)}
              style={{ marginTop: 5 }}
              onPress={() => {
                changestatus(2);
              }}
            />
            <Button
              title="러너취소하기"
              style={{ marginTop: 5 }}
              onPress={() => {
                changestatus(99);
              }}
            />
          </View>
        );
        break;
      case 2:
        return (
          <View>
            <Button
              title={utils.transferOrderStatus(this.state.orderstatus + 1)}
              style={{ marginTop: 5 }}
              onPress={() => {
                changestatus(3);
              }}
            />
          </View>
        );
        break;
      case 3:
        return (
          <View>
            <Text>결제를 기다리는 중입니다</Text>
          </View>
        );
        break;
      case 4:
        return (
          <View>
            <Text>거래가 완료되었습니다</Text>
          </View>
        );
        break;
    }
  };

  hostView = () => {
    const { orderstatus } = this.state;
    console.log("배송상태확인하기", this.state);
    const changestatus = async () => {
      const pushtoken = await AsyncStorage.getItem("pushToken");
      const result = await serverApi.orderstatus(
        this.state.orderId,
        88,
        this.state.usertoken,
        pushtoken
      );
      console.log(result);
      this.getUserId();
    };
    switch (orderstatus) {
      case 1:
        return (
          <View>
            <Text>러너가 배송을 준비중입니다!</Text>
            <Button
              title="요청취소"
              onPress={changestatus}
              style={{ marginTop: 5 }}
            />
          </View>
        );
        break;
      case 2:
        return (
          <View>
            <Text>러너가 심부름 중입니다!</Text>
          </View>
        );
        break;
      case 3:
        return (
          <View>
            <Text>러너가 심부름을 완료했습니다</Text>
            <Button title="확인하고 결제하기" style={{ marginTop: 5 }} />
          </View>
        );
        break;
      case 4:
        return (
          <View>
            <Text>거래가 완료되었습니다</Text>
          </View>
        );
        break;
    }
  };

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
    console.log("상태", this.state);

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
    console.log(this.state.orderstatus);
    //this.handleStatus();
  }

  handleNotification = notification => {
    console.log("notinoiti", notification);
    this.setState({ notification });
    this.handleStatus();
  };

  handleStatus = async () => {
    const getstatus = await serverApi.getChat(orderid, usertoken);
    const { orderStatus } = getstatus.data.data.chatDetail;

    this.setState({
      orderstatus: orderStatus
    });
  };

  componentWillUnmount() {
    Fire.shared.off();
  }

  ///
  async getUserId() {
    ////////<-----------------------------------
    // const userid = await AsyncStorage.getItem("userId");//
    const orderid = await AsyncStorage.getItem("orderid"); ///필요한가ㅇㅇ
    const usertoken = await AsyncStorage.getItem("userToken");

    const getstatus = await serverApi.getChat(orderid, usertoken);
    //const mypage = await serverApi.user(usertoken);

    const { userId } = getstatus.data.data;
    const { orderStatus, hostId, deliverId } = getstatus.data.data.chatDetail;

    //////////-----------------------------------------------> chatlistscreen 에서 저장 후 불러오는 게 더 나을 듯
    const orderstatustext = utils.transferOrderStatus(orderStatus);

    console.log(orderstatustext);

    const { hostInfo, deliverInfo } = getstatus.data.data.chatDetail;

    const avatar = hostInfo.image;
    const name = hostInfo.nickname;

    console.log("유저아이디", userId, orderStatus, hostId, deliverId);

    let whoami = "";

    if (hostId === userId) {
      whoami = "host";
    } else {
      whoami = "deliver";
    }

    this.setState({
      avatar: avatar,
      userId: userId,
      orderId: orderid,
      username: name,
      usertoken: usertoken,
      orderstatus: orderStatus,
      position: whoami,
      deliverId: deliverId,
      hostinfo: hostInfo,
      deliverinfo: deliverInfo
    });
  }
}

export default Chat;
