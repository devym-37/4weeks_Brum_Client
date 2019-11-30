import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  AsyncStorage,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styled from "styled-components";
import Loader from "../../../components/Loader";
import styles from "../../../styles";
// import UserProfile from "../../components/UserProfile";

import GhostButton from "../../../components/Buttons/GhostButton";
import { serverApi } from "../../../components/API";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
const ProfileHeader = styled.View`
  padding: 20px;
  background-color: yellow;
  flex-direction: row;
  flex: 1;
`;

const HeaderLeft = styled.View`
  background-color: red;

  flex: 1;
`;

const HeaderCenter = styled.View`
  background-color: blue;
  flex: 2;
`;

const HeaderRight = styled.View`
  background-color: green;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
`;

const UserNameContainer = styled.View`
  flex: 1;
  padding-top: 4;
  background-color: pink;
  align-items: flex-start;
  justify-content: center;
`;

const EditImageButton = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  border-style: 1px;
  justify-content: center;
  align-items: center;
  border-color: #e8ecef;
`;

const UserName = styled.Text`
  font-size: 19;
  color: #22252a;
  font-weight: 600;
`;

const UserUnivContainer = styled.View`
  flex: 1;
  padding-bottom: 4;
  background-color: purple;
  justify-content: center;
  align-items: flex-start;
`;

const UserUniv = styled.Text`
  color: #858e96;
  font-size: 15;
`;
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
          console.log(`userProfile: `, userProfile.data.data);
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
    } else {
      setButtonName("임시 로그아웃 버튼");
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        profile && (
          <Container>
            <ProfileHeader>
              <HeaderLeft>
                <Image
                  style={{ height: 80, width: 80, borderRadius: 40 }}
                  source={{ uri: profile.image }}
                />
              </HeaderLeft>
              <HeaderCenter>
                <UserNameContainer>
                  <UserName>{profile.nickname}</UserName>
                </UserNameContainer>
                <UserUnivContainer>
                  <UserUniv>
                    {profile.university ? profile.university : "미인증 회원"}
                  </UserUniv>
                </UserUnivContainer>
              </HeaderCenter>
              <HeaderRight>
                <GhostButton
                  color={styles.lightGreyColor}
                  text="프로필 보기"
                  width={320}
                  onPress={() => navigation.navigate("UserProfileScreen")}
                />
              </HeaderRight>
            </ProfileHeader>
            <GhostButton text={buttonName} onPress={handleLogout} />
          </Container>
        )
      )}
    </ScrollView>
  );
};

export default withNavigation(MyPageScreen);
