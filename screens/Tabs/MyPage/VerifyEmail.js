import React, { useState } from "react";
import styled from "styled-components";
import MainButton from "../../../components/Buttons/MainButton";
import AuthInput from "../../../components/Inputs/AuthInput";
import utils from "../../../utils";
import { Alert, AsyncStorage } from "react-native";
import { serverApi } from "../../../components/API";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: -150;
  align-items: center;
`;

const Text = styled.Text`
  color: #22252a;
  font-size: 17;
  margin-bottom: 6px;
`;

const SubText = styled.Text`
  color: ${props => props.theme.greyColor};
  font-size: 13;
  margin-bottom: 24px;
`;
const ButtonContainer = styled.View`
  padding: 6px 0;
`;
const VerifyCampusScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(`email: `, email);
    if (!utils.validateEmailReg(email)) {
      Alert.alert(
        "이메일 형식이 올바르지 않습니다",
        "입력 예) shopssible@hanyang.ac.kr"
      );
    } else if (!utils.verifyEmailAddress(email)) {
      Alert.alert(
        "인증 실패",
        "현재 인증 가능한 메일주소는 한양대, 서울대, 연세대, 이화여대 학교메일주소입니다"
      );
    } else {
      //메일 발송
      const request = await serverApi.verifyEmail(email, userToken);
      if (request.data.isSuccess) {
        console.log(`email request : `, request);
        Alert.alert(
          "인증메일 전송완료",
          "입력하신 메일주소의 메일함을 확인해주세요"
        );
        navigation.navigate("ConfirmEmailScreen", { email: email });
      } else {
        Alert.alert("일시 오류", "죄송합니다. 잠시후 다시 시도해주세요");
      }
    }
  };
  return (
    <Container>
      <Text>{"학교 이메일을 입력해 인증을 완료해주세요"}</Text>
      <SubText>현재는 한양대, 서울대, 연세대, 이화여대만 가능합니다</SubText>
      <AuthInput
        width={40}
        placeholder="이메일 (입력 예: shopssible@hanyang.ac.kr)"
        value={email}
        onChange={value => {
          setEmail(value);
        }}
        autoCapitalize="none"
        returnKeyType="send"
        keyboardType="email-address"
      />
      <ButtonContainer>
        <MainButton text="인증메일 보내기" width={40} onPress={handleSubmit} />
      </ButtonContainer>
    </Container>
  );
};

export default VerifyCampusScreen;
