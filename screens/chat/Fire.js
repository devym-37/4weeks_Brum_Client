import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

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

  on = callback =>
    firebase
      .database()
      .ref("messages/1")
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  onUsersThreads = callback =>
    this.ref(`/users/${userId}/threads`)
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = (messages, orderid) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message, orderid);
    }
  };

  append = (message, orderid) =>
    firebase
      .database()
      .ref(`threads/${orderid}/messages`)
      .push(message);

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

  onList = userId =>
    firebase
      .database()
      .ref(`users/${userId}/threads`)
      .on("value", data => data);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
