import axios from "axios";
import { setApiKey } from "expo-location";
import { Buffer } from "buffer";
const FormData = require("form-data");
// dotenv.config();
const APPKEY = "Ic5BJfNvJOAFgNLI";

axios.defaults.headers.post["Content-Type"] = undefined;

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
  verifyPhoneNumber: phone => sApi.post("register/phone", { phone }),
  logIn: (id, ps) =>
    sApi.post("login", {
      phone: id,
      password: ps
    }),
  resister: (phone, password, name, sex = "male", agreementAd = false) =>
    sApi.post("register", {
      phone,
      password,
      name,
      sex,
      agreementAd
    }),
  user: usertoken =>
    sApi.get("user/mypage", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": usertoken
      }
    }),
  uploadimage: async (usertoken, imgfile) => {
    const formData = new FormData();

    formData.append("file", {
      name: "profil",
      uri: imgfile,
      type: "image/jpg"
    });
    console.log("사진file", imgfile);
    console.log("사진", formData);
    return await fetch("http://13.209.17.154:3000/user/image", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": usertoken
      }
    });
  },
  password: (phone, pw, usertoken) =>
    sApi.put(
      "password",
      {
        phone: phone,
        password: pw
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": usertoken
        }
      }
    )
};
