import React, { useState } from "react";
import styled from "styled-components";

import {
  Picker,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import MainButton from "../../components/Buttons/MainButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { Container, Form, Item, Header, Button, Title } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { setApiKey } from "expo-location";
import { serverApi } from "../../components/API";
import { Col, Row, Grid } from "react-native-easy-grid";
import { UniList } from "../../components/unilist";
//import { Camera } from "expo-camera";
//import { serverApi } from '../../components/api';

/* const UniList = {
  한양대: [
    "과를 선택해주세요",
    "건축학부",
    "건축공학부",
    "건설환경공학과",
    "도시공학과",
    "자원환경공학과",
    "융합전자공학부",
    "전기.생체공학부",
    "신소재공학부",
    "화학공학과",
    "생명공학과",
    "유기나노공학과",
    "에너지공학과",
    "기계공학부",
    "원자력공학과",
    "산업공학과",
    "미래자동차공학과",
    "컴퓨터소프트웨어학부",
    "정보시스템학과",
    "의예과",
    "의학과",
    "국어국문학과",
    "중어중문학과",
    "영어영문학과",
    "독어독문학과",
    "사학과",
    "철학과"
  ],
  서울대: ["과를 선택해주세요", "건축학부", "건축공학부", "건설환경공학과"]
}; */

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text`
  color: black;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin-top: 8;
`;

const Userinfo = props => {
  const [selected, setSelected] = useState("학교를 선택해주세요");
  const [selectedmajor, setSelectedmajor] = useState(undefined);
  const [Loading, setLoading] = useState(false);
  const [CameraPermission, setCameraPermission] = useState(false);
  const [Imageadded, setImageadded] = useState(undefined);

  const selectPicture = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    console.log("상태", status);
    console.log(ImagePicker);
    setCameraPermission(status === "granted");
    try {
      setLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      console.log("상태dfsd", result.uri);
      if (!result.cancelled) {
        setImageadded(result.uri);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const takePicture = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    console.log("상태", status);
    console.log(ImagePicker);
    let result = await ImagePicker.launchCameraLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log("상태dfsd", result.uri);
    if (!result.cancelled) {
      setImageadded(result.uri);
    }
    try {
      setLoading(true);
      setCameraPermission(status === "granted");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const onValueChange = e => {
    console.log("선택된 옵션", e);
    setSelected(e);
  };
  const onValueChangemajor = e => {
    console.log("선택된 옵션", e);
    setSelectedmajor(e);
  };

  const handleSubmit = async () => {
    try {
      let usertoken = await AsyncStorage.getItem("userToken");

      console.log("토큰이다", usertoken);
      console.log("사진업로드", Imageadded);

      setLoading(true);
      let result = await serverApi.uploadimage(usertoken, Imageadded);
      console.log("이미지업로드", result);

      if (result.ok) {
        Alert.alert("제출이 성공적으로 완료되었습니다");
        props.navigation.navigate("HomeScreen");
      }
    } catch (e) {
      console.log("image uplead error", e);
    } finally {
      setLoading(false);
      console.log("it#sover");
    }
  };

  const majorList = props => {
    console.log(UniList[selected]);
    if (selected === "학교를 선택해주세요") {
      return (
        <Picker.Item
          label="학교를 선택해주세요"
          key="0"
          value="학교를 선택해주세요"
        />
      );
    }
    return UniList[selected].map((major: string, i) => {
      return <Picker.Item label={major} key={i} value={major} />;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <View>
          <Form>
            <Text>대학교</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: 300, height: 200, marginTop: 5 }}
                selectedValue={selected}
                onValueChange={onValueChange}
              >
                <Picker.Item
                  label="학교를 선택해주세요"
                  key="0"
                  value="학교를 선택해주세요"
                />
                <Picker.Item label="한양대" key="1" value="한양대" />
                <Picker.Item label="서울대" key="2" value="서울대" />
              </Picker>
            </Item>
            <Text>전공</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: 300, height: 200, marginTop: 5 }}
                selectedValue={selectedmajor}
                onValueChange={onValueChangemajor}
              >
                {majorList()}
              </Picker>
            </Item>
          </Form>
          {Imageadded ? (
            <Grid>
              <Row style={{ alignContent: "center", margin: 50 }}>
                <Image
                  source={{ uri: Imageadded }}
                  style={{ width: 200, height: 200, marginBottom: 15 }}
                />
              </Row>
              <Row>
                <GhostButton text="다른사진 고르기" onPress={selectPicture} />
              </Row>
            </Grid>
          ) : (
            <GhostButton text="사진 고르기" onPress={selectPicture} />
          )}

          <MainButton onPress={handleSubmit} text="제출하기" />
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Userinfo;
/* {loading ? (
  <Text>camera</Text>
) : hasAllow ? (
  <Camera
  />
) : null} */
/* const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
}); */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 5,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25,
    marginBottom: 15
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  }
});
