import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { Backdrop } from "react-native-backdrop";
import Checkbox from "react-native-modest-checkbox";
import checkedBox from "../../../assets/checkedBox.png";
import uncheckedBox from "../../../assets/uncheckedBox.png";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import find from "lodash.find";
import FormInput from "../../../components/Inputs/FormInput";
import constants from "../../../constants";
import styles from "../../../styles";
import utils from "../../../utils";
import { serverApi } from "../../../components/API";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width};

  height: ${constants.height / 3};
`;

const UserContainer = styled.View`
  background-color: white;
  /* -top: 12; */
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 15px;
  /* padding-top: 20; */
  align-items: center;
  width: ${constants.width};
  height: ${constants.height / 12};
`;

const Avatar = styled.Image`
  width: 48;
  height: 48;
  border-radius: 20;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserInfoContainer = styled.View`
  padding-left: 16;
`;

const ScoreContainer = styled.View`
  margin-top: 10;
  flex-direction: row;
  justify-content: center;
`;

const UserName = styled.Text`
  font-size: 16;
  font-weight: 500;
  padding-bottom: 4;
`;

const University = styled.Text`
  font-size: 13;
  color: #737b84;
`;

const ScoreLabel = styled.Text`
  color: #737b84;
  padding-right: 10;
  font-size: 15;
  font-weight: 400;
`;

const UserScore = styled.Text`
  color: ${props => props.color};
  margin-top: -4;
  font-weight: 700;
  font-size: 20;
`;

const TotalScore = styled.Text``;

const ApplyButton = styled.View`
  background-color: ${styles.mainColor};
  margin: 0;
  padding: 14px 10px;
  width: ${props => constants.width - props.width};
  border-radius: 4px;
`;
const EditButton = styled.View`
  background-color: ${props =>
    props.disabled ? styles.inActiveColor : styles.mainColor};
  margin-left: 8px;
  padding: 14px 10px;
  width: ${props => constants.width - props.width};
  border-radius: 4px;
`;
const DeleteButton = styled.View`
  border: 1px;
  border-color: ${props =>
    props.disabled ? styles.inActiveColor : styles.mainColor};
  margin-left: 8px;
  padding: 14px 10px;
  width: ${props => constants.width - props.width};
  border-radius: 4px;
`;

const DeleteButtonText = styled.Text`
  color: ${props => (props.disabled ? styles.inActiveColor : styles.mainColor)};
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;
const EditButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  /* color: ${props => (props.disabled ? "#E8E2E4" : "white")}; */
  color : white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;
const OrderContentContainer = styled.View`
  background-color: white;
  width: ${constants.width};
  padding: 0 15px;
  padding-top: 20;
`;

const Divider = styled.View`
  width: ${constants.width - 30};
  height: 1px;
  color: ${styles.lightGreyColor};
`;

const OrderTitle = styled.Text`
  color: #333;
  font-size: 20;
  font-weight: 600;
  padding-bottom: 8;
`;

const TimeStamp = styled.Text`
  color: #737b84;
  font-size: 15;
  margin-bottom: 24;
`;
const DepartureContainer = styled.View`
  flex-direction: row;
  /* flex-wrap: wrap; */
  align-items: center;
`;
const ArrivalContainer = styled.View`
  flex-direction: row;
  /* flex-wrap: wrap; */
  align-items: center;
  margin-bottom: 24;
`;

const Address = styled.Text`
  color: #737b84;
  font-size: 13;
  margin-left: 4;
  padding-left: 4;
`;
const Message = styled.Text`
  font-size: 16;
  color: #333;
  margin-bottom: 24;
  line-height: 24;
`;
const CountContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24;
`;

const Count = styled.Text`
  color: #818992;
  font-size: 15;
`;
const PriceContainer = styled.View``;

const Price = styled.Text`
  font-size: 20;
  font-weight: 500;
  padding-bottom: 4;
`;

const PriceOption = styled.Text`
  font-size: 14;
  font-weight: 300;
`;
const BottomContainer = styled.View`
  justify-content: center;
  bottom: 0;
  position: relative;
  align-items: center;
  background-color: #feffff;
  width: ${props =>
    props.width ? constants.width - props.width : constants.width};
  height: ${constants.height / 10};
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.04);
`;

const ContentContainer = styled.View`
  flex-direction: row;
  padding: 0 20px;

  width: ${constants.width};
  align-items: center;
  justify-content: space-between;
`;

const MarginContentContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  padding: 0 20px;
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.04);
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;
`;

const VerticalDivider = styled.View`
  background-color: #d0d6dc;
  width: 1;
  height: 32;
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// const Text = styled.Text``;
const TextDivider = styled.Text`
  padding: 0 6px;
  color: #818992;
`;

const IconContainer = styled.Text`
  padding-left: 12px;
`;

const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;

