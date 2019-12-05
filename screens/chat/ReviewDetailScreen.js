import React, { useState, useEffect } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import styled from "styled-components";
import { connect } from "react-redux";
import styles from "../../styles";
import constants from "../../constants";
import GhostButton from "../../components/Buttons/GhostButton";
import FormInput from "../../components/Inputs/FormInput";

import ReviewCard from "../../components/Cards/ReviewCard";
import {
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert
} from "react-native";
import { serverApi } from "../../components/API";
import { refreshMaker } from "../../redux/actions/refreshActions";

const ProfileContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f1f3f5;
  padding: 20px 0;
  flex: 1.8;
`;
const Name = styled.Text`
  color: #22252a;
  font-size: 18;
  font-weight: 600;
  padding-bottom: 6;
`;

const UserStatus = styled.Text`
  color: #858e96;
  font-size: 14;
`;
const RatingContainer = styled.View`
  padding-top: 16;
  justify-content: center;
  align-items: center;
  flex: 3;
`;
const ButtonContainer = styled.View`
  /* background-color: blue; */
  /* padding-bottom: 20px; */
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  /* background-color: pink; */
  /* padding-bottom: 20px; */
  justify-content: flex-end;
  flex: 1.2;
  align-items: center;
`;

const Divider = styled.View`
  width: ${constants.width};
  height: 1px;
  margin-top: 32;
  background-color: #e8ecef;
`;

const ReviewDetailScreen = ({ navigation, ...props }) => {
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [textReview, setTextReview] = useState("");

  const ratingCompleted = rating => {
    setRating(rating);
    console.log(typeof rating);
  };

  //상대방의 프로필 이미지
  const avatar = navigation.getParam("avatar")
    ? navigation.getParam("avatar")
    : "흑흑안뜸";
  // "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg";

  //상대방의 닉네임
  const nickname = navigation.getParam("nickname")
    ? navigation.getParam("nickname")
    : "흑흑안뜸";

  // 상대방이 러너인지 요청자인지
  const userStatus = navigation.getParam("isDeliver") ? "러너" : "요청자";

  // 주문 번호
  const orderId = navigation.getParam("orderId")
    ? navigation.getParam("orderId")
    : "흑흑안뜸";

  const handleChange = value => {
    console.log(`value: `, value);
    setTextReview(value);
  };
  const handleClick = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      const request = await serverApi.deleteReview(orderId, userToken);
      console.log(`delete request: `, request);
      if (request.data.isSuccess) {
        Alert.alert("리뷰가 삭제되었습니다");
        props.reduxRefresh();
        navigation.goBack(null, { delete: true });
      } else {
        Alert.alert("일시오류", "잠시후 다시 시도해주세요");
      }
    } catch (e) {
      Alert.alert("일시오류", "죄송합니다. 잠시후 다시 시도해주세요");
      console.log(`Can't post review on server. Error : ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const preLoad = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      const request = await serverApi.getReview(orderId, userToken);
      console.log(`request.data.data: `, request.data.data.readReview);
      if (request.data.isSuccess) {
        setRating(request.data.data.readReview.score);
        setTextReview(
          request.data.data.readReview.userReview
            ? request.data.data.readReview.userReview
            : "-"
        );
      } else {
        Alert.alert("일시 오류", "잠시후 다시 시도해주세요");
      }
    } catch (e) {
      Alert.alert("일시 오류", "잠시후 다시 시도해주세요");
      console.log(`Can't get data of review. Error; ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior="padding"
        keyboardVerticalOffset={90}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ProfileContainer>
            <Image
              source={{ uri: avatar }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 12
              }}
            />
            <Name>{nickname}</Name>
            <UserStatus>{userStatus}</UserStatus>
          </ProfileContainer>
          <RatingContainer>
            <AirbnbRating
              isDisabled={true}
              count={5}
              reviews={[
                "최악이에요",
                "별로에요",
                "괜찮아요",
                "좋아요!",
                "아주 좋아요!"
              ]}
              defaultRating={5}
              size={36}
              onFinishRating={ratingCompleted}
              style={{ marginTop: 24 }}
            />
          </RatingContainer>
          <InputContainer>
            <FormInput
              onChange={value => handleChange(value)}
              value={textReview}
              width={50}
              editable={false}
              dividerWidth={50}
              placeholder=""
              maxLength={21}
            />
          </InputContainer>
          <ButtonContainer>
            <GhostButton
              loading={loading}
              color={"#E9EDEF"}
              text="리뷰 취소하기"
              width={50}
              onPress={handleClick}
            />
          </ButtonContainer>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxRefresh: () => dispatch(refreshMaker())
  };
};

export default connect(null, mapDispatchToProps)(ReviewDetailScreen);
