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
  return (
    <Container>
      <Content>
        <Card>
          <CardItem cardBody style={{ marginTop: 10 }}>
            <Image
              source={{
                uri: "https://tistory3.daumcdn.net/tistory/2864444/attach/628442af44f545c788ffdc5035464f98"
              }}
              style={{ height: 120, width: 120, flex: 0.6 }}
            />
            <Left>
              <Body>
                <Text style={{ height: 25 }}>제목</Text>
                <Row>
                  <Thumbnail
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 30 / 2,
                      backgroundColor: "black"
                    }}
                    source={{
                      uri: "https://tistory3.daumcdn.net/tistory/2864444/attach/628442af44f545c788ffdc5035464f98"
                    }}
                  ></Thumbnail>
                  <Text
                    style={{
                      height: 28,
                      paddingLeft: 5,
                      paddingTop: 7,
                      backgroundColor: "gray"
                    }}
                  >
                    요청자 이름
                  </Text>
                </Row>

                <Text note style={{ height: 24, backgroundColor: "black" }}>
                  출발 주소 → 도착 주소
                </Text>
                <Text note style={{ height: 24, backgroundColor: "green" }}>
                  시간?
                </Text>

                <Row>
                  <Text style={{ height: 25, backgroundColor: "red", width: 100 }}>100원</Text>
                  <SimpleLineIcons active name="speech" size={18} style={{ paddingLeft: 55, paddingRight: 5 }} />
                  <Text
                    note
                    style={{
                      height: 25,
                      backgroundColor: "red"
                    }}
                  >
                    view 번
                  </Text>
                </Row>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default ListCard;
