import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const orderCategory = [
  "음식배달",
  "마트",
  "문구",
  "사다주기",
  "생활편의",
  "편의점",
  "간편배송",
  "기타"
];

const campusList = {
  hanyang: { kor: "한양대", eng: "hanyang" },
  snu: { kor: "서울대", eng: "snu" },
  yonsei: { kor: "연세대", eng: "yonsei" },
  ehwa: { kor: "이화여대", eng: "ehwa" }
};

export default { width, height, orderCategory, campusList };
