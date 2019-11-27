import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
// import MainButton from "../../../components/Buttons/MainButton";
import constants from "../../../constants";
import styles from "../../../styles";
import utils from "../../../utils";
const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width};
  /* flex:3 */
  height: ${constants.height / 2.5};
`;

const UserContainer = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  width: ${constants.width};
  height: ${constants.height / 12};
`;

const Avatar = styled.Image`
  width: 48;
  height: 48;
  border-radius: 20;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserInfoContainer = styled.View`
  padding-left: 16;
`;

const ScoreContainer = styled.View`
  margin-top: 10;
  flex-direction: row;
  justify-content: center;
`;

const UserName = styled.Text`
  font-size: 16;
  font-weight: 500;
  padding-bottom: 4;
`;

const University = styled.Text`
  font-size: 13;
  color: #737b84;
`;

const ScoreLabel = styled.Text`
  color: #737b84;
  padding-right: 10;
  font-size: 15;
  font-weight: 400;
`;

const UserScore = styled.Text`
  color: ${props => props.color};
  margin-top: -4;
  font-weight: 700;
  font-size: 20;
`;

const TotalScore = styled.Text``;

const ApplyButton = styled.View`
  background-color: ${styles.mainColor};
  margin: 0;
  padding: 14px 10px;
  width: ${props => constants.width - props.width};
  margin: 0;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;
const OrderContentContainer = styled.View`
  background-color: white;
  width: ${constants.width};
  padding: 0 15px;
  padding-top: 20;
`;

const Divider = styled.View`
  width: ${constants.width - 30};
  height: 1px;
  color: ${styles.lightGreyColor};
`;

const OrderTitle = styled.Text`
  color: #333;
  font-size: 24;
  font-weight: 600;
  padding-bottom: 8;
`;

const TimeStamp = styled.Text`
  color: #737b84;
  font-size: 15;
  margin-bottom: 24;
`;
const DepartureContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ArrivalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24;
`;

const Address = styled.Text`
  color: #737b84;
  font-size: 15;
  margin-left: 4;
  padding-left: 4;
`;
const Message = styled.Text`
  font-size: 18;
  color: #333;
  margin-bottom: 24;
  line-height: 24;
`;
const CountContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24;
`;

const Count = styled.Text`
  color: #818992;
  font-size: 15;
`;
const PriceContainer = styled.View``;

const Price = styled.Text`
  font-size: 20;
  font-weight: 500;
  padding-bottom: 4;
`;

const PriceOption = styled.Text`
  font-size: 14;
  font-weight: 300;
`;
const BottomContainer = styled.View`
  justify-content: center;
  bottom: 0;
  position: relative;
  align-items: center;
  background-color: #feffff;
  width: ${constants.width};
  height: ${constants.height / 12};
`;

const ContentContainer = styled.View`
  flex-direction: row;
  padding: 0 20px;
  width: ${constants.width};
  align-items: center;
  justify-content: space-between;
`;

const VerticalDivider = styled.View`
  background-color: #d0d6dc;
  width: 1;
  height: 32;
`;

// const Text = styled.Text``;
const TextDivider = styled.Text`
  padding: 0 6px;
  color: #818992;
`;

const IconContainer = styled.Text`
  padding-left: 12px;
`;

const Touchable = styled.TouchableOpacity``;

const OrderDetailScreen = () => {
  const [isLiked, setIsLiked] = useState(false);

  const avatar =
    "https://lendersccs.com/wp-content/uploads/2017/02/placeholder-user.png";
  const username = "김조은";
  const university = "서울대";
  const score = "4.7";
  const color = utils.scoreColorPicker(score);
  const price = "5,000";
  const isPrice = false;
  const mapScreen =
    "https://miro.medium.com/max/2688/1*RKpCRwFy6hyVCqHcFwbCWQ.png";
  const title = "서점에서 책 사다주세요(급함)";
  const timeStamp = "15초 전";
  const message =
    "서울대입구역 나나서점에서 화학 전공서적 사다주세요. 수업 20분 전이라 당장 가능한 분 우대요!";
  const numOfApplicants = 5;
  const likes = 2;
  const views = 102;
  const departure = "서울 관악구 남부순환로 220, 나나문고";
  const arrival = "서울 관악구 관악로 1, 서울대학교 38동 201호";
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <Image source={{ uri: mapScreen }} />
            <UserContainer>
              <ProfileContainer>
                <Avatar source={{ uri: avatar }} />
                <UserInfoContainer>
                  <UserName>{username}</UserName>
                  <University>{university}</University>
                </UserInfoContainer>
              </ProfileContainer>
              <ScoreContainer>
                <ScoreLabel>매너 점수</ScoreLabel>
                <AntDesign
                  name={score > 4 ? "smileo" : score > 3 ? "meh" : "frowno"}
                  size={32}
                  style={{ color, marginRight: 8, marginTop: -6 }}
                />
                <UserScore color={color}>{score}</UserScore>
                <TotalScore>{` / 5.0`}</TotalScore>
              </ScoreContainer>
            </UserContainer>
            <Divider />
            <OrderContentContainer>
              <OrderTitle>{title}</OrderTitle>
              <TimeStamp>{timeStamp}</TimeStamp>
              <DepartureContainer>
                <FontAwesome
                  name="dot-circle-o"
                  size={22}
                  style={{ color: "#D0D6DC", paddingLeft: 2, paddingRight: 4 }}
                />
                <Address>{`출발지 : ${departure}`}</Address>
              </DepartureContainer>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                style={{ color: "#D0D6DC", paddingLeft: 2 }}
              />
              <ArrivalContainer>
                <AntDesign
                  name="enviroment"
                  size={24}
                  style={{ color: "#D0D6DC" }}
                />
                <Address>{`도착지 : ${arrival}`}</Address>
              </ArrivalContainer>
              <Message>{message}</Message>
              <CountContainer>
                <Count>{`지원 ${numOfApplicants}`}</Count>
                <TextDivider>･</TextDivider>
                <Count>{`관심 ${likes}`}</Count>
                <TextDivider>･</TextDivider>
                <Count>{`조회 ${views}`}</Count>
              </CountContainer>
            </OrderContentContainer>
          </Container>
        </ScrollView>
        <BottomContainer>
          <ContentContainer>
            <Touchable onPress={() => setIsLiked(!isLiked)}>
              <IconContainer>
                {isLiked ? (
                  <AntDesign
                    name="heart"
                    size={26}
                    style={{ color: styles.mainColor }}
                  />
                ) : (
                  <AntDesign
                    name="hearto"
                    size={26}
                    style={{ color: styles.mainColor }}
                  />
                )}
              </IconContainer>
            </Touchable>
            <VerticalDivider />
            <PriceContainer>
              <Price>{`${price}원`}</Price>
              <PriceOption>
                {isPrice ? "가격제안 가능" : "가격제안 불가"}
              </PriceOption>
            </PriceContainer>
            <Touchable>
              <ApplyButton width={250}>
                <ButtonText>러너 지원하기</ButtonText>
              </ApplyButton>
            </Touchable>
          </ContentContainer>
        </BottomContainer>
      </SafeAreaView>
    </>
  );
};

export default OrderDetailScreen;
