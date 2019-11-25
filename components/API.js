import axios from "axios";
import { setApiKey } from "expo-location";
import { Buffer } from "buffer";
const FormData = require("form-data");
// dotenv.config();
const APPKEY = "Ic5BJfNvJOAFgNLI";
// axios.defaults.headers.post["Content-Type"] = undefined;
axios.defaults.headers.post["Content-Type"] = "application/json";

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
  getAllOrders: () => sApi.get("order"),
  getUserOrders: userToken =>
    sApi.get("user/order", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  logIn: (id, ps) =>
    sApi.post("login", {
      phone: id,
      password: ps
    }),
  register: (
    phone,
    password,
    name,
    age,
    campus,
    sex = "male",
    agreementAd = false
  ) =>
    sApi.post("register", {
      phone,
      password,
      nickname: name,
      age,
      campus,
      sex,
      agreementAd
    }),
  user: userToken =>
    sApi.get("user/mypage", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  uploadimage: async (usertoken, imgfile) => {
    //const base64 = `image/jpeg;base64;${imgfile}`;
    const blob = await fetch(imgfile).then(res => res.blob());
    console.log("blob", blob);
    /*
    let filename = imgfile.split("/").pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`; */

    const formData = new FormData();
    //console.log("사진폼", formData);
    //formData.append("name", filename);
    //formData.append("file", blob);
    formData.append("file", {
      name: "profil",
      uri: imgfile,
      type: "image/jpg"
    });
    //console.log("사진file", imgfile);
    //console.log("사진", formData);
    return await fetch("http://13.209.17.154:3000/user/image", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": usertoken
      }
    });
    /* return await axios({
      method: "POST",
      url: "http://13.209.17.154:3000/user/image",
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": usertoken
      }
    }); */
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
    ),
  oderdetail: (userid, usertoken) =>
    sApi.get(`order/${userid}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": usertoken
      }
    })
};
