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
  userDislikeOrder: (orderId, userToken) =>
    sApi.delete(`user/like/order/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  userLikeOrder: async (orderId, userToken) =>
    // console.log(`유저토큰: `, userToken);
    await sApi.post(`user/like/order/${orderId}`, null, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),

  verifyPhoneNumber: phone => sApi.post("register/phone", { phone }),
  getAllOrders: () => sApi.get("order"),
  getCampusOrders: campus => sApi.get(`order/campus/${campus}`),
  getUserOrders: userToken =>
    sApi.get("user/order", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  logIn: (id, ps, pushtoken) =>
    sApi.post("login", {
      phone: id,
      password: ps,
      pushToken: pushtoken
    }),
  register: (
    phone,
    password,
    name,
    age,
    campus,
    sex = "male",
    agreementAd = false,
    pushtoken
  ) =>
    sApi.post("register", {
      phone,
      password,
      nickname: name,
      age,
      campus,
      sex,
      agreementAd,
      pushToken: pushtoken
    }),
  user: userToken =>
    sApi.get("user/mypage", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  uploadimage: async (userToken, imgfile) => {
    const formData = new FormData();
    formData.append("file", {
      name: "profil",
      uri: imgfile,
      type: "image/jpg"
    });

    return await fetch("http://13.209.17.154:3000/user/image", {
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    });
  },
  password: (phone, pw, userToken) =>
    sApi.put(
      "password",
      {
        phone: phone,
        password: pw
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": userToken
        }
      }
    ),
  getApplicantList: (orderId, userToken) =>
    sApi.get(`user/order/${orderId}/applicant`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  choiceDeliver: (orderId, deliverId, userToken) => {
    return sApi.put(
      `user/order/${orderId}/applicant`,
      { deliverId },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": userToken
        }
      }
    );
  },
  getAllChats: userToken => {
    return sApi.get("user/chat", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    });
  },
  getChat: (orderId, userToken) => {
    return sApi.get(`user/chat/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    });
  },
  orderdetail: (orderId, userToken) =>
    sApi.get(`order/${orderId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  cancelMyOrder: (orderId, userToken) =>
    sApi.delete(`/user/order/${orderId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  campus: (campus, major) =>
    sApi.put(`user/campus`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Headers": "x-access-token",
        "x-access-token": userToken
      }
    }),
  apply: (bidprice, msg, userToken, orderId) =>
    sApi.post(
      `order/${orderId}/apply`,
      {
        bidPrice: bidprice,
        applyComment: msg
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": userToken
        }
      }
    ),
  reapply: (bidprice, msg, userToken, orderId) =>
    sApi.put(
      `order/${orderId}/apply`,
      {
        bidPrice: bidprice,
        applyComment: msg
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": userToken
        }
      }
    ),
  cancelApply: (orderId, userToken) =>
    sApi.delete(
      `order/${orderId}/apply`,

      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": userToken
        }
      }
    )
};
/* {
  "bidPrice" : "2000",
  "applyComment" : "10분안에 배달 쌉가능"
} */
