
/**
Constructor
Do not call Function in Constructor.
*/
class MainView()
{
	super();

	//TODO:edit here

}
extends AView;


function MainView*init(context, evtListener)
{
	super.init(context, evtListener);
	
	this.auth = firebase.auth();
	this.firestore = firebase.firestore();

};

function MainView*onInitDone()
{
	super.onInitDone();

	// onAuthStateChanged()으로 상태점검 후 로그인한 사용자 있는지 점검
	// 없다면 로그인 유도
/*
 	this.auth.onAuthStateChanged(user => {
		if(user) {
			//로그인 후 처리 -> redirect?
		} else {
			//로그인 화면으로 이동
		}
	})
*/
	
};

function MainView*onActiveDone(isFirst)
{
	super.onActiveDone(isFirst);

	//TODO:edit here

};

function MainView*resetView()
{
	this.idTxf.setText('');
	this.pwTxf.setText('');
	this.pw2Txf.setText('');
	
};

function MainView*onSignInBtnClick(comp, info, e)
{
	var id = this.idTxf.getText();
	var pw = this.pwTxf.getText();
	var pw2 = this.pw2Txf.getText();
	
	if(!this.validate(id, pw, pw2)) return;
	
	//createUserWithEmailAndPassword() 은 패스워드 최소 6자 요구
	this.auth.createUserWithEmailAndPassword(id, pw2)
	.then(() => {
		console.log('회원가입 완료');
		alert('가입이 완료되었습니다.');
	})
	.catch(err => {
		var errCode = err.code;
		
		// catch 구문에는 if 문 사용이 안됨
		// 따라서 switch문을 사용하거나 따로 함수를 작성하는 것이 좋음
		console.log('error : ', errCode);
		
		alert(this.errExTxt(err));
	})
	.finally(() => {
		console.log("process end....");
		this.resetView();
	});
	
	// 비밀번호 찾기는 snedPasswordResetEmail()를 호출
	// 유효한 email 경우 정상 전송
	// -> 아이디만 따로 조회할 수는 없음
	
};

function MainView*errToText(error) {
	var errCode = error.code;
	var errMsg = error.message;
	
	switch(errCode) {
		case "auth/email-already-in-use": 
			errMsg = "동일한 이메일이 존재합니다.";
			break;
	}
	return errMsg;
};

function MainView*validate(id, pw, pw2)
{
	var empty, vacantValue = null;
	
	if(id.trim().length == 0) empty = 'id';
	else if(pw.trim().length == 0) empty = 'pw';
	else if(pw2.trim().length == 0) empty = 'pw2';
	
	switch(empty) {
		case 'id':
			vacantValue = '아이디';
			break;
		case 'pw':
			vacantValue = '패스워드';
			break;
		case 'pw2':
			vacantValue = '재확인 패스워드';
			break;
	}
	
	if(vacantValue) {
		alert(vacantValue + '를 입력해주세요.');
		return false;
	}
	if(pw.trim().length < 6) {
		alert('비밀번호를 6글자 이상 입력해주세요.');
		return false;
	}

	if(pw != pw2) {
		console.error('비밀번호 불일치 오류');
		alert('비밀번호가 일치하지 않습니다.');
		return false;
	}
	return true;
};

//firestore에 컨텐츠 등록
function MainView*onSendBtnClick(comp, info, e)
{
	var db = this.firestore;
	
	var collectionName = this.collectionTxf.getText();
	var docName = this.nameTxf.getText();
	var sendMsg = {
		key : this.valueTxf.getText()
	};
	
	console.error("SEND " + collectionName + " / " + docName + " / " + sendMsg);
	
	// set은 덮어쓰기의 개념, onSnapshot의 add()와 거의 같다
	// merge: true 옵션을 주면 병합을 함, 중복되는 경우는 저장되지 않음(새로운 정보만 저장)
 	db.collection(collectionName).doc(docName).set(
		sendMsg
		/*, {merge: true}*/);

};

function MainView*onGetBtnClick(comp, info, e)
{
	//firestore에서 모든 doc에 대한 data 가져오기
	var ref = this.firestore.collection(this.collectionTxf.getText()).get()
		.then((docArr) => {
			docArr.forEach((doc) => {
				var docId = doc.id;
				console.log(docId, " -> ", doc.data());
			});
		});
		
	// 특정 정보를 가져오려면 collection에 일정 doc('ID') 값으로 읽을 수 있다
	
	// collection에 where을 이용하여 조건에 따른 여러 문서를 불러올 수도 있다
	// where(key값, 비교단위, value값)
	
	// onSnapshot()을 이용하면 DB의 변화를 실시간으로 전달 가능 added, modified, removed

};

function MainView*onGetInfoBtnClick(comp, info, e)
{
	var user = this.auth.currentUser;
	var msg = {
		'name': user.displayName,
		'email': user.email,
		'photoURL': user.photoURL,
		'emailVerified': user.emailVerified,
		'uid': user.uid
	};
	console.log(msg);
	

};

//구글 로그인의 경우, firebase auth 에서 승인된 도메인을 추가해야함. ex(127.0.0.1)
function MainView*onGoogleBtnClick(comp, info, e)
{
	var auth = this.auth;	
	var provider = new firebase.auth.GoogleAuthProvider();
	
	auth.signInWithPopup(provider).then(result => {
			var gUser = result.user;
			console.log(gUser.email, " - ", gUser.uid);
		})
		.catch(error => {
			var errorCode = error.code;
			var errorMsg = error.message;
			var email = error.email;
			var credential = error.credential;
		});
		
	// 구글 로그인 한 경우 사용자 프로필을 가져올 때 currentUser로 가져온 후
	// providerData를 이용하여 가져옴
/*
	var user = this.auth.currentUser();
	
	if(user != null) {
		user.providerData.forEach(profile => {
			console.log('provider ', profile.providerId);
			console.log('uid ', profile.uid);
			console.log('name ', profile.displayName);
			console.log('email ', profile.email);
			console.log('photo URL ', profile.photoURL);
		});
	}
*/

	// 사용자 프로필 업데이트
	// 가입시에는 email password uid 만 등록됨
	// 후에 사용자이름, 프로필 사진은 업데이트 해야됨
/*
	user.updateProfile({
		displayName: "사용자 이름",
		photoURL: "https://example.com/사용자프로필.jpg"
	}).then(() => {
		console.log('update successful');
	}).catch(error => {
		console.log(error.code);
	})
*/
	
	//인증메일 보내기
	

};
