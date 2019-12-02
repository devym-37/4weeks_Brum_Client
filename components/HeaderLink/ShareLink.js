import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { Share, Button, Alert } from "react-native";
const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-left: 15;
`;
export default withNavigation(({ navigation }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share(
        {
          title: "공유하기",
          message: "이거 어때 쌉가능?"
        },
        {
          excludedActivityTypes: [
            "com.apple.UIKit.activity.AirDrop",
            "com.apple.UIKit.activity.AddToReadingList",
            "com.apple.reminders.RemindersEditorExtension",
            "com.apple.mobilenotes.SharingExtension"
          ]
        }
      );
      console.log(`link: `, result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("shared with" + result.activityType);
        } else {
          // shared
          Alert.alert("shared but not sure how");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        Alert.alert("dismissed");
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
