import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Keyboard
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
import { connect } from "react-redux";
import { serverApi } from "../../../components/API";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import VerifiedAccountBadge from "../../../components/VerifiedAccountBadge";
import MapView from "../../../components/DetailMap";
import {
  arrivalPositionSave,
  departurePositionSave
} from "../../../redux/actions/orderPositionActions";
import {
  departureLocationSave,
  arrivalLocationSave
} from "../../../redux/actions/destinationAction";

import {
  categorySaver,
  isPriceSaver,
  priceSaver,
  timeSaver,
  titleSaver,
  detailsSaver,
  photoRemover,
  imagesSaver
} from "../../../redux/actions/orderActions";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width};

  height: ${constants.height / 4};
`;
const MapContainer = styled.View`
  width: ${constants.width};
  height: ${constants.height / 4};
`;

const UserContainer = styled.View`
  background-color: white;
  margin-top: 12;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
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
  font-size: 13;
  margin-top: 2;
  font-weight: 400;
`;

const UserScore = styled.Text`
  color: ${props => props.color};
  margin-top: -4;
  font-weight: 700;
  font-size: 20;
`;

const TotalScore = styled.Text`
  font-size: 13;
  font-weight: 300;
`;

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
  z-index: 999;
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
  /* margin-right: 6; */
  margin-bottom: 12;
`;

const CategoryStamp = styled.Text`
  color: #737b84;
  font-size: 15;
  /* margin-right: 6; */
  margin-bottom: 11;
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
  margin-bottom: 16;
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
  margin-bottom: 16;
  line-height: 24;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24;
  align-items: center;
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

const CategoryDivider = styled.Text`
  padding: 0 4px;
  margin-bottom: 12;
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
  /* padding-bottom: 300; */
  margin-bottom: ${props => (props.onFocused ? 300 : 30)};
  height: 200;
