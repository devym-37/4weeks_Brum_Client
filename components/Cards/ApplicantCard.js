import React from "react";
import styled from "styled-components";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import utils from "../../utils";
import constants from "../../constants";
import { withNavigation } from "react-navigation";

const Touchable = styled.TouchableOpacity``;
const CardContainer = styled.View`
  width: ${constants.width};

  /* padding: 0 12px; */
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
  /* border-bottom-color: "#47315a"*/
`;

const Thumbnail = styled.Image`
  /* flex: 1; */
  margin-left: 4;
  width: 90;
  height: 90;
  border-radius: 42;
  /* margin-left: -2; */
`;

const ContentContainer = styled.View`
  padding: 16px 12px;
  /* padding-bottom: 20; */
  /* padding-right: 20; */
  flex-direction: row;
  /* justify-content: center; */
`;

const TextContainer = styled.View`
  /* flex: 2.3; */
  /* padding: 4px 0; */
  padding-left: 14px;
  margin-top: 4;
  justify-content: flex-start;
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
  margin-bottom: 8px;
`;

const Time = styled.Text`
  padding-top: 0px;
  margin-right: 4px;
  font-size: 13;
  color: #737b84;
`;

const SpotContainer = styled.View`
  /* margin-left: 10px; */
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Spot = styled.Text`
  padding-right: 6px;
  color: #737b84;
  font-size: 13;
`;
const Price = styled.Text`
  /* padding-top: 6px; */
  font-size: 16;
  font-weight: 400;
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
  color: white;
  justify-content: center;
  align-items: center;
  margin-right: 6px;

  padding: 6px 8px;
`;
const Status = styled.Text`
  color: white;
  font-size: 12;
  line-height: 0;
  font-weight: 800;
`;

const Count = styled.Text`
  color: #737b84;
  font-size: 14;
  line-height: 0;
  margin-left: 2px;
`;

const CountContainer = styled.View`
  flex-direction: row;
  position: relative;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: -2px;
`;
const ApplicantCard = ({
  applicantId,
  applicantInfo,
  applyComment,
  applyStatus,
  createdAt,
  bidPrice,
  onPress,
  children,
  ...rest
}) => {
  const bidPriceWithComma =
    bidPrice && utils.numberWithCommas(Number(bidPrice));
  const timeStamp = utils.transferTime(createdAt);
  const avgOfScores = utils.avgOfScores(applicantInfo.getScore);
  const numOfScores = utils.numOfScores(applicantInfo.getScore);
  return (
    <>
      <CardContainer>
        <ContentContainer>
          <Thumbnail
            source={{
              uri: applicantInfo.image
            }}
          />
          <TextContainer>
            <Title>{applicantInfo.nickname}</Title>
            <SpotContainer>
              <Time>{timeStamp}</Time>
              <Time>・</Time>
              <Spot>
                {applicantInfo.university
                  ? applicantInfo.university
                  : `미인증 회원`}
              </Spot>
              <Time>・</Time>
              <Spot>{`평점 : ${avgOfScores}/5.0(${numOfScores}개)`}</Spot>
              {/* <AntDesign
                  name="arrowright"
                  size={13}
                  style={{ color: "#737b84", paddingRight: 6 }}
                />
                <Spot>{shortArrivals}</Spot> */}
            </SpotContainer>
            <Container>
              {/* <StatusContainer> */}
              {/* <Status>{status}</Status> */}
              {/* </StatusContainer> */}
              <Price>
                {bidPrice ? `${bidPriceWithComma}원` : `제시금액에 가능`}
              </Price>
            </Container>
            {/* <Price>{applyComment ? applyComment : `러너 지원합니다`}</Price> */}
            <CountContainer>
              <Container>
                {/* <Ionicons
                    name="md-paper-plane"
                    size={15}
                    style={{ color: "#737b84", paddingTop: 1 }}
                  />
                  <Count>{applicants.length}</Count> */}
              </Container>
              <Container>
                {/* <AntDesign
                    name="eyeo"
                    size={15}
                    style={{ color: "#737b84", marginLeft: 8, paddingTop: 1 }}
                  />
                  <Count>{views}</Count> */}
              </Container>
            </CountContainer>
          </TextContainer>
        </ContentContainer>
        {children}
      </CardContainer>
      <Divider />
    </>
  );
};

export default withNavigation(ApplicantCard);

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
