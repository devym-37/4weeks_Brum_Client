import styled from "styled-components";
import React, { useState, useEffect } from "react";

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
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const SelectPhoto = props => {
  const [CameraPermission, setCameraPermission] = useState(false);
  const [Loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    try {
      if (Imageadded) {
        let usertoken = await AsyncStorage.getItem("userToken");

        //console.log("토큰이다", usertoken);
        //console.log("사진업로드", Imageadded);

        setLoading(true);
        let result = await serverApi.uploadimage(usertoken, Imageadded);
        console.log("이미지업로드", result);

        if (result.ok) {
          Alert.alert("제출이 성공적으로 완료되었습니다");
          props.navigation.navigate("BottomNavigation");
        } else {
          Alert.alert("등록실패");
        }
      } else {
        props.navigation.navigate("BottomNavigation");
      }
    } catch (e) {
      console.log("image uplead error", e);
    } finally {
      setLoading(false);
      console.log("it#sover");
    }
  };

  return (
    <View>
      <Text>Select</Text>
      <Grid>
        {Imageadded ? (
          <Col>
            <Row>
              <Image
                source={{ uri: Imageadded }}
                style={{ width: 200, height: 200, marginBottom: 15 }}
              />
            </Row>
            <Row>
              <GhostButton text="다른사진 고르기" onPress={selectPicture} />
              <MainButton onPress={handleSubmit} text="제출하기" />
            </Row>
          </Col>
        ) : (
          <Col>
            <Row>
              <GhostButton text="사진 고르기" onPress={selectPicture} />
            </Row>
            <Row>
              <MainButton onPress={handleSubmit} text="넘어가기" />
            </Row>
          </Col>
        )}
      </Grid>
    </View>
  );
};

export default SelectPhoto;
