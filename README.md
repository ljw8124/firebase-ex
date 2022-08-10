# firebase-ex
Firebase 연습용

Firebase는 벡엔드 서비스로 prototype을 만들어 테스트를 미리 할 수 있다.
또한 인증서비스를 지원하고 NoSQL 기반 3세대 DB이다.
원격구성을 지원하며 콘솔과 통계(Analytics)를 제공한다.

https://firebase.google.com/docs/cli?hl=ko#install-cli-windows 참고

node.js 설치 필수

Firebase 실행 전 최신화 시켜야 함.
$ npm install -g firebase-tools

로그인
$ firebase login

프로젝트 확인
$ firebase projects:list

프로젝트 초기화
$ firebase init

프로젝트 배포
$ firebase deploy

프로젝트 로컬 웹서버 활성화
$ firebase serve
