import axios from "axios";

// dotenv.config();
const APPKEY = "Ic5BJfNvJOAFgNLI";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

const api = axios.create({
  baseURL: "https://api-sms.cloud.toast.com/"
});

export const toastApi = {
  postSMS: (otp, phoneNumber) =>
    api.post(`sms/v2.3/appKeys/${APPKEY}/sender/auth/sms`, {
      body: `[${otp}] 쌉가능의 인증번호입니다.`,
      sendNo: "01094402182",
      recipientList: [{ recipientNo: `${phoneNumber}` }]
    })
};
