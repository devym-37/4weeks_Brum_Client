import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import{Button} from 'react-native'
import Fire from "./Fire";

class ChatRooms extends React.Component {
  /* static navigationOptions = ({ navigation }) => ({
    title: "채팅"
  }); */

  state = {
    messages: []
  };


  render() {
    return (
      <Button
        onPress={}
        title="지원자선택"
      />
      <Button
        onPress={}
      />
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

export default Chat;
