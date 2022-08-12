const { request, response } = require('express');
const express = require('express');
const app = express();

var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//html <script> 태그로 import 하지 않고 nodeJS require 를 이용하여 모듈 이용
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    // 개인키 삽입 필요
};
firebase.initializeApp(firebaseConfig);

app.get('/', (request, response) => {
    var html = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ex03_pratice</title>
        </head>
        
        <body>
            <form method="post" action="/process">
                <label for="pass" class="label">Email Address</label>
                <input name="new_email" type="text"><br>
                <label for="pass" class="label">Password</label>
                <input name="new_pw_1" type="password" class="input" data-type="password"><br>
                <label for="pass" class="label">Repeat Password</label>
                <input name="new_pw_2" type="password" class="input" data-type="password"><br>
                <input type="submit">
            </form>
        </body>
        
        </html>
    `
    response.send(html);
});

app.post('/process', (request, response) => {
    var post = request.body;
    var email = post['new_email'];
    var pw1 = post['new_pw_1'];
    var pw2 = post['new_pw_2'];

    if(pw1 != pw2) {
        response.send('확인 비밀번호와 일치하지 않습니다.');
        console.log('비밀번호 입력 오류');
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, pw2)
            .then(() => {
                response.send('회원가입 완료 되었습니다.');
                console.log('회원가입 완료')
            })
            .catch(err => {
                var errCode = err.code;
                var errMsg = err.message;
                response.send(errMsg);
                console.log('error: ', errCode)
            })
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
