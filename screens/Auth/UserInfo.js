import React, { useState, useEffect } from "react";
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
import constants from "../../constants";

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
  const [selected, setSelected] = useState("한양대"); //바꾸기

  const [selectedmajor, setSelectedmajor] = useState(undefined);
  const [Loading, setLoading] = useState(false);
  const [CameraPermission, setCameraPermission] = useState(false);
  const [Imageadded, setImageadded] = useState(undefined);

  useEffect(() => {
    // Create an scoped async function in the hook
    let isCancelled = false;

    async function fetchData() {
      try {
        // await AsyncStorage.setItem("campus", "한양대"); //연결 후 빼기

        const selectedMajor = await AsyncStorage.getItem("campus");
        console.log("캠퍼스선택", selectedMajor);

        selectedMajor
          ? setSelected(selectedMajor[selectedMajor].kor)
          : setSelected("한양대");
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

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
    //api 필요함
    props.navigation.navigate("SelectPhoto");
    /* try {
      let usertoken = await AsyncStorage.getItem("userToken");

      //console.log("토큰이다", usertoken);
      //console.log("사진업로드", Imageadded);

      setLoading(true);
      let result = await serverApi.uploadimage(usertoken, Imageadded);
      console.log("이미지업로드", result);

      if (result.ok) {
        Alert.alert("제출이 성공적으로 완료되었습니다");
        props.navigation.navigate("BottomNavigation");
      }
    } catch (e) {
      console.log("image uplead error", e);
    } finally {
      setLoading(false);
      console.log("it#sover");
    } */
  };

  const majorList = props => {
    if (selected === "학교를 선택해주세요") {
      //수정해야함
      return (
        <Picker.Item
          label="학교를 선택해주세요"
          key="0"
          value="학교를 선택해주세요"
        />
      );
    }
    return UniList[selected].map((major, i) => {
      return <Picker.Item label={major} key={i} value={major} />;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {selected && (
        <Container>
          <View>
            <Form>
              <Text>{selectedmajor}</Text>
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

            <MainButton onPress={handleSubmit} text="제출하기" />
          </View>
        </Container>
      )}
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
