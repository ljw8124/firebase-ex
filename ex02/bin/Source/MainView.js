
/**
Constructor
Do not call Function in Constructor.
*/
function MainView()
{
	AView.call(this);

	//TODO:edit here

}
afc.extendsClass(MainView, AView);


MainView.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);
	
	this.auth = firebase.auth();
	this.firestore = firebase.firestore();

};

MainView.prototype.onInitDone = function()
{
	AView.prototype.onInitDone.call(this);

	//TODO:edit here

};

MainView.prototype.onActiveDone = function(isFirst)
{
	AView.prototype.onActiveDone.call(this, isFirst);

	//TODO:edit here

};

MainView.prototype.resetView = function()
{
	this.idTxf.setText('');
	this.pwTxf.setText('');
	this.pw2Txf.setText('');
	
};

MainView.prototype.onSignInBtnClick = function(comp, info, e)
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

MainView.prototype.validate = function(id, pw, pw2)
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
MainView.prototype.onSendBtnClick = function(comp, info, e)
{
	var collectionName = this.collectionTxf.getText();
	var docName = this.nameTxf.getText();
	var sendMsg = {
		key : this.valueTxf.getText()
	};
	
	console.error("SEND " + collectionName + " / " + docName + " / " + sendMsg);
	
	this.firestore.collection(collectionName).doc(docName).set(sendMsg);

};
