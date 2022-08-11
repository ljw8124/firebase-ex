//클라이언트 사이드에서 코드를 모두 구현
  
//$ npm install express --save 추가 필요! 
// nodejs express 프레임워크도 추가 활용

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
     var html = `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ex01_authentication</title>
        </head>
        
        <body>
            <label for="pass" class="label">Email Address</label>
            <input id="new_email" type="text"><br>
            <label for="pass" class="label">Password</label>
            <input id="new_pw_1" type="password" class="input" data-type="password"><br>
            <label for="pass" class="label">Repeat Password</label>
            <input id="new_pw_2" type="password" class="input" data-type="password"><br>
            <input type="button" onclick="newuser();" value="제출">
            <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
            <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->
        
            <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
            <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
        
            <!-- Add Firebase products that you want to use -->
            <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
            <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js"></script>
            <script>
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
        
                function newuser() {
                    email = document.getElementById('new_email').value
                    new_pw_1 = document.getElementById('new_pw_1').value
                    new_pw_2 = document.getElementById('new_pw_2').value
                    if (new_pw_1 != new_pw_2) {
                        alert("확인 비밀번호가 다릅니다.")
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(email, new_pw_2)
                            .then(() => {
                                alert('회원가입이 완료되었습니다.')
                            })
                            .catch(function (error) {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                alert(error.code)
                            });
                    }
                }
            </script>
        </body>
        
        </html>
     `
     res.send(html);
});

//express 를 이용하여 localhost:port 에 html 을 넘겨서 만들어줌
app.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});