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
  TouchableOpacity,
  KeyboardAvoidingView
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
import utils from "../../../utils";
import checkedBox from "../../../assets/checkedBox.png";
import uncheckedBox from "../../../assets/uncheckedBox.png";
// Imports: Redux Actions
import { login } from "../../../redux/actions/authActions";
import {
  isPriceSaver,
  priceSaver,
  timeSaver,
  titleSaver,
  detailsSaver,
  photoRemover
} from "../../../redux/actions/orderActions";
// import { timeSaver } from "../../../redux/actions/orderTimeActions";
// import { isPriceSaver } from "../../../redux/actions/orderIsPriceActions";
// import {cate} from "../../../redux/actions/orderCategoryActions";

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
  const [departure, setDeparture] = useState("출발지･도착지 선택");
  const [arrival, setArrival] = useState("도착지");
  const [title, setTitle] = useState();
  const [price, setPrice] = useState(props.price);
  const [isPrice, setIsPrice] = useState(false);
  // const [checked, setChecked] = useState(false);

  const [timeText, setTimeText] = useState(
    props.time ? props.time : "희망 도착시간(선택)"
  );

  const [timeTextColor, setTimeTextColor] = useState(
    props.time ? "#1D2025" : "#d5dae0"
  );
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleChangeTitle = value => {
    props.reduxTitle(value);
    // setTitle(value);
    // console.log(`value: `, value);
  };

  const handleChangePrice = value => {
    // console.log(`price: `, value);
    let priceWithComma = utils.numberWithCommas(value);
    setPrice(priceWithComma);
    props.reduxPrice(value);
  };

  const handleChangeMessage = value => {
    console.log(`message: `, value);
    props.reduxDetails(value);
  };

  const handleDatePicked = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours > 12) {
      setTimeText(`오후 ${hours - 12}시 ${minutes}분 도착희망`);
    } else {
      setTimeText(`오전 ${hours}시 ${minutes}분 도착희망`);
    }

    setTimeTextColor("#1D2025");
    props.reduxTime(utils.formatDate(date));
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

  const handleIsPrice = () => {
    setIsPrice(!isPrice);
    props.reduxChecked(!props.isPrice);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior="padding"
        keyboardVerticalOffset={90}
      >
        <ScrollView>
          <View>
            <>
              <FormInput
                placeholder={"글 제목"}
                onChange={value => handleChangeTitle(value)}
                keyboardType="default"
                returnKeyType="next"
                value={props.title}
              />
              <ErrorMessage />

              <Picker
                text={props.category ? props.category : "카테고리 선택"}
                onPress={handleCategoryFilter}
                color="#1D2025"
              />

              <ErrorMessage />
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
              {/* <Picker
                    text={arrival}
                    onPress={handleAddressButton}
                    color="#1D2025"
                  /> */}

              {/* <ErrorMessage
                    errorValue={touched.arrival && errors.arrival}
                  /> */}

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
                value={price}
                onChange={value => handleChangePrice(value)}
                maxLength={7}
              >
                <Checkbox
                  label="가격제안 받기"
                  checkboxStyle={{ height: 22, width: 22 }}
                  labelStyle={{ color: "#1D2025", marginLeft: -4 }}
                  checked={
                    props.navigation.getParam("title") ? props.isPrice : isPrice
                  }
                  containerStyle={{
                    width: 110,
                    marginLeft: -4
                  }}
                  checkedImage={checkedBox}
                  uncheckedImage={uncheckedBox}
                  onChange={handleIsPrice}
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
                value={props.details}
                onChange={e => handleChangeMessage(e)}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    phone: state.phoneReducer.phone,
    title: state.orderReducer.title,
    category: state.orderReducer.category,
    time: state.orderReducer.desiredArrivalTime,
    isPrice: state.orderReducer.isPrice,
    message: state.orderReducer.details,
    images: state.orderReducer.images,
    price: state.orderReducer.price,
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
    reduxPrice: price => dispatch(priceSaver(price)),
    reduxChecked: () => dispatch(isPriceSaver()),
    reduxDetails: message => dispatch(detailsSaver(message))
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
