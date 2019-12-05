import React, { useState, useEffect } from "react";
import { ScrollView, AsyncStorage, Alert, SafeAreaView } from "react-native";
import styled from "styled-components";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { AntDesign } from "@expo/vector-icons";
import constants from "../../../constants";
import styles from "../../../styles";
import OrderCard from "../../../components/Cards/OrderCard";
import HomeListCard from "../../../components/Cards/HomeListCard";
import { serverApi } from "../../../components/API";
import Loader from "../../../components/Loader";
import ReviewCard from "../../../components/Cards/ReviewCard";
import { connect } from "react-redux";

const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  font-size: 17;
  margin-bottom: 4px;
`;

const DefaultContainer = styled.View`
  margin-top: -100px;
  width: ${constants.width};
  height: ${constants.height * 0.9};
  background-color: white;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.Text`
  position: relative;
  right: -2;
  top: 3;
  /* padding-right: 12px; */
`;

const View = styled.View``;
const Touchable = styled.TouchableOpacity``;
const ReviewContainer = styled.View`
  width: ${constants.width};

  padding: 14px 12px;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* border-bottom-color: "#47315a"*/
`;

const ReviewButtonText = styled.Text`
  font-size: 13;
  font-weight: 600;
`;

const Divider = styled.View`
  width: ${constants.width};
  /* margin-left: -20px; */
  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const UserHistoryScreen = ({ navigation, ...props }) => {
  //   const getUserToken = await AsyncStorage.getItem("userToken");
  const obj = { 요청내역: 0, 러너내역: 1, 관심목록: 2 };

  const [loading, setLoading] = useState(false);
  const [likeHistory, setLikeHistory] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);
  const [deliverHistory, setDeliverHistory] = useState(null);
  const [isLiked, setIsLiked] = useState(true);
  const title = navigation.getParam("title");
  const [index, setIndex] = useState(obj[title]);

  const [routes, setRoutes] = useState([
    { key: "first", title: "요청내역" },
    { key: "second", title: "러너내역" },
    { key: "third", title: "관심목록" }
  ]);

  const handleClickLikeButton = async orderId => {
    setIsLiked(!isLiked);
    const userToken = await AsyncStorage.getItem("userToken");
    // console.log(`userToken: `, userToken);
    try {
      const postDislikeRequest = await serverApi.userDislikeOrder(
        orderId,
        userToken
      );
      console.log(`라이크 취소 서버요청: `, postDislikeRequest);
    } catch (e) {
      console.log(`Can't post data of userLikeOrder on server. Error: ${e}`);
    }
  };

  const handleClick = data =>
    data.deletedAt
      ? Alert.alert("삭제된 게시글입니다")
      : navigation.navigate("OrderDetailScreen", { orderId: data.orderId });

  // const handleClickReview = () =>
  // if(){
  // navigation.navigate("ReviewScreen", {
  //   orderId: data.orderId,
  //   nickname: data.deliverInfo.nickname,
  //   avatar: data.deliverInfo.image,
  //   university: data.deliverInfo.university,
  //   isDeliver: true
  // });
  //}

  const preLoad = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(`유저토큰: `, userToken);
    try {
      setLoading(true);
      const requestLikeHistory = await serverApi.getLikeHistory(userToken);
      const requestOrderHistory = await serverApi.getOrderHistory(userToken);
      const requestDeliverHistory = await serverApi.getDeliverHistory(
        userToken
      );
      if (
        !requestLikeHistory.data.isSuccess ||
        !requestOrderHistory.data.isSuccess ||
        !requestDeliverHistory.data.isSuccess
      ) {
        Alert.alert(`현재 내역을 불러올 수 없습니다. 잠시후 다시 시도해주세요`);
      } else {
        setOrderHistory([...requestOrderHistory.data.data]);
        setLikeHistory([...requestLikeHistory.data.data]);
        setDeliverHistory([...requestDeliverHistory.data.data]);
      }
      console.log(`관심목록 response: `, requestLikeHistory.data.data);
      console.log(`요청목록 response: `, requestOrderHistory.data.data);
      console.log(`러너목록 response: `, requestDeliverHistory.data.data);
    } catch (e) {
      Alert.alert(
        `현재 관심 목록을 불러올 수 없습니다. 잠시후 다시 시도해주세요`
      );
      console.log(`Can't get user's like-list from server api. Error : ${e} `);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, [isLiked, props.refresh]);

  const _renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={"#1E2227"}
      inactiveColor="#ABB2BB"
      indicatorStyle={{ backgroundColor: "#1E2227" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontSize: 16 }}
    />
  );

  const FirstRoute = () => (
    <ScrollView style={{ flex: 1, backgroundColor: "#f1f3f5" }}>
      {orderHistory && orderHistory.length > 0 ? (
        orderHistory.map((data, i) => {
          console.log(`요청목록 개별 data: `, data);
          return (
            !data.deletedAt && (
              <View key={i}>
                <OrderCard
                  onPress={() => handleClick(data)}
                  createdAt={data.createdAt}
                  {...data}
                />
                {data.orderStatus > 0 && (
                  <ReviewCard
                    isReadable={data.reviews && data.reviews.length > 0}
                    orderId={data.orderId}
                    nickname={data.deliverInfo.nickname}
                    avatar={data.deliverInfo.image}
                    university={data.deliverInfo.university}
                    isDeliver={true}
                  />
                )}
              </View>
            )
          );
        })
      ) : (
        <DefaultContainer
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, color: "#22252a" }}>
            아직 요청한 내역이 없습니다
          </Text>
        </DefaultContainer>
      )}
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{ flex: 1 }}>
      {deliverHistory && deliverHistory.length > 0 ? (
        deliverHistory.map((data, i) => {
          console.log(`data: `, data);
          return (
            !data.deletedAt && (
              <View key={i}>
                <OrderCard
                  onPress={() => handleClick(data)}
                  createdAt={data.createdAt}
                  {...data}
                />
                {data.orderStatus === 4 ||
                  (data.orderStatus === 5 && (
                    <ReviewCard
                      isReadable={data.reviews && data.reviews.length > 0}
                      orderId={data.orderId}
                      nickname={data.hostInfo.nickname}
                      avatar={data.hostInfo.image}
                      university={data.hostInfo.university}
                      isDeliver={false}
                    />
                  ))}
              </View>
            )
          );
        })
      ) : (
        <DefaultContainer
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, color: "#22252a" }}>
            아직 러너로 활동한 내역이 없습니다
          </Text>
        </DefaultContainer>
      )}
    </ScrollView>
  );

  const ThirdRoute = () => (
    <ScrollView style={{ flex: 1 }}>
      {likeHistory && likeHistory.length > 0 ? (
        likeHistory.map(
          (data, i) =>
            data.order && (
              <HomeListCard
                onPress={() => handleClick(data.order)}
                key={i}
                createdAt={data.createdAt}
                {...data.order}
              >
                <Touchable onPress={() => handleClickLikeButton(data.orderId)}>
                  <IconContainer>
                    <AntDesign
                      name="heart"
                      size={26}
                      style={{ color: styles.mainColor }}
                    />
                  </IconContainer>
                </Touchable>
              </HomeListCard>
            )
        )
      ) : (
        <DefaultContainer
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, color: "#22252a" }}>
            현재 관심목록이 없습니다
          </Text>
        </DefaultContainer>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        <TabView
          navigationState={{ index, routes: [...routes] }}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute
          })}
          renderTabBar={_renderTabBar}
          onIndexChange={index => setIndex(index)}
          initialLayout={{ width: constants.width }}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    refresh: state.refreshReducer.refresh
  };
};

export default connect(mapStateToProps, null)(UserHistoryScreen);
