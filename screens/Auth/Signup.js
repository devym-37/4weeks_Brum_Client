// Imports: Dependencies
import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
// Imports: Custom components
import AuthInput from "../../components/Inputs/AuthInput";
import useInput from "../../hooks/useInput";
import MainButton from "../../components/Buttons/MainButton";
import ErrorMessage from "../../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required("성함을 입력해주세요")
    .min(2, "성함은 최소 2글자 이상 입력해주세요"),
  password: Yup.string()
    .label("Password")
    .required("비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6글자 이상 입력해주세요"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("확인을 위해 비밀번호를 한번더 입력해주세요"),
  age: Yup.string().min(4, "출생연도는 4글자 입렵해주세요. 예) 0000년도"),

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

const Text = styled.Text``;

const Signup = props => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [passwordIcon, setPasswordIcon] = useState("ios-eye-off");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("ios-eye-off");

  const handleSubmit = values => {
    if (values.name.length > 0 && values.password.length > 0) {
      setTimeout(() => {
        props.navigation.navigate("HomeScreen");
      }, 3000);
    }
  };

  const handlePasswordVisibility = () => {
    if (passwordIcon === "ios-eye") {
      setPasswordIcon("ios-eye-off");
      setPasswordVisibility(true);
    } else {
      setPasswordIcon("ios-eye");
      setPasswordVisibility(false);
    }
  };

  const handleConfirmPasswordVisibility = () => {
    if (confirmPasswordIcon === "ios-eye") {
      setConfirmPasswordIcon("ios-eye-off");
      setConfirmPasswordVisibility(true);
    } else {
      setConfirmPasswordIcon("ios-eye");
      setConfirmPasswordVisibility(false);
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View>
        <Formik
          initialValues={{
            phone: `${props.phone}`,
            password: "",
            confirmPassword: "",
            name: "",
            age: ""
          }}
          onSubmit={values => {
            handleSubmit(values);
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
              <AuthInput
                placeholder={""}
                keyboardType="numeric"
                returnKeyType="send"
                value={props.phone}
                editable={false}
              />
              <ErrorMessage />
              <AuthInput
                placeholder={"비밀번호 (6자리 이상)"}
                onChange={handleChange("password")}
                secureTextEntry={passwordVisibility}
                keyboardType="default"
                returnKeyType="next"
                onBlur={handleBlur("password")}
                value={values.password}
              >
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Ionicons
                    style={{ marginLeft: -34 }}
                    name={passwordIcon}
                    size={22}
                    color="grey"
                  />
                </TouchableOpacity>
              </AuthInput>
              <ErrorMessage errorValue={touched.password && errors.password} />
              <AuthInput
                placeholder={"비밀번호 확인"}
                onChange={handleChange("confirmPassword")}
                secureTextEntry={confirmPasswordVisibility}
                keyboardType="default"
                returnKeyType="next"
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
              >
                <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                  <Ionicons
                    style={{ marginLeft: -34 }}
                    name={confirmPasswordIcon}
                    size={22}
                    color="grey"
                  />
                </TouchableOpacity>
              </AuthInput>
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
              <MainButton
                onPress={() => handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                text="동의하고 시작하기"
              />
            </>
          )}
        </Formik>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    phone: state.phoneReducer.phone
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

export default connect(mapStateToProps)(Signup);
