import React, { Component } from "react";
import { Image } from "react-native";
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
import { SimpleLineIcons } from "@expo/vector-icons";

const ListCard = props => {
  const { data } = props;
  console.log("data", data);
  return (
    <Card>
      <CardItem cardBody style={{ marginTop: 10 }}>
        <Image
          source={{
            uri:
              "https://tistory3.daumcdn.net/tistory/2864444/attach/628442af44f545c788ffdc5035464f98"
          }}
          style={{ height: 120, width: 120, flex: 0.6 }}
        />
        <Left>
          <Body>
            <Text style={{ height: 25 }}>{data.title}</Text>
            <Row>
              <Thumbnail
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 30 / 2
                }}
                source={{
                  uri:
                    data.hostInfo.image === null
                      ? "https://tistory3.daumcdn.net/tistory/2864444/attach/628442af44f545c788ffdc5035464f98"
                      : data.hostInfo.image
                }}
              ></Thumbnail>
              <Text
                style={{
                  height: 28,
                  paddingLeft: 5,
                  paddingTop: 7
                }}
              >
                {data.hostInfo.name}
              </Text>
            </Row>

            <Text note style={{ height: 24 }}>
              출발지 : {data.departures}
            </Text>
            <Text note style={{ height: 24 }}>
              도착지 : {data.arrivals}
            </Text>
            <Text note style={{ height: 24 }}>
              {data.createdAt}
            </Text>

            <Row>
              <Text note style={{ height: 25, width: 100 }}>
                비용 : {data.price !== null ? data.price : "협의"}
              </Text>
              <SimpleLineIcons
                active
                name="speech"
                size={18}
                style={{ paddingLeft: 55, paddingRight: 5 }}
              />
              <Text
                note
                style={{
                  height: 25
                }}
              >
                view
              </Text>
            </Row>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ListCard;
