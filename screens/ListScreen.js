import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, FooterTab, Footer } from "native-base";
import { StyleSheet, View, Text, Platform } from "react-native";

class ListScreen extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.headerStyle} androidStatusBarColor="white">
          <Left style={{ flex: 1 }} />
          <Body>
            <Title style={styles.titleStyle}>학교이름</Title>
          </Body>
          <Right style={{ flex: 1 }} />
          <Button transparent>
            <Ionicons name="md-options" size={25} color="black" />
          </Button>
          <Button transparent>
            <Ionicons name="ios-notifications-outline" size={25} color="black" />
          </Button>
          <Button transparent>
            <Ionicons name="md-refresh" size={25} color="black" />
          </Button>
        </Header>
        <Content>
          <View style={styles.Container}>
            <Text>List Screen</Text>
          </View>
        </Content>
        <Footer>
          <FooterTab style={styles.footerStyle} androidStatusBarColor="white">
            <Button
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}
            >
              <Ionicons name="ios-home" size={25} color="black" />
              <Text>홈</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate("RequestScreen");
              }}
            >
              <Ionicons name="md-clipboard" size={25} color="black" />
              <Text>요청하기</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate("ChatScreen");
              }}
            >
              <Ionicons name="md-chatboxes" size={25} color="black" />
              <Text>채팅</Text>
            </Button>
            <Button
              onPress={() => {
                this.props.navigation.navigate("MyPageScreen");
              }}
            >
              <Ionicons name="ios-settings" size={25} color="black" />
              <Text>마이페이지</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    backgroundColor: "white",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 20 : 0 // android top-tab statusbar overlap fix
  },
  titleStyle: {
    color: "black"
  },
  footerStyle: {
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default ListScreen;
