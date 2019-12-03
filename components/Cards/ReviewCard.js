import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Touchable = styled.TouchableOpacity``;
const ReviewContainer = styled.View`
  width: ${constants.width};

  padding: 14px 12px;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* border-bottom-color: "#47315a"*/
`;

const ReviewButtonText = styled.Text`
  font-size: 13;
  font-weight: 600;
`;

const Divider = styled.View`
  width: ${constants.width};
  /* margin-left: -20px; */
  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const ReviewCard = ({
  navigation,
  isReadable,
  orderId,
  nickname,
  avatar,
  university,
  isDeliver
}) => {
  const handleClickReview = () => {
    if (isReadable) {
      navigation.navigate("ReviewDetailScreen");
    } else {
      navigation.navigate("ReviewScreen", {
        orderId,
        nickname,
        avatar,
        university,
        isDeliver
      });
    }
  };
  //}
  return (
    <>
      <Touchable onPress={handleClickReview}>
        <ReviewContainer>
          <ReviewButtonText>
            {isReadable ? "작성한 리뷰 보기" : "별점 리뷰를 남겨주세요"}
          </ReviewButtonText>
        </ReviewContainer>
      </Touchable>
      <Divider />
    </>
  );
};

export default withNavigation(ReviewCard);
