import firebase from "firebase";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { serverApi } from "../../components/API";

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }
  orderId = null;
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAFkR5s6a3VQ4AePbP856q-pmS4ecXma6c",
        authDomain: "shoppossible-104cf.firebaseapp.com",
        databaseURL: "https://shoppossible-104cf.firebaseio.com",
        projectId: "shoppossible-104cf",
        storageBucket: "gs://shoppossible-104cf.appspot.com",
        messagingSenderId: "468776437417"
        /*  appId: "1:468776437417:web:d2f6566987375050cc8bb8",
        measurementId: "G-2YJ8J64DSL" */
        /* apiKey: "AIzaSyDLgW8QG1qO8O5WZLC1U8WaqCr5-CvEVmo",
        authDomain: "chatter-b85d7.firebaseapp.com",
        databaseURL: "https://chatter-b85d7.firebaseio.com",
        projectId: "chatter-b85d7",
        storageBucket: "",
        messagingSenderId: "861166145757" */
      });
    }
  };
  //__
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = async user => {
    //
   //const email = await AsyncStorage.getItem("email");
    //const password = await AsyncStorage.getItem("password");
    // console.log("채팅 로그인이 안됨", email, password);
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("messages");
  }

  parse = snapshot => {
    const { createdAt, text, user, image } = snapshot.val();
    const { key: _id } = snapshot;
    //const timestamp = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
      image
    };
    return message;
  };

  on = async callback => {
    const orderid = await AsyncStorage.getItem("orderid");
    this.orderId = orderid;
    console.log("Fire", this.orderId);

    firebase
      .database()
      .ref(`threads/${this.orderId}/messages`)
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  getlastone =  (orderId)  => { 
    console.log( "주문번호",orderId)
    firebase
      .database()
      .ref(`threads/${orderId}/messages`)
      .limitToLast(1)
      .on("child_added", snapshot =>{ 
        console.log("파싱",this.parse(snapshot))
        return this.parse(snapshot)});
  };


  getorderid = async () => {
    const orderid = await AsyncStorage.getItem("orderid");
    this.orderId = orderid;
    console.log("shsladkfhasldfh", this.orderId);
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = async (messages, image) => {
    const pushToken = await AsyncStorage.getItem("pushToken");
    const userToken = await AsyncStorage.getItem("userToken");
    const userid = await AsyncStorage.getItem("userId");
    const orderid = await AsyncStorage.getItem("orderid");
    const newarr = [];
    const temp = [];

    const getkey = await firebase
      .database()
      .ref(`threads/${orderid}/users`)
      .once("value");
    const keyvalue = getkey.val();
    //console.log("왜안돼", keyvalue);

    for (const key in keyvalue) {
      console.log("무슨키", key, key === userid);
      if (key !== userid) {
        temp.push(key);
      }
    }

    for (const key in temp) {
      console.log(temp[key]);
      const gettoken = await firebase
        .database()
        .ref(`users/${temp[key]}/pushtoken`)
        .once("value");
      console.log("토큰들", gettoken.val());
      newarr.push(gettoken.val());
    }

    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const time = new Date();
      const message = {
        text,
        user,
        image,
        createdAt: this.timestamp
      };
      this.append(message);

      console.log("my푸쉬토큰", image);
    }

    newarr.forEach(user => {
      if (user !== null) {
        console.log("마지막", user);
        axios({
          url: "https://exp.host/--/api/v2/push/send",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          data: {
            to: `ExponentPushToken[${user}]`,
            sound: "default",
            title: "Vroom",
            body: `새로운 메세지가 도착했습니다.`
          }
        }).catch(err => {
          throw err;
        });
      }
    });
  };

  append = async message => {
    const orderid = await AsyncStorage.getItem("orderid");
    this.orderId = orderid;
    console.log("Fire", this.orderId);

    firebase
      .database()
      .ref(`threads/${this.orderId}/messages`)
      .push(message);
  };

  appendChatrooms = (userId, orderId, deliverId) =>
    firebase
      .database()
      .ref(`threads/${orderId}/users/${userId}`)
      .set(true)
      .then(() =>
        firebase
          .database()
          .ref(`threads/${orderId}/users/${deliverId}`)
          .set(true)
      )
      .then(() =>
        firebase
          .database()
          .ref(`users/${userId}/threads/${orderId}`)
          .set(true)
      )
      .then(() =>
        firebase
          .database()
          .ref(`users/${deliverId}/threads/${orderId}`)
          .set(true)
      );

  appendUser = userId =>
    firebase
      .database()
      .ref(`users/${userId}/name`)
      .set(userId)
      .then(() => {
        firebase
          .database()
          .ref("users")
          .on("value", data => {
            console.log(data);
          });
      });

  appendPushtoken = (userId, pushToken) => {
    firebase
      .database()
      .ref(`users/${userId}/pushtoken`)
      .set(pushToken);
  };

  updatePushtoken = (userId, pushToken) => {
    firebase
      .database()
      .ref(`users/${userId}/pushtoken`)
      .update(pushToken);
  };

  signup = (id, pw) => {
    firebase.auth().createUserWithEmailAndPassword(id, pw);
  };

  signin = () => {
    //console.log("왜 문자열이 아닌가", id, typeof id);
    firebase.auth().signInAnonymously();
  };

  ///
  resetPassword = (phone, value1) => {
    const user = `${phone}@@shoppossible.com`;

    firebase
      .auth()
      .createUserWithEmailAndPassword(`${id}@shoppossible.com`, pw);
  };

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
