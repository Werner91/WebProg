
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen, dann init methode ausgeführt
var playerCount = 1;
var headline = "WebQuiz";
var begin = 0;
var end = headline.length;


function init(){
	//alert("init aufgerufen");
	lauftext();
	var buttonStyleStandard = document.getElementById("buttonStyleStandard").addEventListener("click", changeStyleStandard, false);
	var buttonStyleChristmas = document.getElementById("buttonStyleChristmas");
	var buttonStyleHalloween = document.getElementById("buttonStyleHalloween");
	var buttonLogin = document.getElementById("buttonLogin");
	var catalogOne = document.getElementById("catalogOne");
	var catalogSimple = document.getElementById("catalogSimple");
	var catalogSysProg = document.getElementById("catalogSysProg");
	
	//buttonStyleStandard.addEventListener("click", changeStyleStandard, false);
	buttonStyleChristmas.addEventListener("click", changeStyleChristmas, false);
	buttonStyleHalloween.addEventListener("click", changeStyleHalloween, false); /*false: Listener reagiert erst beim Bubbling/ true: Listener reagiert beim absteigen im Baum*/
	buttonLogin.addEventListener("click", addPlayerToTable, false);
	catalogOne.addEventListener("click", changeBackgroundColorOnClick, false);
	catalogOne.parameter = "one"; //catalogOne einen Parameter hinzufügen
	catalogSimple.addEventListener("click", changeBackgroundColorOnClick, false);
	catalogSimple.parameter = "simple";
	catalogSysProg.addEventListener("click", changeBackgroundColorOnClick, false);
	catalogSysProg.parameter = "sysprog";
	
	var startButton = document.getElementById("buttonStart"); //Start Button deaktivieren
	startButton.disabled = true; //Start Button deaktivieren
	
}


















	

