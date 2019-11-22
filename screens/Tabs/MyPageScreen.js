import React from "react";
import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  FooterTab,
  Footer
} from "native-base";
import MainButton from "../../components/Buttons/MainButton";

export default function MyPageScreen() {
  const handleLogout = async () => {
    await AsyncStorage.setItem("userToken", "null");
  };
  return (
    <Container>
      <View style={styles.Container}>
        <Text>MyPageScreen</Text>
        <MainButton onPress={handleLogout} text="로그인" />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
