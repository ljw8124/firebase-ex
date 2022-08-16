
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

	//TODO:edit here

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
		var errMsg = err.message;
		console.log('error : ', errCode);
		alert(errMsg);
	})
	.finally(() => {
		console.log("process end....");
		this.resetView();
	});
	
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
	var collectionName = this.collectionTxf.getText();
	var docName = this.nameTxf.getText();
	var sendMsg = {
		key : this.valueTxf.getText()
	};
	
	console.error("SEND " + collectionName + " / " + docName + " / " + sendMsg);
	
	//set은 덮어쓰기의 개념
	//merge 옵션을 주면 병합을 함
 	this.firestore.collection(collectionName).doc(docName).set(
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
	
	

};

function MainView*onGetInfoBtnClick(comp, info, e)
{
	var auth = this.auth;
	/*var listAllUsers = (nextPageToken) => {
		this.auth
			.listUsers(1000, nextPageToken)
			.then((listUsersResult) => {
				listUsersResult.users.forEach((userRecord) => {
					console.log('user ', userRecord);
				});
			});
	};*/

	var user = this.auth.currentUser;	//최근로그인 또는 접근한 사용자
	/*var msg = {
		'name': user.displayName,
		'email': user.email,
		'photoURL': user.photoURL,
		'emailVerified': user.emailVerified,
		'uid': user.uid
	};*/
	console.log(auth.listUsers);
	

};
