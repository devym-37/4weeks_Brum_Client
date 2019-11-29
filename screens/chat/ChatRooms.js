import React from "react";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0
import { View, AsyncStorage } from "react-native";
import Fire from "./Fire";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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
import { timeSaver } from "../../redux/actions/orderActions";
import firebase from "firebase";
import { object } from "prop-types";
import { serverApi } from "../../components/API";
import { userIdSaver } from "../../redux/actions/userId";
import { connect } from "react-redux";

class ChatRooms extends React.Component {
  static navigationOptions = {
    title: "Chatter"
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      Loading: false,
      threads: null,
      userId: null
    };
  }

  handlechooseone() {
    const userId = this.state.userId;
    const orderId = 2;
    const deliverId = 3;
    Fire.shared.appendChatrooms(userId, orderId, deliverId);
  }
  handleadduser() {
    const userId = this.state.userId;
    const orderId = 3;
    const deliverId = 4;
    Fire.shared.appendUser(userId, orderId, deliverId);
  }

  handlechats() {
    const userId = 1;
    console.log(typeof this.state.threads);
    console.log(this.state.threads);
  }

  render() {
    return (
      <ScrollView>
        <Content cardBody style={{ marginTop: 10 }}>
          {this.state.threads !== null && (
            <View>
              <Card>
                {this.state.threads.map((data, i) => (
                  <TouchableOpacity
                    key={i}
                    userId={this.state.userId}
                    onPress={() => {
                      this.saveClicked(data);
                      this.props.navigation.navigate("Chat");
                    }}
                  >
                    <CardItem>
                      <Text>하이{data}</Text>
                    </CardItem>
                  </TouchableOpacity>
                ))}
              </Card>
              <Button
                userId={this.state.userId}
                title="채팅으로"
                onPress={() => {
                  this.saveClicked(data);
                  navigation.navigate("Chat");
                }}
              >
                <Text>"채팅으로"</Text>
              </Button>
              <Button
                onPress={this.handlechooseone.bind(this)}
                title="지원자선택"
              >
                <Text>"지원자선택"</Text>
              </Button>
              <Button onPress={this.handleadduser.bind(this)} title="유저추가">
                <Text>"유저추가"</Text>
              </Button>
              <Button onPress={this.handlechats.bind(this)} title="채팅방목록">
                <Text>"채팅방목록//"</Text>
              </Button>
            </View>
          )}
        </Content>
      </ScrollView>
    );
  }

  saveClicked = async data => {
    await AsyncStorage.setItem("orderid", data);
  };

  onList = userId => {
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

          this.setState({
            threads: newarr
          });
        });
    }
  };

  async fetchUserId() {
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
        this.onList(mypage.data.data.userId);
        this.setState({
          userId: mypage.data.data.userId
        });
        //this.props.reduxuserId(mypage.data.data.userId);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  componentDidMount() {
    this.fetchUserId();
    Fire.shared.observeAuth();
    console.log("useridin////", this.state.userId);

    //console.log(this.props);
  }

  componentWillUnmount() {
    Fire.shared.off(); ///
  }
}
/* 
  const mapStateToProps = state => {
    // Redux Store --> Component
    return {
      userId: state.userIdReducer.userId
    };
  };

  const mapDispatchToProps = dispatch => {
    // Action
    return {
      // Login
      reduxuserId: userId => dispatch(userIdSaver(userId))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ChatRooms);

 */
export default ChatRooms;
//여기서 기존서버 api로 userid 받아옴
//componentdidmount진행
