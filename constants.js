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

//export default { width, height, orderCategory, campusList };
const campus = {
  hanyang: {
    kor: "한양대",
    eng: "hanyang",
    position: { latitude: 37.55737, longitude: 127.047132 }
  },
  snu: {
    kor: "서울대",
    eng: "snu",
    position: { latitude: 37.459228, longitude: 126.952052 }
  },
  yonsei: {
    kor: "연세대",
    eng: "yonsei",
    position: { latitude: 37.564624, longitude: 126.93755 }
  },
  ehwa: {
    kor: "이화여대",
    eng: "ehwa",
    position: { latitude: 37.561865, longitude: 126.946714 }
  }
};

const LATITUDE = 37.565687;
const LONGITUDE = 126.978045;
const LATITUDE_DELTA = 0.006;
const LONGITUDE_DELTA = 0.001;

export default {
  width,
  height,
  orderCategory,
  campus,
  campusList,
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
};
