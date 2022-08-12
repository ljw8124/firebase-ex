
/**
Constructor
Do not call Function in Constructor.
*/
function pretice_firebaseApp()
{
	AApplication.call(this);

	//TODO:edit here

}
afc.extendsClass(pretice_firebaseApp, AApplication);


pretice_firebaseApp.prototype.onReady = function()
{
	AApplication.prototype.onReady.call(this);
	
	// personal Key (firebase)
	const firebaseConfig = {
		//개인키 삽입 필요
	};

  	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	this.setMainContainer(new APage('main'));
	this.mainContainer.open('Source/MainView.lay');

	//TODO:edit here

};

pretice_firebaseApp.prototype.unitTest = function(unitUrl)
{
	//TODO:edit here

	this.onReady();

	AApplication.prototype.unitTest.call(this, unitUrl);
};

var theApp = null;

AApplication.start = function()
{
    afc.scriptReady(function()
    {
        if(window._version) _version.setFileVersion();
	    theApp = new pretice_firebaseApp();
	    theApp.isLoadTheme = false;
        if(PROJECT_OPTION.unitUrl) theApp.unitTest(PROJECT_OPTION.unitUrl);
        else theApp.onReady();
    });
};

if(!AApplication.manualStart)
{
    $(document).ready(function()
    {
        AApplication.start();
    });
}
else if(AApplication.manualStart == 2)
{
    AApplication.start();
}

