import React from "react";
import styled from "styled-components";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import utils from "../../utils";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Touchable = styled.TouchableOpacity``;
const CardContainer = styled.View`
  width: ${constants.width};

  padding: 0 12px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  /* border-bottom-color: "#47315a"*/
`;

const Thumbnail = styled.Image`
  /* flex: 1; */
  width: 110;
  height: 110;
  border-radius: 8px;
`;

const ContentContainer = styled.View`
  padding: 16px 12px;
  flex-direction: row;
  /* justify-content: center; */
`;

const TextContainer = styled.View`
  flex: 2.6;
  /* padding: 4px 0; */
  padding-left: 14px;

  justify-content: center;
  align-items: flex-start;
`;
const Divider = styled.View`
  width: ${constants.width};
  /* margin-left: -20px; */
  height: 1px;
  background-color: ${props => props.theme.lightGreyColor};
`;

const Title = styled.Text`
  font-size: 16;
  font-weight: 400;
  margin-bottom: 6;
`;

const Time = styled.Text`
  padding-top: 0px;
  margin-right: 4px;
  font-size: 11;
  color: #737b84;
`;

const CategoryContainer = styled.View`
  /* margin-left: 10px; */
  flex-direction: row;
  align-items: center;
  margin-bottom: 8;
  justify-content: flex-start;
`;

const SpotContainer = styled.View`
  /* margin-left: 10px; */
  flex-direction: row;
  align-items: center;
  margin-bottom: 3;
  justify-content: flex-start;
`;
const Spot = styled.Text`
  padding-right: 6px;
  /* color: #737b84; */
  font-weight: 300;
  line-height: 12;
  font-size: 12;
`;
const Price = styled.Text`
  /* padding-top: 6px; */
  font-size: 16;
  font-weight: 600;
`;

const Container = styled.View`
  flex-direction: row;
  margin-top: 6px;
  /* justify-content: center; */
  align-items: center;
`;
const StatusContainer = styled.View`
  background-color: #495057;
  border-radius: 4px;
  width: 48;
  color: white;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  padding: 4px 0;
`;
const Status = styled.Text`
  color: white;
  font-size: 11;
  line-height: 0;
  font-weight: 800;
`;

const Count = styled.Text`
  color: #737b84;
  font-size: 14;
  line-height: 14;
  margin-left: 2px;
`;

const CountContainer = styled.View`
  flex-direction: row;
  position: relative;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  /* margin-top: -2px; */
`;
const OrderCard = ({
  title,
  category,
  departures,
  arrivals,
  desiredArrivalTime,
  price,
  orderStatus,
  createdAt,
  views,
  applicants = [],
  userLikeOrders = [],
  onPress,
  children
}) => {
  const priceWithComma = price && utils.numberWithCommas(price);
  const timeStamp = utils.transferTime(createdAt);
  const status = utils.transferOrderCardStatus(orderStatus);
  const shortTitle = utils.shortenText(title, 17);
  const shortArrivals = utils.shortenText(arrivals, 7);
  const shortDeparture =
    departures !== "null" ? utils.shortenText(departures, 7) : "출발지 없음";
  //   const numOfLikes = userLikeOrders.length;
  return (
    <>
      <Touchable onPress={onPress}>
        <CardContainer>
          <ContentContainer>
            <Thumbnail
              source={{
                uri:
                  "https://miro.medium.com/max/2688/1*RKpCRwFy6hyVCqHcFwbCWQ.png"
              }}
            />
            <TextContainer>
              <Title>{shortTitle}</Title>

              <CategoryContainer>
                <Time>{category}</Time>
                <Time>・</Time>
                <Time>{timeStamp}</Time>
              </CategoryContainer>

              <SpotContainer>
                <Spot>{shortDeparture}</Spot>
                <AntDesign
                  name="arrowright"
                  size={11}
                  style={{ color: "#737b84", paddingRight: 6 }}
                />
                <Spot>{shortArrivals}</Spot>
              </SpotContainer>

              <Container>
                {status && (
                  <StatusContainer>
                    <Status>{status}</Status>
                  </StatusContainer>
                )}
                <Price>
                  {price !== "null" ? `${priceWithComma}원` : `비용협의`}
                </Price>
              </Container>
              <CountContainer>
                <Container>
                  <Ionicons
                    name="md-paper-plane"
                    size={15}
                    style={{ color: "#737b84" }}
                  />
                  <Count>{applicants.length}</Count>
                </Container>
                <Container>
                  <AntDesign
                    name="hearto"
                    size={14}
                    style={{ color: "#737b84", paddingLeft: 9 }}
                  />
                  <Count>{userLikeOrders.length}</Count>
                </Container>
                <Container>
                  <AntDesign
                    name="eyeo"
                    size={15}
                    style={{ color: "#737b84", marginLeft: 8 }}
                  />
                  <Count>{views}</Count>
                </Container>
              </CountContainer>
            </TextContainer>
            {children}
          </ContentContainer>
        </CardContainer>
        <Divider />
      </Touchable>
    </>
  );
};

export default withNavigation(OrderCard);
