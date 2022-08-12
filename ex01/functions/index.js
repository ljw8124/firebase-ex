const functions = require("firebase-functions");
const firebase = require("firebase");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const firebaseConfig = {
    apiKey: "AIzaSyDlLaQMfDN0SmYSPSIP4L2T1ShXOLgWDWI",
    authDomain: "example-98a50.firebaseapp.com",
    projectId: "example-98a50",
    storageBucket: "example-98a50.appspot.com",
    messagingSenderId: "849572838031",
    appId: "1:849572838031:web:94084d04cb48aa3ce24efa",
    measurementId: "G-B59XTY1QN9"
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  db.collection('example').doc('1').set({1: 1});
