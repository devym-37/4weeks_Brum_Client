import React, { useState, useEffect } from "react";
import { AsyncStorage, RefreshControl, Alert } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import styled from "styled-components";
import { serverApi } from "../../../components/API";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../../components/Loader";
import ApplicantCard from "../../../components/Cards/ApplicantCard";
import MyOrderDetail from "../../../screens/Tabs/Order/MyOrderDetail";
import styles from "../../../styles";
import constants from "../../../constants";
import Fire from "../../chat/Fire";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  font-size: 15;
  margin-bottom: 4px;
`;

const DefaultContainer = styled.View`
  margin-top: -100px;
  width: ${constants.width};
  height: ${constants.height * 0.9};
  background-color: white;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${styles.mainColor};
  font-weight: 600;
`;
const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: solid 1px;
  border-color: ${styles.mainColor};
`;

const ApplicantsList = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [applicantList, setApplicantList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "first", title: "지원자 리스트" },
    { key: "second", title: "내 요청내용" }
  ]);
  const [orderId, setOrderId] = useState(navigation.getParam("orderId"));
  const handleConfirm = async deliverId => {
    console.log(`deliverId: `, deliverId);
    // console.log(`deliverId: `, typeof deliverId);
    console.log(`orderId: `, orderId);
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");

      const userId = await AsyncStorage.getItem("userId");
      console.log(`유저오더딜리버아이디`, userId, orderId, deliverId);
      Fire.shared.appendChatrooms(userId, orderId, deliverId);

      const request = await serverApi.choiceDeliver(
        orderId,
        deliverId,
        userToken
      );

      console.log(`배달자 등록: `, request);
    } catch (e) {
      console.log(`Can't put selected deliverId on Server. Error: ${e}`);
    } finally {
      setLoading(false);
      navigation.navigate("Chats");
    }
  };
  const handleChoice = async deliverId => {
    // console.log(`event: `, deliverId);

    //firebase
    const userId = await AsyncStorage.getItem("userId");

    return Alert.alert(
      "러너 선택 확인",
      `확인을 누르면 선택취소가 불가능합니다. 
      계속 진행하시겠어요?`,
      [
        {
          text: "확인",
          onPress: () => {
            handleConfirm(deliverId);
          }
        },
        {
          text: "취소",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };
  const preLoad = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      const orderId = navigation.getParam("orderId");
      const getApplicantList = await serverApi.getApplicantList(
        orderId,
        userToken
      );
      const arrayOfApplicants = getApplicantList.data.data.applicants;
      const filteredApplicants = arrayOfApplicants.filter(applicant =>
        ["applied", "chosen"].includes(applicant.applyStatus)
      );
      setApplicantList([...filteredApplicants]);
      // console.log(`getApplicantList: `, getApplicantList.data.data.applicants);
    } catch (e) {
      console.log(`Can't fetch list of applicants. Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");
      const orderId = navigation.getParam("orderId");
      const getApplicantList = await serverApi.getApplicantList(
        orderId,
        userToken
      );
      const arrayOfApplicants = getApplicantList.data.data.applicants;
      const filteredApplicants = arrayOfApplicants.filter(applicant =>
        ["applied", "chosen"].includes(applicant.applyStatus)
      );
      setApplicantList([...filteredApplicants]);
      console.log(`getApplicantList: `, getApplicantList.data.data);
    } catch (e) {
      console.log(`Can't fetch list of applicants. Error: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  const _renderTabBar = props => (
    <TabBar
      {...props}
      activeColor="#E2227"
      inactiveColor="#ABB2BB"
      indicatorStyle={{ backgroundColor: "#1E2227" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontSize: 16 }}
    />
  );

  const FirstRoute = () => (
    <>
      <ScrollView
        style={{ backgroundColor: "#f1f3f5" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {loading ? (
          <Loader />
        ) : applicantList && applicantList.length === 0 ? (
          <DefaultContainer>
            <Text>현재 지원자가 없습니다</Text>
          </DefaultContainer>
        ) : (
          applicantList &&
          applicantList.map(applicant => (
            <ApplicantCard key={applicant.applicantId} {...applicant}>
              <Button
                onPress={() => handleChoice(applicant.applicantInfo.userId)}
              >
                <ButtonText>러너 선택</ButtonText>
              </Button>
            </ApplicantCard>
          ))
        )}
      </ScrollView>
    </>
  );
  const SecondRoute = () => (
    <ScrollView
      style={{ backgroundColor: "#f1f3f5" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <Container>
        <MyOrderDetail id={orderId} />
      </Container>
    </ScrollView>
  );

  return (
    <>
      <TabView
        navigationState={{ index, routes: [...routes] }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute
        })}
        renderTabBar={_renderTabBar}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: constants.width }}
      />
    </>
  );
};

export default ApplicantsList;

// Array [
//   Object {
//     "applicantId": 4,
//     "applicantInfo": Object {
//       "age": "1989",
//       "getScore": Array [
//         Object {
//           "score": 5,
//         },
//         Object {
//           "score": 4,
//         },
//         Object {
//           "score": 1,
//         },
//       ],
//       "image": "https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default",
//       "introduction": "안녕하세요",
//       "major": "vroom backend",
//       "nickname": "김해준",
//       "phone": "01042926693",
//       "sex": "Male",
//       "userId": 3,
//     },
//     "applyComment": null,
//     "applyStatus": "applied",
//     "bidPrice": null,
//     "createdAt": "2019-11-23 00:00:00",
//     "orderId": 1,
//     "updatedAt": "2019-11-23 00:00:00",
//     "userId": 3,
//   },
//   Object {
//     "applicantId": 8,
//     "applicantInfo": Object {
//       "age": "1991",
//       "getScore": Array [
//         Object {
//           "score": 5,
//         },
//         Object {
//           "score": 4,
//         },
//         Object {
//           "score": 2,
//         },
//       ],
//       "image": "https://vroom-database.s3.ap-northeast-2.amazonaws.com/userImage/default",
//       "introduction": "안녕하세요",
//       "major": "vroom front",
//       "nickname": "김조은",
//       "phone": "01094402182",
//       "sex": "Female",
//       "userId": 2,
//     },
//     "applyComment": null,
//     "applyStatus": "applied",
//     "bidPrice": null,
//     "createdAt": "2019-11-25 17:51:06",
//     "orderId": 1,
//     "updatedAt": "2019-11-25 17:51:06",
//     "userId": 2,
//   },
// ]
