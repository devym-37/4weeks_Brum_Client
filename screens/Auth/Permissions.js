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
import {
  withNavigation,
  NavigationActions,
  StackActions
} from "react-navigation";
// Imports: Redux Actions
import { permissions } from "../../redux/actions/authActions";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text`
  color: black;
  font-size: 25px
  font-weight: 400;
`;

export default PermissionApp = props => {
  const [Loading, setLoading] = useState(false);
  const [CameraPermission, setCameraPermission] = useState(false);

  const checkMultiPermissions = async props => {
    try {
      setLoading(true);
      const { status, expires, permissions } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS,
        Permissions.CONTACTS,
        Permissions.LOCATION,
        Permissions.CAMERA
      );
      console.log("상태확인", status);
      if (status === "granted") {
        //props.reduxPermissions(true);
        await AsyncStorage.setItem("permiSsions", "true");
        //props.navigation.navigate("Login");
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "MainNavigation" })]
        });
        navigation.dispatch(resetAction);
      } else {
        alert("Hey! You have not enabled selected permissions");
        const { status, expires, permissions } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
          Permissions.CONTACTS,
          Permissions.LOCATION,
          Permissions.CAMERA
        );
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

  return (
    <View>
      <Text>디바이스 접근권한</Text>

      <MainButton onPress={checkMultiPermissions} text="동의하고 시작하기" />
    </View>
  );
};
// 선택된 사진

/* const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    isAllowed: state.permissionsReducer.isAllowed
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxPermissions: trueFalse => dispatch(permissions(trueFalse))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PermissionApp);
 */
