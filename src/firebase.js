import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCMo6V3KR6cwjo-z_WQW6k-UZJP14SpTd4",
  authDomain: "plant-me-up.firebaseapp.com",
  databaseURL: "https://plant-me-up.firebaseio.com",
  projectId: "plant-me-up",
  storageBucket: "plant-me-up.appspot.com",
  messagingSenderId: "792045568385",
  appId: "1:792045568385:web:9648100f2228ee09496880",
  measurementId: "G-MS948XYSWE"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { firebase, storage };
