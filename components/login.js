import axios from "axios"

axios.defaults.withCredentials = true;





export const login = {
    postLoginAPI: data =>
    axios.post("http://localhost:3001/user/signin", data)

  };