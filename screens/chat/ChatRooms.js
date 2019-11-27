import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { Button, View } from "react-native";
import Fire from "./Fire";

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

  render() {
    return (
      <View>
        <Button
          title="채팅으로"
          onPress={() => {
            this.props.navigation.navigate("Chat");
          }}
        />
        <Button onPress={this.handlechooseone.bind(this)} title="지원자선택" />
        <Button onPress={this.handleadduser.bind(this)} title="유저추가" />
      </View>
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
