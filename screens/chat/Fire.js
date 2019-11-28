import firebase from "firebase";
import { AsyncStorage } from "react-native";
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
        storageBucket: "",
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

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
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
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user
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

  getorderid = async () => {
    const orderid = await AsyncStorage.getItem("orderid");
    this.orderId = orderid;
    console.log("shsladkfhasldfh", this.orderId);
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    const orderid = 1;
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
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

  appendUser = (userId, orderId) =>
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

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
