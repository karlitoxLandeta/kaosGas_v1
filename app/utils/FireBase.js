import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyC9O1El_z9jPlsHm8l7i8T7C4nBUI35Eko",
  authDomain: "tenedores-1272b.firebaseapp.com",
  databaseURL: "https://tenedores-1272b.firebaseio.com",
  projectId: "tenedores-1272b",
  storageBucket: "tenedores-1272b.appspot.com",
  messagingSenderId: "868799426044",
  appId: "1:868799426044:web:6eb46c2ebb591861309679",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
