import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, FooterTab, Footer } from "native-base";

export default function ChatScreen() {
  return (
    <Container>
      <View style={styles.Container}>
        <Text>ChatScreen</Text>
      </View>
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

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  footerStyle: {
    borderTopWidth: 0.5,
    borderTopColor: "gray",
    backgroundColor: "white",
    justifyContent: "center"
  }
});
