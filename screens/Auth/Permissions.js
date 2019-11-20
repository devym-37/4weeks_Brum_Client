import * as Permissions from "expo-permissions";
import React, { useState, useEffect } from "react";
import MainButton from "../../components/Buttons/MainButton";
import styled from "styled-components";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import GhostButton from "../../components/Buttons/GhostButton";
import { connect } from "react-redux";
import { serverApi } from "../../components/API";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const PermissionApp = props => {
  const [Loading, setLoading] = useState(false);
  const [CameraPermission, setCameraPermission] = useState(false);

  const checkMultiPermissions = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
        Permissions.CONTACTS,
        Permissions.LOCATION,
        Permissions.CAMERA
      );
      console.log(status);
      if (status) {
        props.navigation.navigate("Login");
      } else {
        const { status, expires, permissions } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
          Permissions.CONTACTS,
          Permissions.LOCATION,
          Permissions.CAMERA
        );
      }

      if (status !== "granted") {
        alert("Hey! You heve not enabled selected permissions");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setLoading(false);
    }
  };

  /* useEffect(() => {
    checkMultiPermissions();
  }); */

  retrurn(
    <View>
      <MainButton onPress={checkMultiPermissions} text="동의하고 시작하기" />
    </View>
  );
};
// 선택된 사진
const [selected, setSelected] = useState();
// 로딩
const [loading, setLoading] = useState(false);
//접근 권한 허용했는지
const [hasAllow, setHasAllow] = useState(false);

export default PermissionApp;
