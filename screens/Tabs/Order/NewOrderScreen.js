// Imports: Dependencies
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Imports: Custom components
import AuthInput from "../../../components/Inputs/AuthInput";
import useInput from "../../../hooks/useInput";
import MainButton from "../../../components/Buttons/MainButton";
import ErrorMessage from "../../../components/ErrorMessage";

// Imports: API
import { serverApi } from "../../../components/API";

// Imports: Redux Actions
import { login } from "../../../redux/actions/authActions";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .label("Title")
    .required("제목을 입력해주세요")
    .min(4, "제목은 최소 4글자 이상 입력해주세요"),

  departure: Yup.string().label("Departure"),

  arrivalTime: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("확인을 위해 비밀번호를 한번더 입력해주세요"),
  age: Yup.string().min(4, "출생연도는 4글자 입력해주세요. 예) 0000년도"),

  agreement_term: Yup.boolean().oneOf([true], "이용약관에 동의해주세요"),
  agreement_privacy: Yup.boolean().oneOf(
    [true],
    "개인정보 수집 및 이용동의에 동의해주세요"
  ),
  agreement_ad: Yup.boolean().oneOf([true, false]),

  createdOn: Yup.date().default(function() {
    return new Date();
  })
});

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LinkContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 10px 0 20px 0;
`;

const Touchable = styled.TouchableOpacity``;

const Link = styled.View``;

const LinkText = styled.Text`
  color: ${props => props.theme.greyColor};
  font-weight: 400;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.greyColor};
`;
const Text = styled.Text`
  color: ${props => props.theme.greyColor};
  font-weight: 400;
`;

const Signup = props => {
  const handleSend = async values => {
    // console.log(`values: `, values);
    if (values.name.length === 0 || values.password.length === 0) {
      Alert.alert("입력이 올바르지 않습니다");
    }

    try {
      const signUp = await serverApi.register(
        values.phone,
        values.password,
        values.name
      );

      console.log(`signUp: `, signUp);

      if (signUp.data.token !== false) {
        await AsyncStorage.setItem("userToken", signUp.data.token);
        props.reduxLogin(true);
        setTimeout(() => {
          props.navigation.navigate("HomeScreen");
        }, 200);
      }
    } catch (e) {
      Alert.alert("회원가입에 실패했습니다");
      console.log(`Can't signup. error : ${e}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <Formik
            initialValues={{
              phone: `${props.phone ? props.phone : ""}`,
              password: "",
              confirmPassword: "",
              name: "",
              age: ""
            }}
            onSubmit={values => {
              handleSend(values);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
              setFieldValue
            }) => (
              <>
                {props.phone ? (
                  <AuthInput
                    placeholder={"휴대폰 번호(-없이 숫자만 입력)"}
                    keyboardType="numeric"
                    returnKeyType="next"
                    value={props.phone}
                    editable={false}
                  />
                ) : (
                  <AuthInput
                    placeholder={"휴대폰 번호(-없이 숫자만 입력)"}
                    onChange={handleChange("phone")}
                    keyboardType="numeric"
                    returnKeyType="next"
                    value={values.phone}
                    onBlur={handleBlur("phone")}
                  />
                )}

                <ErrorMessage errorValue={touched.phone && errors.phone} />
                <AuthInput
                  placeholder={"비밀번호 (6자리 이상)"}
                  onChange={handleChange("password")}
                  keyboardType="default"
                  returnKeyType="next"
                  onBlur={handleBlur("password")}
                  value={values.password}
                ></AuthInput>
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                <AuthInput
                  placeholder={"비밀번호 확인"}
                  onChange={handleChange("confirmPassword")}
                  keyboardType="default"
                  returnKeyType="next"
                  value={values.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                ></AuthInput>
                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
                <AuthInput
                  placeholder={"이름(성함)"}
                  keyboardType="default"
                  returnKeyType="next"
                  value={values.name}
                  onBlur={handleBlur("name")}
                  onChange={handleChange("name")}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <AuthInput
                  placeholder={"출생년도(선택) 예)1991"}
                  keyboardType="numeric"
                  returnKeyType="next"
                  value={values.age}
                  onBlur={handleBlur("age")}
                  onChange={handleChange("age")}
                />
                <ErrorMessage />

                <ErrorMessage />
                <MainButton
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  text="동의하고 시작하기"
                />
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    phone: state.phoneReducer.phone
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxLogin: trueFalse => dispatch(login(trueFalse))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
