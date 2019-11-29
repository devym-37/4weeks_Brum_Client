// Imports: Dependencies
import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Checkbox from "react-native-modest-checkbox";

import DateTimePicker from "react-native-modal-datetime-picker";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

// Imports: Custom components
import FormInput from "../../../components/Inputs/FormInput";
import AuthInput from "../../../components/Inputs/AuthInput";
import MainButton from "../../../components/Buttons/MainButton";
import ErrorMessage from "../../../components/ErrorMessage";
import Picker from "../../../components/Pickers/RoutePicker";
// Imports: API
import { serverApi } from "../../../components/API";

import constants from "../../../constants";
import checkedBox from "../../../assets/checkedBox.png";
import uncheckedBox from "../../../assets/uncheckedBox.png";
// Imports: Redux Actions
import { login } from "../../../redux/actions/authActions";
import {
  timeSaver,
  titleSaver,
  checkedSaver,
  photoRemover
} from "../../../redux/actions/orderActions";
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

const ImageContainer = styled.View`
  width: ${constants.width - 30};
  flex-direction: row;
  align-items: flex-start;
`;
const ImageHolder = styled.View``;
const NewOrderScreen = props => {
  const [category, setCategory] = useState("카테고리 선택");
  const [departure, setDeparture] = useState("출발지(선택사항)");
  const [arrival, setArrival] = useState("도착지");

  // const [checked, setChecked] = useState(false);
  // const [time, setTime] = useState(null);
  const [timeText, setTimeText] = useState("희망 도착시간(선택)");

  const [timeTextColor, setTimeTextColor] = useState("#d5dae0");
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    // setTime(String(date));
    if (hours > 12) {
      setTimeText(`오후 ${hours - 12}시 ${minutes}분 도착희망`);
    } else {
      setTimeText(`오전 ${hours}시 ${minutes}분 도착희망`);
    }

    setTimeTextColor("#1D2025");
    props.reduxTime(String(date));
    hideDateTimePicker();
  };

  const handleDeletePhoto = () => {
    props.reduxDeleteImages();
  };
  const handleCategoryFilter = () => {
    props.navigation.navigate("CategoryFilter");
  };
  const handleAddressButton = () => {
    props.navigation.navigate("SearchAddress");
  };

  const handleSend = async values => {
    // console.log(`signup values: `, values);
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

      Alert.alert("작성이 완료되었습니다");

      if (signUp.data.token !== false) {
        await AsyncStorage.setItem("userToken", signUp.data.token);
        props.reduxLogin(true);
        Alert.alert("회원가입 및 로그인이 완료되었습니다");
        setTimeout(() => {
          props.navigation.navigate("BottomNavigation");
        }, 200);
      } ///err
    } catch (e) {
      Alert.alert("회원가입에 실패했습니다");
      console.log(`Can't signup. error : ${e}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <ErrorMessage />

                <Picker
                  text={props.category ? props.category : "카테고리 선택"}
                  onPress={handleCategoryFilter}
                  color="#1D2025"
                />

                <ErrorMessage
                  errorValue={touched.category && errors.category}
                />
                <Picker
                  text={
                    props.arrivalLocation
                      ? props.departureLocation
                        ? `${props.departureLocation} → ${props.arrivalLocation}`
                        : `${props.arrivalLocation}`
                      : departure
                  }
                  onPress={handleAddressButton}
                  color="#1D2025"
                />
                <ErrorMessage />
                <Picker
                  text={arrival}
                  onPress={handleAddressButton}
                  color="#1D2025"
                />

                <ErrorMessage errorValue={touched.arrival && errors.arrival} />

                <Picker
                  text={timeText}
                  onPress={showDateTimePicker}
                  isRightArrow={false}
                  color={timeTextColor}
                />

                <>
                  <DateTimePicker
                    mode="time"
                    isVisible={isDateTimePickerVisible}
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                  />
                </>
                <ErrorMessage />
                <FormInput
                  width={140}
                  placeholder={"₩ 배달금액(선택사항)"}
                  keyboardType="numeric"
                  returnKeyType="next"
                  value={values.price}
                  onBlur={handleBlur("price")}
                  onChange={handleChange("price")}
                >
                  <Checkbox
                    label="가격제안 받기"
                    checkboxStyle={{ height: 22, width: 22 }}
                    labelStyle={{ color: "#1D2025", marginLeft: -4 }}
                    checked={props.isPrice}
                    containerStyle={{
                      width: 110,
                      marginLeft: -4
                    }}
                    checkedImage={checkedBox}
                    uncheckedImage={uncheckedBox}
                    onChange={() => {
                      props.reduxChecked(!props.isPrice);
                    }}
                  />
                </FormInput>

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
                {props.images && props.images.length > 0 && (
                  <ImageContainer>
                    <ImageHolder>
                      <Image
                        source={{ uri: props.images[0].uri }}
                        style={{
                          width: constants.width / 4,
                          height: constants.height / 8
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          right: -6,
                          top: -6,
                          zIndex: 3
                        }}
                        onPress={handleDeletePhoto}
                      >
                        <AntDesign
                          name="closecircle"
                          size={24}
                          style={{
                            color: "#f3f3f3"
                          }}
                        />
                      </TouchableOpacity>
                    </ImageHolder>
                  </ImageContainer>
                )}
                <ErrorMessage />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    phone: state.phoneReducer.phone,
    title: state.orderReducer.title,
    time: state.orderReducer.desiredArrival,
    isPrice: state.orderReducer.isPrice,
    category: state.orderReducer.category,
    images: state.orderReducer.images,
    arrivalLocation: state.destinationReducer.arrivalLocation,
    departureLocation: state.destinationReducer.departureLocation
  };
};

const mapDispatchToProps = dispatch => {
  // Action
  return {
    // Login
    reduxDeleteImages: () => dispatch(photoRemover()),
    reduxLogin: trueFalse => dispatch(login(trueFalse)),
    reduxTitle: title => dispatch(titleSaver(title)),
    reduxTime: time => dispatch(timeSaver(time)),
    reduxChecked: checked => dispatch(checkedSaver(checked))
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
