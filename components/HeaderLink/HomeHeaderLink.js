import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Container = styled.TouchableOpacity``;

export default withNavigation(({ navigation }) => (
  <>
    <Container onPress={() => navigation.navigate("FilterNavigation")}>
      <Ionicons
        name="ios-options"
        size={24}
        style={{ color: "#666", marginRight: 12 }}
      />
    </Container>
    <Container onPress={() => navigation.navigate("NotificationNavigation")}>
      <AntDesign
        name="bells"
        size={22}
        style={{ color: "#666", marginRight: 12 }}
      />
    </Container>
  </>
));
