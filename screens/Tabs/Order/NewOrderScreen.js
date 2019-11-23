// Imports: Dependencies
import React, { useState, Fragment } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { Formik } from "formik";
import { CheckBox } from "react-native-elements";
import * as Yup from "yup";

// import CheckBox from "../../../components/CheckBox";
import FormInput from "../../../components/Inputs/FormInput";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .label("Title")
    .required("글제목을 입력해주세요")
    .min(4, "글제목은 최소 4글자 이상 최대 24글자 이하로 입력해주세요")
    .max(24, "글제족은 최소 4글자 이상 최대 24글자 이내로 작성해주세요"),
  category: Yup.string()
    .label("Category")
    .required("카테고리를 선택해주세요"),
  departure: Yup.string().label("Departure"),
  arrival: Yup.string()
    .label("Arrival")
    .required("도착지를 입력해주세요"),
  desiredArrivaltime: Yup.string().label("DesiredArrivalTime"),
  message: Yup.string()
    .label("Message")
    .max(250, "요청 상세내용은 250자 이내로 작성해주세요"),
  price: Yup.number()
    .integer()
    .positive()
    .label("Price"),
  check: Yup.boolean().label("Check")
});
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.View``;

// const CheckBox = styled.CheckBox``;
const OrderFormScreen = () => {
  const handleSend = values => {
    console.log(`NewOrder values: `, values);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <FormInput placeholder={"글 제목"} />
        <FormInput placeholder={"카테고리 선택"} />
        <FormInput placeholder={"출발지(선택사항)"} />
        <FormInput placeholder={"도착지"} />
        <FormInput placeholder={"희망도착시간"} />
        <FormInput placeholder={"₩ 가격 입력(선택사항)"} />
        <CheckBox
          // containerStyle={styles.checkBoxContainer}
          checkedIcon="check-box"
          iconType="material"
          uncheckedIcon="check-box-outline-blank"
          title="가격제안받기"
          checked={true}
          // onPress={() => setFieldValue("check", !values.check)}
        />
        {/* <Formik
          initialValues={{
            title: "dfsd",
            category: "dd",
            departure: null,
            arrival: "",
            desiredArrivaltime: null,
            message: null,
            check: false,
            price: null
          }}
          onSubmit={values => {
            handleSend(values);
          }}
          validationSchema={validationSchema}
        > */}
        {/* {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => ( */}
        {/* <Fragment> */}
        {/* <FormInput
          placeholder={"글 제목"} */}
        {/* // value={values.title}
          // onChange={handleChange("title")}
          // KeyboardType="default"
          // returnKeyType="next" */}
        {/* /> */}
        {/* <CheckBox
                // containerStyle={styles.checkBoxContainer}
                checkedIcon="check-box"
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                title="가격제안받기"
                checked={values.check}
                onPress={() => setFieldValue("check", !values.check)}
              /> */}
        {/* </Fragment> */}
        {/* )} */}
        {/* </Formik> */}
      </>
    </TouchableWithoutFeedback>
  );
};

export default OrderFormScreen;

// {/* <Formik
//         initialValues={{
//           title: "dfsd",
//           category: "dd",
//           departure: null,
//           arrival: "",
//           desiredArrivaltime: null,
//           message: null,
//           check: false,
//           price: null
//         }}
//         onSubmit={values => {
//           handleSend(values);
//         }}
//         validationSchema={validationSchema}
//       > */}
//       {/* {({
//           handleChange,
//           values,
//           handleSubmit,
//           errors,
//           isValid,
//           touched,
//           handleBlur,
//           isSubmitting,
//           setFieldValue
//         }) => ( */}
//       {/* <Fragment> */}
//       <FormInput
//         placeholder={"글 제목"}
//         // value={values.title}
//         // onChange={handleChange("title")}
//         KeyboardType="default"
//         returnKeyType="next"
//       />
//       {/* <CheckBox
//               // containerStyle={styles.checkBoxContainer}
//               checkedIcon="check-box"
//               iconType="material"
//               uncheckedIcon="check-box-outline-blank"
//               title="가격제안받기"
//               checked={values.check}
//               onPress={() => setFieldValue("check", !values.check)}
//             /> */}
//       {/* </Fragment> */}
//       {/* )} */}
//       {/* </Formik> */}
