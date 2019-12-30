import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyAWyGiKFGM5fSOTzgNltHQM4HjDkMgYpoE",
  authDomain: "note-taking-app-5e376.firebaseapp.com",
  databaseURL: "https://note-taking-app-5e376.firebaseio.com",
  projectId: "note-taking-app-5e376",
  storageBucket: "note-taking-app-5e376.appspot.com",
  messagingSenderId: "273821864245",
  appId: "1:273821864245:web:b65fb05f8d7685e564bc7c",
  measurementId: "G-7B9GFKCDBS"
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
