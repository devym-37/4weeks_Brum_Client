import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "native-base";

import Loader from "../../components/Loader";
// import UserProfile from "../../components/UserProfile";
import GhostButton from "../../components/Buttons/GhostButton";
import { serverApi } from "../../components/API";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";

const MyPageScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonName, setButtonName] = useState(null);
  const preLoad = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const userProfile = await serverApi.user(userToken);
        if (userProfile.data.data) {
          // console.log(`userProfile: `, userProfile.data.data);
          setLoggedIn(true);
          setButtonName("임시 로그아웃 버튼");
          setProfile({ ...userProfile.data.data });
        }
      } else {
        setButtonName("임시 로그인 버튼");
        // Alert.alert("로그인 해주세요");
      }
    } catch (e) {
      console.log(
        `Can't fetch data of user profile with serverApi. Error: ${e}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (buttonName === "임시 로그아웃 버튼") {
      const logout = await AsyncStorage.clear();
      Alert.alert("로그아웃 되었습니다");
      preLoad();
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: "Mypage" })]
      // });
      // navigation.dispatch(resetAction);
    } else {
      setButtonName("임시 로그아웃 버튼");
      navigation.navigate("AuthNavigation");
    }
  };
  useEffect(() => {
    preLoad();
  }, []);
  // useEffect(() => {
  //   preLoad();
  // }, [profile]);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        <GhostButton text={buttonName} onPress={handleLogout} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withNavigation(MyPageScreen);
