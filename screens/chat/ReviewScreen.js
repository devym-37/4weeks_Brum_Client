import React, { useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import styled from "styled-components";
import { connect } from "react-redux";
import styles from "../../styles";
import constants from "../../constants";
import MainButton from "../../components/Buttons/MainButton";
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

const ReviewScreen = ({ navigation, ...props }) => {
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
    console.log(`rating: `, rating, "textReview: ", textReview);
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      const request = await serverApi.postReview(
        orderId,
        userToken,
        String(rating),
        textReview
      );
      console.log(`request: `, request);
      if (request.data.isSuccess) {
        props.reduxRefresh();
        Alert.alert("리뷰 작성이 완료되었습니다");

        navigation.goBack(null);
      } else {
        Alert.alert("이미 작성한 리뷰입니다");
      }
    } catch (e) {
      Alert.alert("일시오류", "죄송합니다. 잠시후 다시 시도해주세요");
      console.log(`Can't post review on server. Error : ${e}`);
    } finally {
      setLoading(false);
    }
  };

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
            {/* <Divider /> */}
          </RatingContainer>
          <InputContainer>
            <FormInput
              onChange={value => handleChange(value)}
              value={textReview}
              width={50}
              dividerWidth={50}
              placeholder="한줄 리뷰를 남겨주세요(선택사항)"
              maxLength={21}
            />
          </InputContainer>
          <ButtonContainer>
            <MainButton
              loading={loading}
              text="제출하기"
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
export default connect(null, mapDispatchToProps)(ReviewScreen);
