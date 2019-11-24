import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const orderCategory = [
  "음식배달",
  "마트",
  "문구",
  "사다주기",
  "생활편의",
  "편의점",
  "간편배송"
];
export default { width, height, orderCategory };
