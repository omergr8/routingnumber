import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBk5WL0RLpDk_ooHqLTl_eQMkjk_2U8Eag",
  authDomain: "routingno.firebaseapp.com",
  databaseURL: "https://routingno-default-rtdb.firebaseio.com",
  projectId: "routingno",
  storageBucket: "routingno.appspot.com",
  messagingSenderId: "785432049955",
  appId: "1:785432049955:web:fc6df46a465f2c4e7e7496",
  measurementId: "G-K8M783X71D",
});
export const auth = firebaseConfig.auth();
export const db = firebase.database();
export default firebaseConfig;
