import React from "react";
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
const CardContainer = styled.View`
  width: ${constants.width};

  padding: 0 3px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  /* border-bottom-color: "#47315a"*/
`;

const Thumbnail = styled.Image`
  width: 67;
  height: 67;
  border-radius: 16;
  margin-right: 6;
`;
const ChatColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
`;
const HeaderButtonContainer = styled.View`
  background-color: ${styles.mainColor};
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
const Divider = styled.View`
  width: ${constants.width};
  /* margin-left: -20px; */
  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
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
      accessoryOpen:false
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
                image:null
              })
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
            alwaysShowSend = {true}
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
    return (this.state.image && (
      <Image 
      style={{
        width: 80,
        height: 80
      }}
      source={{ uri: this.state.image }}
      />)
      
      )
  }; 

  renderInputToolbar =() =>{
    return(
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
          }}>

        </View>
      </View>
    )
  } 

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
          const text = await serverApi.geturl(this.state.orderId,this.state.usertoken,result.uri).then(
            res=>{

              const result = res.json()
              console.log(result)
            }
            
           
          )
          console.log("업로드한사진",text)

          this.setState({
            image: url,
            accessoryOpen: true
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
          style={{ alignSelf: "center", fontSize: 30,marginRight:5 }}
        />
        
                {this.state.image &&(
         <Ionicons
         delayLongPress={10} onLongPress={()=>{this.setState({image: null})}} 
         name="md-image"
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
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title>심부름을 시작해주세요! </Title>
                  <ChatColumn>
                    <HeaderButtonContainer>
                      <HeaderButton
                        onPress={() => {
                          changestatus(2);
                        }}
                        style={{ fontSize: 15 }}
                      >
                        심부름시작
                      </HeaderButton>
                    </HeaderButtonContainer>
                    <HeaderButtonContainer>
                      <HeaderButton
                        onPress={() => {
                          changestatus(99);
                          this.props.navigation.navigate("BottomNavigation");
                        }}
                        style={{ fontSize: 15 }}
                      >
                        러너 취소하기
                      </HeaderButton>
                    </HeaderButtonContainer>
                  </ChatColumn>
                </TextContainer>
              </ContentContainer>
            </CardContainer>
          </>
        );
        break;
      case 2:
        return (
          <>
            <CardContainer>
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title>심부름 중입니다! </Title>
                  <ChatColumn>
                    <HeaderButtonContainer>
                      <HeaderButton
                        onPress={() => {
                          changestatus(1);
                        }}
                        style={{ fontSize: 15 }}
                      >
                        심부름 대기
                      </HeaderButton>
                    </HeaderButtonContainer>
                    <HeaderButtonContainer>
                      <HeaderButton
                        onPress={() => {
                          changestatus(3);
                        }}
                        style={{ fontSize: 15 }}
                      >
                        심부름완료
                      </HeaderButton>
                    </HeaderButtonContainer>
                  </ChatColumn>
                </TextContainer>
              </ContentContainer>
            </CardContainer>
          </>
        );
        break;
      case 3:
        return (
          <>
            <CardContainer>
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title>결제를 기다리는 중입니다! </Title>
                  <HeaderButtonContainer>
                    <HeaderButton
                      onPress={() => {
                        changestatus(2);
                      }}
                      style={{ fontSize: 15 }}
                    >
                      배송완료취소
                    </HeaderButton>
                  </HeaderButtonContainer>
                </TextContainer>
              </ContentContainer>
            </CardContainer>
          </>
        );
        break;
      case 4:
        return (
          <>
            {/*  {this.setModalVisible(true)} */}
            <CardContainer>
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title> 거래가 완료되었습니다! </Title>
                  <HeaderButtonContainer>
                    <HeaderButton style={{ fontSize: 15 }}>
                      문의하기
                    </HeaderButton>
                  </HeaderButtonContainer>
                </TextContainer>
              </ContentContainer>
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
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title>러너가 심부름을 준비 중입니다! </Title>
                  <HeaderButtonContainer>
                    <HeaderButton
                      onPress={() => {
                        changestatus(88);
                        this.props.navigation.navigate("BottemNavigation")
                      }}
                    >
                      요청 취소
                    </HeaderButton>
                  </HeaderButtonContainer>
                </TextContainer>
              </ContentContainer>
            </CardContainer>
          </>
        );
        break;
      case 2:
        return (
          <>
            <CardContainer>
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title>러너가 심부름 중입니다! </Title>
                </TextContainer>
              </ContentContainer>
            </CardContainer>
          </>
        );

        break;
      case 3:
        return (
          <>
            <CardContainer>
              <ContentContainer>
                <Thumbnail
                  source={{
                    uri: this.state.deliverinfo.image
                  }}
                />
                <TextContainer>
                  <Title>러너가 심부름을 완료했습니다! </Title>
                  <HeaderButtonContainer>
                    <HeaderButton
                      onPress={() => {
                       // changestatus(88);
                        this.props.navigation.navigate("ReviewCard");
                      }}
                    >
                      결제하기
                    </HeaderButton>
                  </HeaderButtonContainer>
                </TextContainer>
              </ContentContainer>
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
