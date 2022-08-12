//firestore를 통해 서버 통신 연습 예제
//nodeJS 에서는 require 메서드를 이용하여 외부모듈을 가져올 수 있음

const firebase = require('firebase/app');   //intializeApp을 위해 import
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
    // 개인키 삽입 필요
  };

    firebase.initializeApp(firebaseConfig);
    
    const db = firebase.firestore();

    // db.collection('example').doc('test2').set({'test2': 'hello wolrd'});
    console.log(db.collection('example').doc('test').get('test'));

  