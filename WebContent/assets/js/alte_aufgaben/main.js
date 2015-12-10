
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen, dann init methode ausgeführt
var playerCount = 1;
var headline = "WebQuiz";
var begin = 0;
var end = headline.length;


function init(){
	
	//alert("init aufgerufen");
	
	lauftext(); //lauftext starten
	
	//referenz buttons holen
	var buttonStyleStandard = document.getElementById("buttonStyleStandard");
	var buttonStyleChristmas = document.getElementById("buttonStyleChristmas");
	var buttonStyleHalloween = document.getElementById("buttonStyleHalloween");
	var buttonLogin = document.getElementById("buttonLogin");
	
	//den buttons listener hinzufügen
	buttonStyleStandard.addEventListener("click", changeStyleStandard, false);
	buttonStyleChristmas.addEventListener("click", changeStyleChristmas, false);
	buttonStyleHalloween.addEventListener("click", changeStyleHalloween, false); /*false: Listener reagiert erst beim Bubbling/ true: Listener reagiert beim absteigen im Baum*/
	buttonLogin.addEventListener("click", addPlayerToTable, false);
	
	
	//referenz der kataloge holen
	var catalogOne = document.getElementById("catalogOne");
	var catalogSimple = document.getElementById("catalogSimple");
	var catalogSysProg = document.getElementById("catalogSysProg");
	
	//den katalogeinträgen listener hinzufügen
	catalogOne.addEventListener("click", changeBackgroundColorOnClick, false);
	catalogSimple.addEventListener("click", changeBackgroundColorOnClick, false);
	catalogSysProg.addEventListener("click", changeBackgroundColorOnClick, false);
	
	
	var startButton = document.getElementById("buttonStart"); //Start Button deaktivieren
	startButton.disabled = true; //Start Button deaktivieren
	
}


















	

