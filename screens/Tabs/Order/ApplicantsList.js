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
import GhostButton from "../../../components/Buttons/GhostButton";
import { connect } from "react-redux";
import { refreshMaker } from "../../../redux/actions/refreshActions";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${styles.lightGreyColor};
  font-size: 17;
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

const ButtonContainer = styled.View`
  width: 100px;
  /* height: 3px; */
  position: absolute;
  right: 15px;
  bottom: 15px;

  justify-content: center;
  align-items: center;
`;

const ApplicantsList = ({ navigation, ...props }) => {
  const orderStatus = navigation.getParam("orderStatus");

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
    // console.log(`deliverId: `, typeof deliverId)
    console.log(`orderId: `, orderId);
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem("userToken");

      const userId = await AsyncStorage.getItem("userId");
      // console.log(`유저오더딜리버아이디`, userId, orderId, deliverId);
      Fire.shared.appendChatrooms(userId, orderId, deliverId);

      const request = await serverApi.choiceDeliver(
        orderId,
        deliverId,
        userToken
      );

      // console.log(`배달자 등록: `, request);
      props.reduxRefresh();
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

  // const refresh = async () => {
  //   try {
  //     setLoading(true);
  //     const userToken = await AsyncStorage.getItem("userToken");
  //     const orderId = navigation.getParam("orderId");
  //     const getApplicantList = await serverApi.getApplicantList(
  //       orderId,
  //       userToken
  //     );
  //     const arrayOfApplicants = getApplicantList.data.data.applicants;
  //     const filteredApplicants = arrayOfApplicants.filter(applicant =>
  //       ["applied", "chosen"].includes(applicant.applyStatus)
  //     );
  //     setApplicantList([...filteredApplicants]);
  //     console.log(`getApplicantList: `, getApplicantList.data.data);
  //   } catch (e) {
  //     console.log(`Can't fetch list of applicants. Error: ${e}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    preLoad();
    return () => {
      Fire.shared.off();
    };
  }, [props.refresh]);

  const _renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={"#1E2227"}
      inactiveColor={"#ABB2BB"}
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
          <RefreshControl refreshing={refreshing} onRefresh={preLoad} />
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
              {/* <Button
                onPress={() => handleChoice(applicant.applicantInfo.userId)}
              >
                <ButtonText>러너 선택</ButtonText>
              </Button> */}
              <ButtonContainer>
                <GhostButton
                  text={
                    applicant.applyStatus === "chosen"
                      ? "선택 완료"
                      : orderStatus === 0
                      ? "러너 선택"
                      : "선택 불가"
                  }
                  width={280}
                  paddingVertical={8}
                  onPress={() => handleChoice(applicant.applicantInfo.userId)}
                  disabled={orderStatus !== 0}
                />
              </ButtonContainer>
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
        <RefreshControl refreshing={refreshing} onRefresh={preLoad} />
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
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    refresh: state.refreshReducer.refresh
  };
};
const mapDispatchToProps = dispatch => {
  // Action
  return {
    reduxRefresh: () => dispatch(refreshMaker())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsList);
