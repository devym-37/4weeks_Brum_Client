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

const campus = {
  hanyang: {
    kor: "한양대",
    eng: "hanyang",
    position: { latitude: 37.556126, longitude: 127.047124 }
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
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.006;

export default {
  width,
  height,
  orderCategory,
  campus,
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
};
