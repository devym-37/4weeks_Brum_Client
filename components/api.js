import axios from "axios";

// dotenv.config();
const APPKEY = "Ic5BJfNvJOAFgNLI";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

const tApi = axios.create({
  baseURL: "https://api-sms.cloud.toast.com/"
});

const sApi = axios.create({
  baseURL: "http://13.209.17.154:3000/"
});

export const toastApi = {
  postSMS: (otp, phoneNumber) =>
    tApi.post(`sms/v2.3/appKeys/${APPKEY}/sender/auth/sms`, {
      body: `[${otp}] 쌉가능의 인증번호입니다.`,
      sendNo: "01094402182",
      recipientList: [{ recipientNo: `${phoneNumber}` }]
    })
};

export const serverApi = {
  verifyPhoneNumber: phone => sApi.post("resister/phone", { phone }),
  logIn: (id, ps) =>
    sApi.post("login", {
      phone: id,
      password: ps
    }),
  resister: (id, ps) =>
    sApi.post("resister", {
      phone: id,
      password: ps
    }),
  user: usertoken =>
    sApi.get("user/mypage", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": usertoken
      }
    })
};
