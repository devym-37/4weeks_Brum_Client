import React from "react";
import { connect } from "react-redux";

import {
  GiftedChat,
  Bubble,
  Time,
  MessageImage
} from "react-native-gifted-chat"; // 0.3.0
import {
  AsyncStorage,
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  Image,
  Modal,
  Platform,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import GhostButton from "../../components/Buttons/GhostButton";
import styles from "../../styles";
import utils from "../../utils";
import constants from "../../constants";
import Fire from "./Fire";
import { serverApi } from "../../components/API";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { contactSaver } from "../../redux/actions/contactActions";

const CardContainer = styled.View`
  width: ${constants.width};

  padding: 0 3px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  /* border-bottom-color: "#47315a"*/
`;

const Thumbnail = styled.Image`
  width: 56;
  height: 56;
  border-radius: 20;
  margin-right: 6;
  flex-direction: row;
`;
const ChatColumn = styled.View`
  flex-direction: row;
  /*justify-content: space-between;*/
  align-items: center;
  /* aling-self: center; */
`;
const Title = styled.Text`
  font-size: 18;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`;
const Nickname = styled.Text`
  font-size: 11;
  font-weight: 400;
  margin-bottom: 8px;
`;

const ContentContainer = styled.View`
  padding: 6px 2px;
  flex-direction: row;
  justify-content: center;
`;

const HeaderButton = styled.Text`
  color: white;
  font-size: 18;
  line-height: 0;
  font-weight: 500;
  align-self: center;
`;
const HeaderButtonContainer = styled.View`
  background-color: ${styles.mainColor};
  flex-direction: row;
  width: 100;
  border-radius: 4px;
  color: white;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 4px;
  margin-top: 4px;
  padding: 6px 8px;
`;

const TextContainer = styled.View`
  flex: 2.6;
  /* padding: 4px 0; */
  padding-left: 14px;

  justify-content: center;
  align-items: flex-start;
`;
const OrderContainer = styled.View`
  padding: 0 5px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  background-color: white;
  padding-top: 10;
  padding-bottom: 1;
`;

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
      deliverinfo: null,
      image: null,
      accessoryOpen: false
    };
  }
  get user() {
    //const user = redux

    return {
      //  name: this.props.navigation.state.params.name,
      _id: this.state.userId,
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
          {this.state.orderStatus !== null && this.statusbar()}

          <GiftedChat
            inverted={true}
            image={this.state.image}
            messages={this.state.messages}
            onSend={(messages, image) => {
              Fire.shared.send(messages, this.state.image);
              this.setState({
                image: null
              });
            }}
            user={this.user}
            renderBubble={this.renderBubble}
            /*      renderTime={this.renderTime}
            renderMessageImage={this.renderMessageImage}*/

            scrollToBottom={true}
            timeTextStyle={{
              left: { color: "red" },
              right: { color: "yellow" }
            }}
            alwaysShowSend={true}
            renderActions={this.renderActions.bind(this)}
            //renderInputToolbar ={this.renderInputToolbar}
            // minInputToolbarHeight={this.state.accessoryOpen ?400 : 50}
          />
          {/*   {this.state.image ? (
            <Image 
            style={{
              width: 80,
              height: 80
            }}
            source={{ uri: this.state.image }}
            />
          ):(
            <>
            </>
          )} */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : null}
            keyboardVerticalOffset={9}
          />
        </View>
      )
    );
  }
  renderMessageImage = image => {
    console.log("실행도안된다");
    return (
      this.state.image && (
        <Image
          style={{
            width: 80,
            height: 80
          }}
          source={{ uri: this.state.image }}
        />
      )
    );
  };

  renderInputToolbar = () => {
    return (
      <View>
        {this.state.image && (
          <Image
            style={{
              width: constants.width,
              height: 600
            }}
            source={{ uri: this.state.image }}
          />
        )}
        <View
          style={{
            width: constants.width,
            height: 600
          }}
        ></View>
      </View>
    );
  };

  renderActions = () => {
    const takePicture = async () => {
      try {
        // console.log("didicomein?");
        const { status } = await Permissions.askAsync(
          Permissions.CAMERA_ROLL,
          Permissions.CAMERA
        );

        // console.log(ImagePicker);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });

        if (!result.cancelled) {
          //const response = await fetch(result.uri);
          //const blob = await response.blob();

          //var storageRef = firebase.storage().ref("images");

          //let ref = storageRef.child(`${blob.data.name}`);

          //await ref.put(blob);
          //const url = await ref.getDownloadURL();

          // console.log("블롭파일입니다", url);

          // console.log("없나",this.state.orderId,this.state.usertoken)
          console.log("업로드한사진안들어와!", result);
          this.setState({
            Loading: true
          });
          const text = await serverApi
            .geturl(this.state.orderId, this.state.usertoken, result.uri)
            .then(res => {
              return res.json();
            });
          console.log("업로드한사진", text);

          this.setState({
            image: text.data.url,
            accessoryOpen: true,
            Loading: false
          });
          //setImageadded(result.uri);
        }

        //setLoading(true);
        setCameraPermission(status === "granted");
      } catch (e) {
      } finally {
        //setLoading(false);
      }
    };

    /*   getPhotos = async () => {
      try {
        const { assets } = await MediaLibrary.getAssetsAsync();
        const [firstPhoto] = assets;
        this.setState({
          image: firstPhoto
        });
      } catch (e) {
        console.log(e);
      }
    }; */

    return (
      <TouchableOpacity onPress={takePicture}>
        <ChatColumn>
          <Ionicons
            name="md-add-circle-outline"
            style={{ alignSelf: "center", fontSize: 30, marginRight: 5 }}
          />

          {this.state.image && (
            <Ionicons
              delayLongPress={10}
              onLongPress={() => {
                this.setState({ image: null });
              }}
              name="md-image"
              style={{ alignSelf: "center", fontSize: 30 }}
            />
          )}
          {this.state.Loading && (
            <Ionicons
              name="md-hourglass"
              style={{ alignSelf: "center", fontSize: 30 }}
            />
          )}
        </ChatColumn>
      </TouchableOpacity>
    );
  };

  statusbar = () => {
    /*  const handleBack = () => {
      this.props.navigation.navigate("BottomNavigation");
      //this.props.navigation.goBack();
    }; */
    return (
      <ContentContainer>
        <View style={{ alignSelf: "flex-start" }}>
          {this.state.position === "deliver"
            ? this.deliverView()
            : this.hostView()}
        </View>
      </ContentContainer>
    );
  };

  deliverView = () => {
    const { orderstatus } = this.state;
    console.log("배송상태확인하기", this.state);
    const changestatus = async orderstat => {
      const pushtoken = await AsyncStorage.getItem("pushToken");
      if (orderstat === 99) {
        navigation.navigate("ChatListScreen");
      }
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
          <>
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.hostinfo.image
                  }}
                />

                <TextContainer>
                  <Title>심부름을 시작해주세요! </Title>
                </TextContainer>
              </OrderContainer>
              <OrderContainer>
                <GhostButton
                  onPress={() => {
                    changestatus(2);
                  }}
                  width={200}
                  style={{ fontSize: 15 }}
                  marginRight={5}
                  text="심부름시작"
                />
                <GhostButton
                  onPress={() => {
                    changestatus(99);
                    this.props.navigation.navigate("BottomNavigation");
                  }}
                  width={200}
                  style={{ fontSize: 15 }}
                  text="러너 취소하기"
                />
              </OrderContainer>
            </CardContainer>
          </>
        );
        break;
      case 2:
        return (
          <>
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.hostinfo.image
                  }}
                />

                <TextContainer>
                  <Title>심부름 중입니다! </Title>
                </TextContainer>
              </OrderContainer>
              <OrderContainer>
                <GhostButton
                  onPress={() => {
                    changestatus(1);
                  }}
                  style={{ fontSize: 15 }}
                  marginRight={5}
                  text="심부름대기"
                  width={200}
                />

                <GhostButton
                  onPress={() => {
                    changestatus(3);
                  }}
                  style={{ fontSize: 15 }}
                  text="심부름완료"
                  width={200}
                />
              </OrderContainer>
            </CardContainer>
          </>
        );
        break;
      case 3:
        return (
          <>
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.hostinfo.image
                  }}
                />

                <TextContainer>
                  <Title>결제를 기다리는 중입니다! </Title>
                </TextContainer>
              </OrderContainer>

              <OrderContainer>
                <GhostButton
                  onPress={() => {
                    changestatus(2);
                  }}
                  style={{ fontSize: 15 }}
                  text="배송완료취소"
                />
              </OrderContainer>
            </CardContainer>
          </>
        );
        break;
      case 4:
        return (
          <>
            {/*  {this.setModalVisible(true)} */}
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.hostinfo.image
                  }}
                />

                <TextContainer>
                  <Title>거래가 완료되었습니다! </Title>
                </TextContainer>
              </OrderContainer>
              <OrderContainer>
                <GhostButton
                  onPress={() => {
                    this.props.navigation.navigate("ReviewScreen");
                  }}
                  style={{ fontSize: 15 }}
                  text="리뷰하기"
                />
              </OrderContainer>
            </CardContainer>
          </>
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
          <>
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />

                <TextContainer>
                  <Title>러너가 심부름을 준비 중입니다! </Title>
                </TextContainer>
              </OrderContainer>
              <OrderContainer>
                <GhostButton
                  onPress={() => {
                    changestatus(88);
                    this.props.navigation.navigate("BottomNavigation");
                  }}
                  text="요청취소"
                />
              </OrderContainer>
            </CardContainer>
          </>
        );
        break;
      case 2:
        return (
          <>
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />

                <TextContainer>
                  <Title>러너가 심부름 중입니다! </Title>
                </TextContainer>
              </OrderContainer>
            </CardContainer>
          </>
        );

        break;
      case 3:
        return (
          <>
            <CardContainer>
              <OrderContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />

                <TextContainer>
                  <Title>러너가 심부름을 준비 중입니다! </Title>
                </TextContainer>
              </OrderContainer>
              <OrderContainer>
                <GhostButton
                  onPress={() => {
                    changestatus(88);
                    this.props.navigation.navigate("ReviewScreen", {
                      Chat: true
                    });
                  }}
                  text="결제하기"
                />
              </OrderContainer>
            </CardContainer>
          </>
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
    this.getUserId();
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
    console.log("comin", this.props.navigation.getParam("orderId"));
    let orderid;
    if (this.props.navigation.getParam("orderId")) {
      orderid = this.props.navigation.getParam("orderId");
    } else {
      console.log("여기?");
      orderid = await AsyncStorage.getItem("orderid");
    }

    const usertoken = await AsyncStorage.getItem("userToken");

    const getstatus = await serverApi.getChat(orderid, usertoken);
    //const mypage = await serverApi.user(usertoken);

    const { userId } = getstatus.data.data;
    const { orderStatus, hostId, deliverId } = getstatus.data.data.chatDetail;

    //////////-----------------------------------------------> chatlistscreen 에서 저장 후 불러오는 게 더 나을 듯
    const orderstatustext = utils.transferOrderStatus(orderStatus);

    console.log(orderstatustext);

    const { hostInfo, deliverInfo } = getstatus.data.data.chatDetail;

    console.log("유저아이디", userId, orderStatus, hostId, deliverId);

    let whoami = "";
    let avatar;
    let name;
    if (hostId === userId) {
      whoami = "host";
      avatar = hostInfo.image;
      name = hostInfo.nickname;
      this.props.reduxContact(deliverInfo.phone);
    } else {
      whoami = "deliver";
      avatar = deliverInfo.image;
      name = deliverInfo.nickname;
      this.props.reduxContact(hostInfo.phone);
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

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    phone: state.contactReducer.phone
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxContact: phone => dispatch(contactSaver(phone))
  };
};

// Exports
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Chat)
);
