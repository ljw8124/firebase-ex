const functions = require("firebase-functions");
const firebase = require("firebase");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const firebaseConfig = {
    
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  db.collection('example').doc('1').set({1: 1});
