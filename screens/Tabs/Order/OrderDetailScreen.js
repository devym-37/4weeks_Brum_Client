import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GhostButton from "../../../components/Buttons/GhostButton";

import { withNavigation } from "react-navigation";
import MapView from "react-native-maps";
import constants from "../../../constants";
import {
  ScrollView,
  Block,
  StyleSheet,
  Dimensions,
  FlatList,
  AsyncStorage,
  RefreshControl,
  Alert
} from "react-native";
import {
  Content,
  Grid,
  Col,
  Row,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  View,
  Image,
  Button,
  Item,
  Input,
  Spinner
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import MainButton from "../../../components/Buttons/MainButton";
import utils from "../../../utils";
import Mapscreen from "../../../components/MapView";
import useInput from "../../../hooks/useInput";
import FormInput from "../../../components/Inputs/FormInput";

import { serverApi } from "../../../components/API";
import { StringDecoder } from "string_decoder";
import { connect } from "react-redux";

import {
  orderIdSaver,
  imagesSaver,
  timeSaver,
  titleSaver,
  categorySaver,
  isPriceSaver
} from "../../../redux/actions/orderActions";

const OrderDetailScreen = props => {
  //view 추가해야함
  const [region, setRegion] = useState({
    latitude: 37.55737,
    longitude: 127.047132
  });
  //const { isOpen } = this.state;
  const [Loading, setLoading] = useState();
  const [imageurl, setImageurl] = useState(
    "https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg"
  );
  const [arrivals, setArrivals] = useState("");
  const [departures, setDepartures] = useState("한양대 공학관");
  const [details, setDetails] = useState("없음1");
  const [campus, setCampus] = useState("한양대학교");
  const [price, setPrice] = useState("200");
  const [title, setTitle] = useState("심부름하실 분");
  const [msg, setMsg] = useState("안녕하세요");
  const [img, setImg] = useState(
    "https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg"
  );
  const [nickname, setNickname] = useState("nobody");
  const [desiredArrivalTime, setDesiredArrivalTime] = useState("");
  const [createdat, setCreatedat] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [hostId, setHostId] = useState(null);
  const [applicants, setApplicants] = useState(null);
  const [didApply, setDidApply] = useState(false);
  const [isPrice, setIsPrice] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [rmsg, setRmsg] = useState("");
  const [bidprice, setBidprice] = useState("");
  const [orderId, setOrderId] = useState(1);
  const [view, setView] = useState(1);
  const [category, setCategory] = useState("기타");
  const [hostUser, setHostUser] = useState(false);

  const valueBidprice = text => {
    console.log("onchange", text.nativeEvent.text);
    setBidprice(text);
  };

  const valueRmsg = text => {
    console.log("onchange", text.nativeEvent.text);
    setRmsg(text);
  };

  const handelApply = async (val1, val2) => {
    const value1 = val1.value; //bidprice
    const value2 = val2.value; //msg
    // const orderId = 1;
    console.log("entered");
    try {
      setLoading(true);
      const result = await serverApi.apply(value1, value2, userToken, orderId);
      console.log(result.data);
      if (result.data.isSuccess) {
        //return await refresh
        console.log("지원성공", result.data);
        fetchData();
      } else {
        Alert.alert(`지원실패, ${result.data.comment}`);
      }
    } catch (e) {
      console.log("faild", e);
    } finally {
      setLoading(false);
    }
  };

  const handelApplyCancle = async () => {
    try {
      setLoading(true);
      const result = await serverApi.cancelapply(orderId, userToken);
      console.log("hi", result.data.isSuccess);
      if (result.data.isSuccess) {
        //return await refresh
        console.log("취소성공", result.data);
        setDidApply(false);

        fetchData();
      }
    } catch (e) {
      console.log("faild", e);
      Alert.alert("지원취소실패");
    } finally {
      setLoading(false);
    }
  };

  const handelApplymod = async (val1, val2) => {
    const value1 = val1.value; //bidprice
    const value2 = val2.value; //msg
    try {
      setLoading(true);
      const result = await serverApi.reapply(
        value1,
        value2,
        userToken,
        orderId
      );
      console.log(result.data);
      if (result.data.isSuccess) {
        //return await refresh
      }
    } catch (e) {
      console.log("faild", e);
      Alert.alert("지원취소실패");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = () => {
    //redux
    props.reduxTitle(title);
    props.reduxTime(createdat);
    props.reduxIsPrice(isPrice);
    props.reduxCategory(category);
    props.reduxImages(imageurl);
    props.reduxOrderId(orderId);

    props.navigation.navigate("NewOrderScreen");
  };
  const refresh = () => {
    fetchData();
  };

  const handleDeleteOrder = async () => {
    try {
      const result = await serverApi.cancelMyOrder(orderId, userToken);
      console.log(result);

      if (result.data.isSuccess) {
        props.navigation.navigate("BottomNavigation"); //맞나?
      } else {
        Alert.alert("실패했습니다. 다시 시도해 주세요");
      }
      //fetchData();
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    let isCancelled = false;

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      //await AsyncStorage.getItem("userId"); //연결 후 빼기

      const usertoken = await AsyncStorage.getItem("userToken");

      setUserToken(usertoken);
      console.log("orderId프롭스확인", props);

      const oderDetail = await serverApi.orderdetail(props.orderId, usertoken);

      console.log("요청내역", oderDetail);
      const { userId } = oderDetail.data.data;
      const {
        departures,
        arrivals,
        details,
        hostInfo,
        price,
        title,
        createdAt,
        desiredArrivalTime,
        applicants,
        hostId,
        isPrice,
        views,
        category
      } = oderDetail.data.data.order;

      console.log(oderDetail.data.data);

      if (oderDetail.data.isSuccess) {
        console.log("들어옴", hostId);
        console.log(userId);
        setOrderId(props.orderId);
        setDepartures(departures); //departures
        if (arrivals === null) {
          //arrivals
          setArrivals("");
        } else {
          setArrivals(arrivals);
        }
        setCategory(category);
        setView(views);
        setHostId(hostId); //hostid
        setApplicants(applicants); //applicats
        setUserId(userId); //userid
        setDetails(details); //details
        setHostUser(hostId === userId);

        for (let i = 0; i < applicants.length; i++) {
          console.log("지원자목록", applicants[i].userId);

          if (applicants[i].userId === userId) {
            setDidApply(true);
          }
        }

        // console.log(campusList);
        console.log("listcampus", constants.campusList[hostInfo.campus]);
        setCampus(constants.campusList[hostInfo.campus].kor); //campus
        //numberwithcommas
        if (price === null) {
          setPrice("협의");
        } else {
          const getprice = utils.numberWithCommas(price); //price
          setPrice(getprice);
        }

        setIsPrice(isPrice);
        setTitle(title); //title
        setImg(hostInfo.image); // thumbnail
        setNickname(hostInfo.nickname); //nickname
        //createdat
        const time = utils.transferTime(createdAt);
        setCreatedat(time);
        if (desiredArrivalTime === null) {
          //desired arrivaltime
          setDesiredArrivalTime("");
        } else {
          setDesiredArrivalTime(desiredArrivalTime);
        }
      } else {
        Alert.alert("로그인해주세요");
        console.log(oderDetail.data.comment);
      }

      //----- set variables , applicants---
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  renderContent = () => (
    <View style={styles.panel}>
      {!hostUser ? (
        isPrice ? (
          <Item style={{ marginTop: 10 }}>
            <Input
              onChange={text => {
                valueBidprice(text);
              }}
              placeholder="₩가격 제안(선택사항)"
            />
            <Text>
              <Ionicons name="md-checkmark-circle-outline" size={22} />
              {"  "}희망비용 수락
            </Text>
          </Item>
        ) : (
          <Item disabled style={{ marginTop: 10 }}>
            <Input disabled placeholder="가격제안 불가" />
          </Item>
        )
      ) : (
        <></>
      )}
      {!hostUser ? (
        <Item style={{ marginTop: 10 }}>
          <Input
            onChange={text => {
              valueRmsg(text);
            }}
            placeholder="러너의 메세지(선택사항)"
          />
        </Item>
      ) : (
        <></>
      )}
    </View>
  );

  renderHeader = () => (
    /* render */

    <View style={styles.panel}>
      <Row style={{ alignSelf: "center" }}>
        <Ionicons name="md-arrow-dropup-circle" size={35} />
      </Row>
      {!hostUser ? (
        didApply ? (
          <Row>
            <Col style={{ margin: 10 }}>
              <Text
                style={{
                  fontSize: 23,

                  textAlignVertical: "center"
                }}
              >
                ₩ {price}
              </Text>
            </Col>
            <Col style={{ padding: 3 }}>
              <MainButton
                onPress={() => {
                  handelApplymod(bidprice, rmsg);
                }}
                width={290}
                text="수정"
              />
            </Col>
            <Col style={{ padding: 3, marginRight: 30 }}>
              <MainButton onPress={handelApplyCancle} width={290} text="취소" />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col style={{ margin: 10 }}>
              <Text
                style={{
                  fontSize: 23,

                  textAlignVertical: "center"
                }}
              >
                ₩ {price}
              </Text>
            </Col>
            <Col style={{ padding: -10 }}>
              <MainButton
                onPress={() => {
                  handelApply(bidprice, rmsg);
                }}
                width={250}
                text="러너지원하기"
              />
            </Col>
          </Row>
        )
      ) : (
        <Row>
          <Col>
            <MainButton onPress={handleReorder} width={250} text="수정하기" />
          </Col>
          <Col>
            <MainButton
              onPress={handleDeleteOrder}
              width={250}
              text="삭제하기"
            />
          </Col>
        </Row>
      )}
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {Loading ? (
        <Spinner
          style={{
            alignSelf: "center",
            height: Dimensions.get("window").height
          }}
        />
      ) : (
        <Grid>
          <Row>
            <Col>
              <Content style={styles.test}>
                <Mapscreen
                  latitude={region.latitude}
                  longitude={region.longitude}
                />
              </Content>
            </Col>
          </Row>
          <Row>
            <Content>
              {Array.isArray(imageurl) ? (
                <Row>
                  <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    data={imageurl}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item }) => (
                      <Image
                        source={item}
                        resizeMode="contain"
                        style={{ width, height: height / 2.8 }}
                      />
                    )}
                  />
                </Row>
              ) : (
                <></>
              )}

              <Row>
                <Col>
                  <List>
                    <ListItem avatar>
                      <Left>
                        <Thumbnail
                          source={{
                            uri: img
                          }}
                        />
                      </Left>
                      <Body>
                        <Text>{nickname}</Text>
                        <Text note>{campus}</Text>
                      </Body>
                      <Right style={{ alignSelf: "center" }}>
                        <Text style={{ fontSize: 16, marginBottom: 12 }}>
                          매너점수 3.7/5.0
                        </Text>
                      </Right>
                    </ListItem>
                  </List>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{title}</Text>
              </Row>
              <Row>
                <Col>
                  <Text note style={{ margin: 3, marginLeft: 10 }}>
                    {createdat}
                  </Text>
                </Col>
                <Col>
                  <Text
                    note
                    style={{ margin: 3, marginRight: 10, textAlign: "right" }}
                  >
                    {category}
                  </Text>
                </Col>
              </Row>
              <Row style={{ margin: 5, marginLeft: 10 }}>
                <Text note>
                  <Ionicons name="md-disc" />
                  {"   "}
                  출발지 : {arrivals}
                </Text>
              </Row>
              <Row style={{ margin: 5, marginLeft: 10 }}>
                <Text note>
                  <Ionicons name="md-disc" />
                  {"   "}
                  도착지 : {departures}
                </Text>
              </Row>
              <Row style={{ margin: 5, marginLeft: 10 }}>
                <Text note>
                  <Ionicons name="md-stopwatch" /> {"   "}
                  희망도착시간 : {desiredArrivalTime}
                </Text>
              </Row>
              <Row>
                <Text style={{ margin: 10, height: 200 }}>{details}</Text>
              </Row>

              <Row style={styles.bottom}>
                <Text
                  note
                  style={{
                    alignSelf: "flex-start",
                    textAlign: "right",
                    marginLeft: 15
                  }}
                >
                  <Ionicons size={22} name="md-eye">
                    {" "}
                    {view}
                  </Ionicons>
                </Text>
              </Row>
            </Content>

            <BottomSheet
              style={{ backgroundColor: "#f7f5eee8" }}
              snapPoints={[100, 210, 100]}
              renderContent={renderContent}
              renderHeader={renderHeader}
            />
          </Row>
        </Grid>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2
  },
  headerStyle: {
    backgroundColor: "white",
    justifyContent: "center"
    //  marginTop: Platform.OS === "android" ? 20 : 0 // android top-tab statusbar overlap fix
  },
  titleStyle: {
    color: "black"
  },
  panel: {
    backgroundColor: "white"
  },
  test: {
    backgroundColor: "#00000040",
    height: Dimensions.get("window").height / 2
  },
  bottom: {
    height: 150
  }
});

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    title: state.orderReducer.title,
    time: state.orderReducer.desiredArrival,
    isPrice: state.orderReducer.isPrice,
    category: state.orderReducer.category,
    images: state.orderReducer.images,
    orderId: state.orderReducer.orderId
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login

    reduxTitle: title => dispatch(titleSaver(title)),
    reduxTime: time => dispatch(timeSaver(time)), ////
    reduxIsPrice: isPrice => dispatch(isPriceSaver(isPrice)),
    reduxCategory: category => dispatch(categorySaver(category)),
    reduxImages: imageurl => dispatch(imagesSaver(imageurl)),
    reduxOrderId: orderId => dispatch(orderIdSaver(orderId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