`;
const OrderDetailScreen = ({ navigation, ...props }) => {
  const [fetchData, setFetchData] = useState(false);
  const [orderId, setorderId] = useState(navigation.getParam("orderId"));
  const [onFocus, setOnFocus] = useState(false);
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
  const numOfScore = data && utils.numOfScores(data.hostInfo.getScore);
  const color = utils.scoreColorPicker(score);
  const price =
    data && data.price !== "null"
      ? utils.numberWithCommas(data.price) + "원"
      : "비용협의";

  const isPrice = data && data.isPrice;
  const mapScreen =
    data &&
    (data.orderImages.length > 0
      ? data.orderImages[0].orderImageURL
      : "https://miro.medium.com/max/2688/1*RKpCRwFy6hyVCqHcFwbCWQ.png");
  const image =
    data &&
    (data.orderImages.length > 1 ? data.orderImages[1].orderImageURL : null);
  const depLat = data && (data.depLat !== "null" ? data.depLat : null);
  const depLng = data && (data.depLng !== "null" ? data.depLng : null);

  const arrLat = data && (data.arrLat !== "null" ? data.arrLat : null);
  const arrLng = data && (data.arrLng !== "null" ? data.arrLng : null);

  const title = data && data.title;
  const category = data && data.category;
  const timeStamp = data && utils.transferTime(data.createdAt);
  const message = data && data.details !== "null" ? data.details : "";
  const numOfApplicants = data && utils.numOfScores(data.applicants);
  const likes = data && data.userLikeOrders.length;
  const views = data && data.views;
  const departure =
    data && data.departures !== "null" ? data.departures : "없음";
  const arrival = data && (data.arrivals ? data.arrivals : "없음");
  const desiredArrivalTime =
    data &&
    (data.desiredArrivalTime !== "null" &&
    data.desiredArrivalTime.substr(0, 1) !== "0"
      ? utils.transferDesiredArrivalTime(data.desiredArrivalTime)
      : "시간 상관없음");

  const handleClickLikeButton = async () => {
    setIsLiked(!isLiked);
    // console.log(`userToken: `, userToken);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!isLiked) {
        const postRequest = await serverApi.userLikeOrder(orderId, userToken);
        // console.log(`라이크 서버요청: `, postRequest);
      } else {
        const postDislikeRequest = await serverApi.userDislikeOrder(
          orderId,
          userToken
        );
        // console.log(`라이크 취소 서버요청: `, postDislikeRequest);
      }
    } catch (e) {
      console.log(`Can't post data of userLikeOrder on server. Error: ${e}`);
    }
  };

  const handleOnFocus = () => {
    // console.log(`포커스 됐다`);
    !onFocus && setOnFocus(true);
  };
  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    // Keyboard.dismiss();
    setVisible(false);
    setOnFocus(false);
  };

  const handleApplyButton = async () => {
    // console.log(`arrLat: `, arrLat);
    if (isPrice) {
      setVisible(true);
    } else {
      try {
        setLoading(true);
        // const orderId = navigation.getParam("orderId");
        let request = await serverApi.apply(null, null, userToken, orderId);
        if (request.data.isSuccess) {
          Alert.alert("지원이 완료 되었습니다. 요청자의 선택을 기다려주세요");
          // navigation.goBack(null);
        } else {
          Alert.alert("이미 지원한 요청입니다");
        }
        // console.log("가격불가 지원했습니다", request.data);
      } catch (e) {
        Alert.alert("현재 지원이 불가능한 요청입니다");
        console.log(`Can't post data of applying on server. Error : `, e);
      } finally {
        setLoading(false);
        setFetchData(!fetchData);
      }
    }
  };

  const handleApplyButtonWithPrice = async () => {
    try {
      setLoading(true);
      // const orderId = navigation.getParam("orderId");
      let request = await serverApi.apply(
        bidPrice,
        runnerMessage,
        userToken,
        orderId
      );
      if (request.data.isSuccess) {
        Alert.alert("지원이 완료 되었습니다. 요청자의 선택을 기다려주세요");
        setVisible(false);
      } else {
        Alert.alert("이미 지원한 요청입니다");
      }
      // console.log("가격협의 지원했습니다", request);
    } catch (e) {
      Alert.alert("현재 지원이 불가능한 요청입니다");
      console.log(`Can't post data of applying on server. Error : `, e);
    } finally {
      setLoading(false);
      setFetchData(!fetchData);
      // navigation.goBack(null);
    }
  };

  const handleCancelApplyButton = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const request = await serverApi.cancelApply(orderId, userToken);
      // console.log(`요청 취소! request: `, request);
      if (request.data.isSuccess) {
        Alert.alert("지원이 취소되었습니다");
      } else {
        Alert.alert("실패했습니다. 다시 시도해 주세요");
      }
    } catch (e) {
      console.log(`Can't cancel apply. Error: ${e}`);
    } finally {
      setIsRunner(false);
      setFetchData(!fetchData);
    }
  };
  const handleDelete = async () => {
    try {
      const result = await serverApi.cancelMyOrder(orderId, userToken);
      // console.log(`delete : `, result);

      if (result.data.isSuccess) {
        navigation.navigate("Home", { fetchData: true });
      } else {
        Alert.alert("실패했습니다. 다시 시도해 주세요");
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const handleEdit = () => {
    data && data.price !== "null" && props.reduxPrice(data.price);
    props.reduxIsPrice(data.isPrice);
    props.reduxCategory(data.category);
    props.reduxDetails(data.details);
    props.reduxTitle(data.title);
    props.reduxTime(data.desiredArrivalTime);
    data.departures && props.reduxDepartureLocation(data.departures);
    console.log(`도착지!!:`, data.arrivals);
    props.reduxArrivalLocation(data.arrivals);
    data &&
      data.orderImages.length > 1 &&
      props.reduxImages([...data.orderImages[1].orderImageURL]);
    navigation.navigate("NewOrderNavigation", { title: "수정하기" });
  };

  const handleChangeMessage = value => {
    // console.log(`Message : `, value);
    setRunnerMessage(value);
  };

  const handleChangePrice = value => {
    // console.log(`bidPrice: `, value);
    setBidPrice(utils.numberWithCommas(value));
  };

  const preLoad = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setUserToken(userToken);
    const data = await serverApi.orderdetail(orderId, userToken);
    setData({ ...data.data.data.order });
    console.log(`data.data.data.order : `, data.data.data.order);
    // console.log(
    //   `data.data.data.order.userLikeOrders: `,
    //   data.data.data.order.userLikeOrders
    // );

    const userId = data.data.data.userId;
    // console.log(`userId: `, userId);
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
      find(data.data.data.order.applicants, obj => obj.userId === userId)
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
  }, [fetchData]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={preLoad} />
          }
        >
          <Container>
            <MapContainer>
              <MapView
                latitude={Number(arrLat)}
                longitude={Number(arrLng)}
                arrLat={Number(arrLat)}
                arrLng={Number(arrLng)}
                depLat={Number(depLat)}
                depLng={Number(depLng)}
                orderDetail={true}
              />
            </MapContainer>
            <UserContainer>
              <ProfileContainer>
                <Avatar source={{ uri: avatar }} />
                <UserInfoContainer>
                  <UserName>{username}</UserName>
                  {/* <University>{university}</University> */}
                  {data &&
                    (data.hostInfo.university ? (
                      <VerifiedAccountBadge
                        fontSize={13}
                        color={"#737b84"}
                        iconSize={10}
                        campus={data.hostInfo.university}
                      />
                    ) : (
                      <University>미인증 회원</University>
                    ))}
                </UserInfoContainer>
              </ProfileContainer>
              <ScoreContainer>
                <ScoreLabel>매너 점수</ScoreLabel>
                <AntDesign
                  name={
                    score > 3.4
                      ? "smileo"
                      : score > 2.4
                      ? "meh"
                      : score === 0
                      ? "smileo"
                      : "frowno"
                  }
                  size={32}
                  style={{ color, marginRight: 8, marginTop: -6 }}
                />
                <UserScore color={color}>{score === 0 ? "-" : score}</UserScore>
                <TotalScore>{` / 5.0 (${numOfScore}개)`}</TotalScore>
              </ScoreContainer>
            </UserContainer>
            <Divider />
            <OrderContentContainer>
              <OrderTitle>{title}</OrderTitle>
              <CategoryContainer>
                <CategoryStamp>{category}</CategoryStamp>
                <CategoryDivider>･</CategoryDivider>
                <TimeStamp>{timeStamp}</TimeStamp>
              </CategoryContainer>

              <DepartureContainer>
                <FontAwesome
                  name="dot-circle-o"
                  size={22}
                  style={{
                    color: "#D0D6DC",
                    paddingLeft: 2,
                    paddingRight: 4
                  }}
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
              <ArrivalContainer>
                <AntDesign
                  name="clockcircleo"
                  size={18}
                  style={{
                    color: "#D0D6DC",
                    paddingTop: 1,
                    paddingLeft: 3,
                    paddingRight: 2
                  }}
                />
                <Address>{`${desiredArrivalTime}`}</Address>
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
        <BottomContainer>
          <ContentContainer>
            {isHost ? (
              data.deliverId ? (
                <>
                  <IconContainer>
                    <AntDesign
                      name="hearto"
                      size={26}
                      style={{ color: styles.inActiveColor }}
                    />
                  </IconContainer>

                  <VerticalDivider />
                  <PriceContainer>
                    <Price>{price}</Price>
                    <PriceOption>
                      {isPrice ? "가격제안 가능" : "가격제안 불가"}
                    </PriceOption>
                  </PriceContainer>
                  <EditButtonContainer>
                    <DeleteButton width={300} disabled={true}>
                      <DeleteButtonText disabled={true}>삭제</DeleteButtonText>
                    </DeleteButton>

                    <EditButton disabled={true} width={300}>
                      <ButtonText disabled={true}>수정</ButtonText>
                    </EditButton>
                  </EditButtonContainer>
                </>
              ) : (
                <>
                  <IconContainer>
                    <AntDesign
                      name="hearto"
                      size={26}
                      style={{ color: "#E8E2E4" }}
                    />
                  </IconContainer>

                  <VerticalDivider />
                  <PriceContainer>
                    <Price>{price}</Price>
                    <PriceOption>
                      {isPrice ? "가격제안 가능" : "가격제안 불가"}
                    </PriceOption>
                  </PriceContainer>
                  <EditButtonContainer>
                    <Touchable onPress={handleDelete}>
                      <DeleteButton width={300}>
                        <DeleteButtonText>삭제</DeleteButtonText>
                      </DeleteButton>
                    </Touchable>
                    <Touchable onPress={handleEdit}>
                      <EditButton width={300}>
                        <ButtonText>수정</ButtonText>
                      </EditButton>
                    </Touchable>
                  </EditButtonContainer>
                </>
              )
            ) : isRunner ? (
              <>
                <Touchable onPress={handleClickLikeButton}>
                  <IconContainer>
                    {isLiked ? (
                      <AntDesign
                        name="heart"
                        size={26}
                        style={{ color: styles.mainColor }}
                      />
                    ) : (
                      <AntDesign
                        name="hearto"
                        size={26}
                        style={{ color: styles.mainColor }}
                      />
                    )}
                  </IconContainer>
                </Touchable>
                <VerticalDivider />
                <PriceContainer>
                  <Price>{price}</Price>
                  <PriceOption>
                    {isPrice ? "가격제안 가능" : "가격제안 불가"}
                  </PriceOption>
                </PriceContainer>
                <Touchable onPress={handleCancelApplyButton}>
                  <DeleteButton width={250}>
                    <DeleteButtonText>러너 지원취소</DeleteButtonText>
                  </DeleteButton>
                </Touchable>
              </>
            ) : (
              <>
                <Touchable onPress={handleClickLikeButton}>
                  <IconContainer>
                    {isLiked ? (
                      <AntDesign
                        name="heart"
                        size={26}
                        style={{ color: styles.mainColor }}
                      />
                    ) : (
                      <AntDesign
                        name="hearto"
                        size={26}
                        style={{ color: styles.mainColor }}
                      />
                    )}
                  </IconContainer>
                </Touchable>
                <VerticalDivider />
                <PriceContainer>
                  <Price>{price}</Price>
                  <PriceOption>
                    {isPrice ? "가격제안 가능" : "가격제안 불가"}
                  </PriceOption>
                </PriceContainer>
                <Touchable onPress={handleApplyButton}>
                  <ApplyButton width={250}>
                    <ButtonText>러너 지원하기</ButtonText>
                  </ApplyButton>
                </Touchable>
              </>
            )}
          </ContentContainer>
        </BottomContainer>

        <Backdrop
          visible={visible}
          handleOpen={handleOpen}
          handleClose={handleClose}
          swipeConfig={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 30
          }}
          animationConfig={{
            speed: 6,
            bounciness: 4
          }}
          overlayColor="rgba(0,0,0,0.32)"
          backdropStyle={{
            backgroundColor: "#fff",
            justifyContent: "flex-start"
          }}
        >
          <DropContainer onFocused={onFocus}>
            <>
              <BottomContainer width={40}>
                <FormInput
                  onFocus={handleOnFocus}
                  placeholder={"₩ 희망 배달금액(선택사항)"}
                  width={140}
                  dividerWidth={40}
                  dividerColor={"#e8ecef"}
                  value={bidPrice}
                  isUnderline={true}
                  onChange={e => handleChangePrice(e)}
                  keyboardType="numeric"
                  maxLength={7}
                >
                  <Checkbox
                    label="희망비용 수락"
                    checkboxStyle={{ height: 22, width: 22 }}
                    labelStyle={{ color: "#1D2025", marginLeft: -4 }}
                    checked={checked}
                    containerStyle={{
                      width: 110,
                      marginLeft: -8
                    }}
                    checkedImage={checkedBox}
                    uncheckedImage={uncheckedBox}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                  />
                </FormInput>
                <Divider />
                <FormInput
                  onFocus={handleOnFocus}
                  placeholder={"메세지(선택사항)"}
                  dividerColor={"#e8ecef"}
                  width={50}
                  dividerWidth={40}
                  value={runnerMessage}
                  onChange={e => handleChangeMessage(e)}
                  isUnderline={true}
                />
                <Divider />
                <MarginContentContainer>
                  <>
                    <Touchable onPress={() => setIsLiked(!isLiked)}>
                      <IconContainer>
                        {isLiked ? (
                          <AntDesign
                            name="heart"
                            size={26}
                            style={{ color: styles.mainColor }}
                          />
                        ) : (
                          <AntDesign
                            name="hearto"
                            size={26}
                            style={{ color: styles.mainColor }}
                          />
                        )}
                      </IconContainer>
                    </Touchable>
                    <VerticalDivider />
                    <PriceContainer>
                      <Price>{price}</Price>
                      <PriceOption>
                        {isPrice ? "가격제안 가능" : "가격제안 불가"}
                      </PriceOption>
                    </PriceContainer>
                    <Touchable onPress={handleApplyButtonWithPrice}>
                      <ApplyButton width={250}>
                        <ButtonText>러너 지원하기</ButtonText>
                      </ApplyButton>
                    </Touchable>
                  </>
                </MarginContentContainer>
              </BottomContainer>
            </>
          </DropContainer>
        </Backdrop>
      </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxDeleteImages: () => dispatch(photoRemover()),
    reduxLogin: trueFalse => dispatch(login(trueFalse)),
    reduxTitle: title => dispatch(titleSaver(title)),
    reduxTime: time => dispatch(timeSaver(time)),
    reduxPrice: price => dispatch(priceSaver(price)),
    reduxIsPrice: isPrice => dispatch(isPriceSaver(isPrice)),
    reduxChecked: () => dispatch(isPriceSaver()),
    reduxDetails: message => dispatch(detailsSaver(message)),
    reduxCategory: category => dispatch(categorySaver(category)),
    reduxImages: images => dispatch(imagesSaver(images)),
    reduxArrivalLocation: arrival => dispatch(arrivalLocationSave(arrival)),
    reduxDepartureLocation: departureLocation =>
      dispatch(departureLocationSave(departureLocation)),
    reduxArrivalPosition: arrival => dispatch(arrivalPositionSave(arrival)),
    reduxDeparturePosition: departurePosition =>
      dispatch(departurePositionSave(departurePosition))
  };
};

export default connect(null, mapDispatchToProps)(OrderDetailScreen);
