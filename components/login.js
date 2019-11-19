import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

 const api = axios.create({
  baseURL: "http://13.209.17.154:3000"
});

export const loginApi = {
  logIn: (id,ps)=>
  api.post("/login",{
    phone:id,
    password:ps
  }),
  resister: (id,ps)=>
  api.post("/resister",{
    phone:id,
    password:ps
  }),
  user: usertoken=>
  api.get("/user/mypage",{ headers: { 
      'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'x-access-token',
  'x-access-token': usertoken } })
  
}

 