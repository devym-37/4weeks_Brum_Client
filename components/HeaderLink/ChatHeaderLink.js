import React from "react";
import styled from "styled-components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Alert, Linking, Platform } from "react-native";
import utils from "../../utils";

const Container = styled.TouchableOpacity``;

export default (props) => {
  const handlePhone = () => {

    console.log("프롭스",props)
    let phoneNumber = "01094402182";
    utils.phoneCall(phoneNumber);
  };
  const handleEllipsis = () => Alert.alert("신고하기 등등");
  return (
    <>
      <Container onPress={handlePhone}>
        <AntDesign
          name="phone"
          size={24}
          style={{ color: "#666", marginRight: 12 }}
        />
      </Container>
      <Container onPress={handleEllipsis}>
        <AntDesign
          name="ellipsis1"
          size={22}
          style={{ color: "#666", marginRight: 12 }}
        />
      </Container>
    </>
  );
};
