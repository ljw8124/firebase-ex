
/**
Constructor
Do not call Function in Constructor.
*/
class pretice_firebaseApp()
{
	super();

	//TODO:edit here

}
extends AApplication;


function pretice_firebaseApp*onReady()
{
	super.onReady();
	
	// personal Key (firebase)
	const firebaseConfig = {
		//개인키삽입필요
	};

  	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	this.setMainContainer(new APage('main'));
	this.mainContainer.open('Source/MainView.lay');

};

function pretice_firebaseApp*unitTest(unitUrl)
{
	//TODO:edit here

	this.onReady();

	super.unitTest(unitUrl);
};
