import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, AsyncStorage, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "native-base";

import Loader from "../../components/Loader";
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
  const preLoad = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const userProfile = await serverApi.user(userToken);
        if (userProfile.data.data) {
          // console.log(`userProfile: `, userProfile.data.data);
          setProfile({ ...userProfile.data.data });
        }
      } else {
        Alert.alert("로그인 해주세요");
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
    const logout = await AsyncStorage.clear();
    Alert.alert("로그아웃 되었습니다");
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "BottomNavigation" })]
    });
    navigation.dispatch(resetAction);
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.Container}>
          <Text>MyPageScreen</Text>
          <GhostButton text={"임시 로그아웃 버튼"} onPress={handleLogout} />
        </View>
      )}
    </Container>
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
