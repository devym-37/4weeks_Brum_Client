import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GhostButton from "../../../components/Buttons/GhostButton";

import { withNavigation } from "react-navigation";
import MapView from "react-native-maps";
//import constants from "../../constants";
import {
  ScrollView,
  Block,
  StyleSheet,
  Dimensions,
  FlatList,
  AsyncStorage,
  RefreshControl
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
import Mapscreen from "../../../components/MapScreen";

import { serverApi } from "../../../components/API";

const OderDetailScreen = props => {
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
  const refresh = async () => {
    try {
      setRefreshing(true);
      //await AsyncStorage.getItem("userId"); //연결 후 빼기

      //const usertoken = await AsyncStorage.getItem("userToken");
      //await AsyncStorage.getItem("userId"); //연결 후 빼기

      const usertoken = await AsyncStorage.getItem("userToken");

      const orderId = 1;

      const oderDetail = await serverApi.oderdetail(orderId, usertoken);

      const { userId } = oderDetail.data.data.userId;

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
        hostId
      } = oderDetail.data.data.order;

      console.log(oderDetail.data.data.order);
      console.log("hk", departures);
      if (oderDetail.data.isSuccess) {
        console.log("들어옴");

        setDepartures(departures);
        if (arrivals === null) {
          setArrivals("");
        } else {
          setArrivals(arrivals);
        }

        setHostId(hostId);
        setApplicants(applicants);
        setUserId(userId);
        setDetails(details);
        setCampus(hostInfo.campus);
        //numberwithcommas
        const getprice = utils.numberWithCommas(price);
        setPrice(getprice);
        setTitle(title);
        setImg(hostInfo.image);
        setNickname(hostInfo.nickname);

        //createdat
        const time = utils.transferTime(createdAt);
        setCreatedat(time);
        if (desiredArrivalTime === null) {
          setDesiredArrivalTime("");
        } else {
          setDesiredArrivalTime(desiredArrivalTime);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Create an scoped async function in the hook
    let isCancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        //await AsyncStorage.getItem("userId"); //연결 후 빼기

        const usertoken = await AsyncStorage.getItem("userToken");

        const orderId = 1;

        const oderDetail = await serverApi.oderdetail(orderId, usertoken);

        const { userId } = oderDetail.data.data.userId;
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
          isPrice
        } = oderDetail.data.data.order;

        console.log(oderDetail.data.data.order);

        if (oderDetail.data.isSuccess) {
          console.log("들어옴");

          setDepartures(departures); //departures
          if (arrivals === null) {
            //arrivals
            setArrivals("");
          } else {
            setArrivals(arrivals);
          }
          setHostId(hostId); //hostid
          setApplicants(applicants); //applicats
          setUserId(userId); //userid
          setDetails(details); //details
          setCampus(hostInfo.campus); //campus
          //numberwithcommas
          const getprice = utils.numberWithCommas(price); //price
          setPrice(getprice);
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
        }

        //----- set variables , applicants---
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  renderContent = () => (
    <View style={styles.panel}>
      {isPrice ? (
        <Item style={{ marginTop: 10 }}>
          <Input placeholder="₩가격 제안(선택사항)" />
          <Text>
            <Ionicons name="md-checkmark-circle-outline" size={22} />
            {"  "}희망비용 수락
          </Text>
        </Item>
      ) : (
        <Item disabled style={{ marginTop: 10 }}>
          <Input disabled placeholder="가격제안 불가" />
          <Text>
            <Ionicons name="md-checkmark-circle-outline" size={22} />
            {"  "}희망비용 수락
          </Text>
        </Item>
      )}

      <Item style={{ marginTop: 10 }}>
        <Input placeholder="러너의 메세지(선택사항)" />
      </Item>
    </View>
  );

  renderHeader = () => (
    /* render */

    <View style={styles.panel}>
      <Row style={{ alignSelf: "center" }}>
        <Ionicons name="md-arrow-dropup-circle" size={35} />
      </Row>
      {didApply ? (
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
            <MainButton width={250} text="러너지원하기" />
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
            <MainButton width={250} text="러너지원하기" />
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
              {/* {imageurl ? (
        <Row>
          <Image />
        </Row>
      ) : (
        <></>
      )} */}

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
                <Text note style={{ margin: 3, marginLeft: 10 }}>
                  {createdat}
                </Text>
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
                <Text style={{ margin: 10 }}>{details}</Text>
              </Row>
              <Row style={styles.bottom}></Row>
            </Content>

            {hostId === userId ? (
              <Row>
                <Col>
                  <MainButton width={250} text="수정하기" />
                </Col>
                <Col>
                  <MainButton width={250} text="삭제하기" />
                </Col>
              </Row>
            ) : (
              <BottomSheet
                style={{ backgroundColor: "#f7f5eee8" }}
                snapPoints={[100, 210, 100]}
                renderContent={renderContent}
                renderHeader={renderHeader}
              />
            )}
          </Row>
        </Grid>
      )}
    </ScrollView>
  );
};

export default OderDetailScreen;

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
    height: 200
  }
});
