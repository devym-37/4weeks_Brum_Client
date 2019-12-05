import React from "react";
import { Alert, Platform, Linking } from "react-native";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import * as IntentLauncherAndroid from "expo-intent-launcher";

// import { Share, Button } from "react-native";
const Container = styled.TouchableOpacity``;

const Text = styled.Text`
  color: #989ea5;
  font-size: 17;
  padding-left: 15;
`;
export default withNavigation(({ navigation }) => {
  // const handleShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: "주변 친구에게 링크를 공유하세요"
  //     });
  //     console.log(`link: `, result);
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  /* if(Platform.OS=='ios'){
    Linking.openURL('app-settings:')
  }
  else{
    IntentLauncherAndroid.startActivityAsync(
      IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
    );
  } */
  // };
  return (
    <>
      <Container
        onPress={async () => {
          if (Platform.OS == "ios") {
            //  Alert.alert("설정으로 이동합니다")
            Linking.openURL("app-settings:");
          } else {
            const intent = await IntentLauncher.startActivityAsync(
              IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
            );
          }
        }}
      >
        <AntDesign
          name="setting"
          size={24}
          style={{ paddingRight: 15, color: "#666" }}
        />
      </Container>
    </>
  );
});
