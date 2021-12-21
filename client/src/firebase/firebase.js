import { firebaseConfig } from "../config/firebase.config";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "redirect",
  signInSuccessUrl: process.env.REACT_APP_WEB_URL,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "<your-tos-url>",
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

export const fb = { firebase, firebaseAuth: firebase.auth() };
