import axios from "axios";

// dotenv.config();
const APPKEY = "Ic5BJfNvJOAFgNLI";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

var randomNum = {};
//0~9까지의 난수
randomNum.random = function(n1, n2) {
  return parseInt(Math.random() * (n2 - n1 + 1)) + n1;
};
//인증번호를 뽑을 난수 입력 n 5이면 5자리
randomNum.authNo = function(n) {
  var value = "";
  for (var i = 0; i < n; i++) {
    value += randomNum.random(0, 9);
  }
  return value;
};

const api = axios.create({
  baseURL: "https://api-sms.cloud.toast.com/"
});

export const toastApi = {
  postSMS: phoneNumber =>
    api.post(`sms/v2.3/appKeys/${APPKEY}/sender/auth/sms`, {
      body: `[${randomNum.authNo(4)}] 쌉가능의 인증번호입니다.`,
      sendNo: "01094402182",
      recipientList: [{ recipientNo: `${phoneNumber}` }]
    })
};
