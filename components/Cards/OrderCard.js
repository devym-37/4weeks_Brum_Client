import React from "react";
import styled from "styled-components";
import { Card } from "react-native-elements";
import { Text } from "react-native";
import utils from "../../utils";

const Title = styled.Text`
  font-size: 16;
  font-weight: 600;
`;

const Time = styled.Text`
  font-size: 10;
`;

const Price = styled.Text`
  font-size: 13;
  font-weight: 400;
`;

const OrderCard = ({
  title,
  departures,
  arrivals,
  desiredArrivalTime,
  price,
  orderStatus,
  createdAt
}) => {
  const PriceWithComma =
    price && utils.numberWithCommas(Number(price.substr(0, price.length - 1)));
  return (
    <Card>
      <Title>{title}</Title>
      <Time>{createdAt}</Time>
      <Price>{price ? `${PriceWithComma}원` : `협의가능`}</Price>
    </Card>
  );
};

export default OrderCard;

// "title": "한양대 공학관 -> 우리집으로 무거운 물건좀 옮겨주세요",
//                 "departures": "한양대 공학관",
//                 "arrivals": "우리집",
//                 "desiredArrivalTime": null,
//                 "details": "집으로 보내주세요!!",
//                 "price": "5000원",
//                 "isPrice": true,
//                 "deliverId": 2,
//                 "orderStatus": 0,
//                 "actualArrivalTime": null,
//                 "createdAt": "2019-12-07 00:00:00",
