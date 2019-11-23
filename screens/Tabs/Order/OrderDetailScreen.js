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
  AsyncStorage
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
  Input
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import MainButton from "../../../components/Buttons/MainButton";

import { serverApi } from "../../../components/API";

const OderDetailScreen = props => {
  const [region, setRegion] = useState();
  //const { isOpen } = this.state;
  const [Loading, setLoading] = useState();
  const [imageurl, setImageurl] = useState(
    "https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg"
  );
  const [arrivals, setArrivals] = useState("식당");
  const [departures, setDepartures] = useState("한양대 공학관");
  const [details, setDetails] = useState("없음1");
  const [campus, setCampus] = useState("한양대학교");
  const [price, setPrice] = useState("200");
  const [title, setTitle] = useState("심부름하실 분");
  const [msg, setMsg] = useState("안녕하세요");
  //const [region, setRegion] = useState();

  useEffect(() => {
    // Create an scoped async function in the hook
    let isCancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        //await AsyncStorage.getItem("userId"); //연결 후 빼기

        //const usertoken = await AsyncStorage.getItem("userToken");

        const usertoken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicGhvbmUiOiIwMTAxMjM0MTIzNCIsImlhdCI6MTU3NDMwMTM3NywiZXhwIjoxNTc5NDg1Mzc3fQ.sSXGnTTGUKIyXkEywO4LgF2VXgYlT_ypf7lxjGlaAH8";
        const userId = 1;

        const oderDetail = await serverApi.oderdetail(1, usertoken);
        console.log(oderDetail.data.data.order);
        console.log("hk", oderDetail.data.isSuccess);
        if (oderDetail.data.isSuccess) {
          console.log("들어옴");
          setDepartures(oderDetail.data.data.order.departures);
          setDetails(oderDetail.data.data.order.details);
          setCampus(oderDetail.data.data.order.hostInfo.campus);
          setPrice(oderDetail.data.data.order.price);
          setTitle(oderDetail.data.data.order.title);
        }
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
    /* render */

    <View>
      <Item style={{ marginTop: 10 }}>
        <Input placeholder="₩가격 제안(선택사항)" />
        <Text>
          <Ionicons name="md-checkmark-circle-outline" />
          희망비용 수락
        </Text>
        {/* <MainButton width={250} text="희망비용 수락" /> */}
      </Item>

      <Item style={{ marginTop: 10 }}>
        <MainButton text="바로 지원하기" />
      </Item>
    </View>
  );

  renderHeader = () => (
    /* render */
    <View>
      <Row style={{ alignSelf: "center" }}>
        <Ionicons name="md-arrow-dropup-circle" size={35} />
      </Row>
      <Row>
        <Col style={{ margin: 10 }}>
          <Text
            style={{
              fontSize: 18,

              textAlignVertical: "center"
            }}
          >
            {price}
          </Text>
        </Col>
        <Col style={{ padding: -10 }}>
          <MainButton width={250} text="러너지원하기" />
        </Col>
      </Row>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Grid style={{ height: Dimensions.get("window").height }}>
        <Row style={{ height: 10 }}>
          {/* <MapView
        style={styles.mapStyle}
        provider="google"
        ref={map => {
          this.map = map;
        }}
        initialRegion={this.state.region}
        onRegionChange={this.onRegionChange}
        showsCompass={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        zoomEnabled={true}
        scrollEnabled={true}
        showsScale={true}
        rotateEnabled={false}
        /> */}
        </Row>
        <Content>
          {/* {imageurl ? (
            <Row>
              <Image />
            </Row>
          ) : (
            <></>
          )} */}

          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg"
                  }}
                />
              </Left>
              <Body>
                <Text>정재숙</Text>
                <Text note>{campus}</Text>
              </Body>
              <Right>
                <Text>
                  매너점수 <Ionicons name="md-happy"></Ionicons> 3.7/5.0
                </Text>
              </Right>
            </ListItem>
          </List>

          <Row style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 20, marginLeft: 10 }}>{title}</Text>
          </Row>
          <Row>
            <Text note style={{ marginLeft: 10 }}>
              1분 전
            </Text>
          </Row>
          <Row style={{ margin: 10 }}>
            <Text note>
              <Ionicons name="md-disc" />
              {"   "}
              {departures}
            </Text>
          </Row>
          <Row style={{ margin: 10 }}>
            <Text note>
              <Ionicons name="md-happy" /> {"   "}희망 도착시간
            </Text>
          </Row>
          <Row>
            <Text style={{ margin: 10 }}>{details}</Text>
          </Row>
        </Content>
        {msg ? (
          <BottomSheet
            style={{ backgroundColor: "#f7f5eee8" }}
            snapPoints={[100, 210, 100]}
            renderContent={renderContent}
            renderHeader={renderHeader}
          />
        ) : (
          <BottomSheet
            snapPoints={[100, 100, 50]}
            renderContent={renderContent}
            renderHeader={renderHeader}
          />
        )}
      </Grid>
    </ScrollView>
  );
};
//</ScrollView>List Avatar

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
  }
});