const DropContainer = styled.View`
  width: 200;
  justify-content: center;
  padding-bottom: 30;
  height: 200;
`;
const OrderDetailScreen = ({ id }) => {
  const [orderId, setorderId] = useState(id);
  const [userToken, setUserToken] = useState();
  const [isHost, setIsHost] = useState(false);
  const [isRunner, setIsRunner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [runnerMessage, setRunnerMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const avatar = data && data.hostInfo.image;
  const username = data && data.hostInfo.nickname;
  const university =
    data &&
    (data.hostInfo.university ? data.hostInfo.university : "미인증 회원");
  const score = data && utils.avgOfScores(data.hostInfo.getScore);
  const color = utils.scoreColorPicker(score);
  const price =
    data &&
    (data.price ? utils.numberWithCommas(data.price) + "원" : "비용협의");

  const isPrice = data && data.isPrice;
  const mapScreen =
    "https://miro.medium.com/max/2688/1*RKpCRwFy6hyVCqHcFwbCWQ.png";
  const title = data && data.title;
  const timeStamp = data && utils.transferTime(data.createdAt);
  const message = data && data.details;
  const numOfApplicants = data && utils.numOfScores(data.hostInfo.getScore);
  const likes = 0;
  const views = data && data.views;
  const departure = data && (data.departures ? data.departures : "없음");
  const arrival = data && (data.arrivals ? data.arrivals : "없음");

  const handleClickLikeButton = async () => {
    setIsLiked(!isLiked);
    console.log(`userToken: `, userToken);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!isLiked) {
        const postRequest = await serverApi.userLikeOrder(orderId, userToken);
        console.log(`라이크 서버요청: `, postRequest);
      } else {
        const postDislikeRequest = await serverApi.userDislikeOrder(
          orderId,
          userToken
        );
        console.log(`라이크 취소 서버요청: `, postDislikeRequest);
      }
    } catch (e) {
      console.log(`Can't post data of userLikeOrder on server. Error: ${e}`);
    }
  };
  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleApplyButton = async () => {
    if (isPrice) {
      // Alert.alert("백드롭열림");
      //const request = await serverApi.apply(null, null, //userToken, orderId);
      setVisible(true);
    } else {
      try {
        setLoading(true);
        // const orderId = navigation.getParam("orderId");
        const request = await serverApi.apply(null, null, userToken, orderId);
        //console.log("지원했습니다", request);
      } catch (e) {
        console.log(`Can't post data of applying on server. Error : `, e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const result = await serverApi.cancelMyOrder(orderId, userToken);
      console.log(`delete : `, result);

      if (result.data.isSuccess) {
        const resetAction = StackActions.reset({
          key: null,
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        });

        navigation.dispatch(resetAction);
      } else {
        Alert.alert("실패했습니다. 다시 시도해 주세요");
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleEdit = () => {
    Alert.alert("Edit!");
  };

  const preLoad = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setUserToken(userToken);
    const data = await serverApi.orderdetail(orderId, userToken);
    setData({ ...data.data.data.order });
    console.log(
      `data.data.data.order.userLikeOrders: `,
      data.data.data.order.userLikeOrders
    );

    const userId = data.data.data.userId;
    console.log(userId);
    const userLikeOrderList = data.data.data.order.userLikeOrders;
    if (
      userLikeOrderList.length === 0 ||
      find(userLikeOrderList, obj => obj.userId === userId) === undefined
    ) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
    // setIsLiked()
    if (userId === data.data.data.order.hostId) {
      setIsHost(true);
    } else if (
      find(
        data.data.data.order.applicants,
        obj => obj.userId === data.data.data.userId
      )
    ) {
      setIsRunner(true);
    }

    console.log(
      `호스트인가요? `,
      data.data.data.userId === data.data.data.order.hostId
    );
    console.log(
      `러너인가요? `,
      find(
        data.data.data.order.applicants,
        obj => obj.userId === data.data.data.userId
      )
    );
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={preLoad} />
          }
        >
          <Container>
            <Image source={{ uri: mapScreen }} />
            <UserContainer>
              <ProfileContainer>
                <Avatar source={{ uri: avatar }} />
                <UserInfoContainer>
                  <UserName>{username}</UserName>
                  <University>{university}</University>
                </UserInfoContainer>
              </ProfileContainer>
              <ScoreContainer>
                <ScoreLabel>매너 점수</ScoreLabel>
                <AntDesign
                  name={score > 3.4 ? "smileo" : score > 2.4 ? "meh" : "frowno"}
                  size={32}
                  style={{ color, marginRight: 8, marginTop: -6 }}
                />
                <UserScore color={color}>{score}</UserScore>
                <TotalScore>{` / 5.0`}</TotalScore>
              </ScoreContainer>
            </UserContainer>
            <Divider />
            <OrderContentContainer>
              <OrderTitle>{title}</OrderTitle>
              <TimeStamp>{timeStamp}</TimeStamp>
              <DepartureContainer>
                <FontAwesome
                  name="dot-circle-o"
                  size={22}
                  style={{ color: "#D0D6DC", paddingLeft: 2, paddingRight: 4 }}
                />
                <Address>{`출발지 : ${departure}`}</Address>
              </DepartureContainer>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                style={{ color: "#D0D6DC", paddingLeft: 2 }}
              />
              <ArrivalContainer>
                <AntDesign
                  name="enviroment"
                  size={24}
                  style={{ color: "#D0D6DC" }}
                />
                <Address>{`도착지 : ${arrival}`}</Address>
              </ArrivalContainer>
              <Message>{message}</Message>
              <CountContainer>
                <Count>{`지원 ${numOfApplicants}`}</Count>
                <TextDivider>･</TextDivider>
                <Count>{`관심 ${likes}`}</Count>
                <TextDivider>･</TextDivider>
                <Count>{`조회 ${views}`}</Count>
              </CountContainer>
            </OrderContentContainer>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderDetailScreen;
