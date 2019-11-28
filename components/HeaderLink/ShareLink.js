import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { Share, Button } from "react-native";
const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-left: 15;
`;
export default withNavigation(({ navigation }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "주변 친구에게 링크를 공유하세요"
      });
      console.log(`link: `, result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Container onPress={handleShare}>
        <AntDesign
          name="sharealt"
          size={22}
          style={{ paddingRight: 15, color: "#666" }}
        />
      </Container>
    </>
  );
});
