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
  AsyncStorage,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Imports: Custom components
import FormInput from "../../../components/Inputs/FormInput";
import AuthInput from "../../../components/Inputs/AuthInput";
import MainButton from "../../../components/Buttons/MainButton";
import ErrorMessage from "../../../components/ErrorMessage";

// Imports: API
import { serverApi } from "../../../components/API";

// Imports: Redux Actions
import { login } from "../../../redux/actions/authActions";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .label("Title")
    .required("글 제목을 입력해주세요")
    .min(4, "글 제목은 최소 4자 이상 최대 25자 이내로 입력해주세요")
    .max(25, "글 제목은 최소 4자 이상 최대 25자 이내로 입력해주세요"),
  category: Yup.string()
    .label("Category")
    .required("카테고리를 선택해주세요"),
  departure: Yup.string().label("Departure"),

  arrival: Yup.string()
    .required("도착지를 입력해주세요")
    .min(4, "도착지는 최소 4글자 이상 입력해주세요"),
  check: Yup.boolean()
});

const View = styled.View`
  justify-content: flex-start;
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

const NewOrderScreen = props => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [passwordIcon, setPasswordIcon] = useState("ios-eye-off");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("ios-eye-off");

  const handleSend = async values => {
    console.log(`signup values: `, values);
    if (values.name.length === 0 || values.password.length === 0) {
      Alert.alert("입력이 올바르지 않습니다");
    }

    try {
      const signUp = await serverApi.register(
        values.phone,
        values.password,
        values.name,
        values.age
      );

      // Alert.alert("회원가입 및 로그인이 완료되었습니다");

      if (signUp.data.token !== false) {
        await AsyncStorage.setItem("userToken", signUp.data.token);
        props.reduxLogin(true);
        Alert.alert("회원가입 및 로그인이 완료되었습니다");
        setTimeout(() => {
          props.navigation.navigate("BottomNavigation");
        }, 200);
        // setTimeout(() => {
        //   props.navigation.navigate("Userinfo");
        // }, 200);
      } ///err
    } catch (e) {
      Alert.alert("회원가입에 실패했습니다");
      console.log(`Can't signup. error : ${e}`);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
        <View>
          <Formik
            initialValues={{
              title: "",
              category: "",
              departure: "",
              arrival: "",
              desiredArrivalTime: "",
              price: null,
              message: ""
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
                <FormInput
                  placeholder={"글 제목"}
                  onChange={handleChange("title")}
                  keyboardType="default"
                  returnKeyType="next"
                  value={values.title}
                  onBlur={handleBlur("title")}
                />
                <ErrorMessage errorValue={touched.title && errors.title} />
                <FormInput
                  placeholder={"카테고리 선택"}
                  onChange={handleChange("category")}
                  secureTextEntry={passwordVisibility}
                  keyboardType="default"
                  returnKeyType="next"
                  onBlur={handleBlur("category")}
                  value={values.category}
                >
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons
                      style={{ marginLeft: -34 }}
                      name={passwordIcon}
                      size={22}
                      color="rgb(230, 230, 230)"
                    />
                  </TouchableOpacity>
                </FormInput>
                <ErrorMessage
                  errorValue={touched.category && errors.category}
                />

                <FormInput
                  placeholder={"출발지(선택)"}
                  keyboardType="default"
                  returnKeyType="next"
                  value={values.departure}
                  onBlur={handleBlur("departure")}
                  onChange={handleChange("departure")}
                />
                <ErrorMessage />
                <FormInput
                  placeholder={"도착지"}
                  keyboardType="default"
                  returnKeyType="next"
                  value={values.arrival}
                  onBlur={handleBlur("arrival")}
                  onChange={handleChange("arrival")}
                />
                <ErrorMessage errorValue={touched.arrival && errors.arrival} />
                <FormInput
                  placeholder={"희망 도착시간(선택)"}
                  keyboardType="default"
                  returnKeyType="next"
                  value={values.desiredArrivalTime}
                  onBlur={handleBlur("desiredArrivalTime")}
                  onChange={handleChange("desiredArrivalTime")}
                />
                <ErrorMessage />
                <FormInput
                  placeholder={"배달금액(선택)"}
                  keyboardType="numeric"
                  returnKeyType="next"
                  value={values.price}
                  onBlur={handleBlur("price")}
                  onChange={handleChange("price")}
                ></FormInput>
                <FormInput
                  placeholder={
                    "요청에 대한 상세 내용을 작성해주세요. (불법적인 요청은 게시가 제한 될 수 있어요.)"
                  }
                  multiline={true}
                  numberOfLines={20}
                  keyboardType="default"
                  returnKeyType="next"
                  isUnderline={false}
                  value={values.price}
                  onBlur={handleBlur("message")}
                  onChange={handleChange("message")}
                ></FormInput>

                {/* <LinkContainer>
                  <Touchable onPress={() => props.navigation.navigate("Term")}>
                    <Link>
                      <LinkText>이용약관</LinkText>
                    </Link>
                  </Touchable>
                  <Text> 및 </Text>
                  <Touchable
                    onPress={() => props.navigation.navigate("Privacy")}
                  >
                    <Link>
                      <LinkText>개인정보</LinkText>
                    </Link>
                  </Touchable>
                  <Text>취급방침</Text>
                </LinkContainer> */}
                <ErrorMessage />
                {/* <MainButton
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                    text="동의하고 시작하기"
                  /> */}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderScreen);
