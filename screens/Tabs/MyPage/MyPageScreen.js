import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  AsyncStorage,
  ScrollView,
  Alert
} from "react-native";
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import styled from "styled-components";
import Loader from "../../../components/Loader";
import styles from "../../../styles";
// import UserProfile from "../../components/UserProfile";

import GhostButton from "../../../components/Buttons/GhostButton";
import RoutePicker from "../../../components/Pickers/RoutePicker";
import { serverApi } from "../../../components/API";
import constants from "../../../constants";

// import LikeHistory from "../../../assets";
// import OrderHistory from "../../../assets";
// import RunnerHistory from "../../../assets";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: "#f1f3f5";
`;
const ProfileHeader = styled.View`
  padding: 20px;
  /* background-color: yellow; */
  flex-direction: row;
  flex: 1;
`;

const HeaderLeft = styled.View`
  /* background-color: red; */
  padding-right: -8;
  flex: 1.1;
`;

const HeaderCenter = styled.View`
  /* background-color: blue; */
  padding-left: 8;
  flex: 2;
`;

const HeaderRight = styled.View`
  /* background-color: green; */
  justify-content: center;
  align-items: flex-end;
  flex: 1;
`;

const UserNameContainer = styled.View`
  flex: 1;
  padding-top: 8;
  padding-left: 4;
  /* background-color: pink; */
  align-items: flex-start;
  justify-content: center;
`;

const EditImageButton = styled.View`
  position: absolute;
  bottom: 2;
  right: 2;
  width: 24;
  height: 24;
  border-style: 1px solid;
  border-color: ${styles.lightGreyColor};
  border-radius: 16;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const UserName = styled.Text`
  padding-top: 6;
  font-size: 20;
  color: #22252a;
  font-weight: 600;
`;

const UserUnivContainer = styled.View`
  padding-left: 4;
  flex: 1;
  padding-bottom: 6;
  /* background-color: purple; */
  justify-content: center;
  align-items: flex-start;
`;

const UserUniv = styled.Text`
  color: #858e96;
  font-size: 15;
  padding-bottom: 6;
`;

const HistoryContainer = styled.View`
  padding: 24px;
  /* background-color: blue; */
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const HistoryColumn = styled.View`
  flex: 1;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  /* background-color: grey; */
`;

const ButtonContainer = styled.View`
  width: 92;
  height: 92;
  background-color: "#F3CDD7";
  justify-content: center;
  align-items: center;
  border-radius: 40;
`;

const ButtonLabel = styled.Text`
  color: #22252a;
  font-size: 14;
  padding-top: 12;
`;

const Divider = styled.View`
  width: ${constants.width};
  /* margin-left: -20px; */
  height: 1px;
  background-color: #e8ecef;
`;
const SubDivider = styled.View`
  width: ${constants.width};
  height: 5px;
  background-color: #f8f9f9;
`;

const MyPageScreen = ({ navigation, ...props }) => {
  // const [userToken, setUserToken] = useState();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonName, setButtonName] = useState(null);

  const handleClickAvatar = () => {
    navigation.navigate("SelectPhoto", { userAvatar: true });
  };
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
      setButtonName("임시 로그인 버튼");
      Alert.alert("로그아웃 되었습니다");
      navigation.navigate("StartNavigation");
      // preLoad();
    } else {
      setButtonName("임시 로그아웃 버튼");
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    preLoad();
  }, [props.avatar, loggedIn]);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        profile && (
          <Container>
            {/* 프로필 헤더 */}
            <ProfileHeader>
              <HeaderLeft>
                <TouchableOpacity onPress={handleClickAvatar}>
                  <Image
                    style={{ height: 88, width: 88, borderRadius: 44 }}
                    source={{
                      uri: props.avatar ? props.avatar : profile.image
                    }}
                  />
                  <EditImageButton>
                    <AntDesign
                      name="camera"
                      size={17}
                      style={{ color: "#858E96" }}
                    />
                  </EditImageButton>
                </TouchableOpacity>
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
                  width={270}
                  onPress={() => navigation.navigate("UserProfileScreen")}
                />
              </HeaderRight>
            </ProfileHeader>
            <Divider />
            {/* 판매내역/ 구매내역/ 관심목록 */}
            <HistoryContainer>
              <HistoryColumn>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserHistoryNavigation", {
                      title: "요청내역"
                    })
                  }
                >
                  <ButtonContainer>
                    <Image
                      source={require("../../../assets/OrderHistory.png")}
                      style={{ width: 64, height: 64 }}
                    />
                    <ButtonLabel>요청내역</ButtonLabel>
                  </ButtonContainer>
                </TouchableOpacity>
              </HistoryColumn>
              <HistoryColumn>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserHistoryNavigation", {
                      title: "러너내역"
                    })
                  }
                >
                  <ButtonContainer>
                    <Image
                      source={require("../../../assets/RunnerHistory.png")}
                      style={{ width: 64, height: 64 }}
                    />
                    <ButtonLabel>러너내역</ButtonLabel>
                  </ButtonContainer>
                </TouchableOpacity>
              </HistoryColumn>
              <HistoryColumn>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UserHistoryNavigation", {
                      title: "관심목록"
                    })
                  }
                >
                  <ButtonContainer>
                    <Image
                      source={require("../../../assets/LikeHistory.png")}
                      style={{ width: 64, height: 64 }}
                    />
                    <ButtonLabel>관심목록</ButtonLabel>
                  </ButtonContainer>
                </TouchableOpacity>
              </HistoryColumn>
            </HistoryContainer>
            <Divider />
            <SubDivider />
            <RoutePicker
              text="학교 인증하기"
              color="#22252A"
              onPress={() => navigation.navigate("VerifyCampusNavigation")}
            />
            <GhostButton text={buttonName} onPress={handleLogout} />
          </Container>
        )
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    avatar: state.avatarReducer.avatar
  };
};

export default withNavigation(connect(mapStateToProps, null)(MyPageScreen));
