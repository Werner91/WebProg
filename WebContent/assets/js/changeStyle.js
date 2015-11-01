
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen
var playerCount = 0;
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
	
	var startButton = document.getElementById("buttonStart").disabled = true; //Start Button deaktivieren
	//startButton.style = "background-color: black";
	
}


function lauftext(){
	document.getElementById("headlineticker").value = "" +
	headline.substring(begin,end) + " " + headline.substring(0,begin);
	begin ++;
	if(begin >= end)
	{ 
	 begin = 0; 
	}
	/* Laufgeschwindigkeit: Höhere Zahl = langsamer */
	window.setTimeout("lauftext()", 300); 
}



function changeBackgroundColorOnClick(event){
	//alert("changeBackgroundColorOnClick");
	//alert(document.getElementById("catalogOne").style.backgroundColor);
	
	var catalogOne = document.getElementById("catalogOne");
	var currentColorOne = document.getElementById("catalogOne").style.backgroundColor; 
	
	var catalogSimple = document.getElementById("catalogSimple");
	var currentColorSimple = document.getElementById("catalogSimple").style.backgroundColor; 
	
	var catalogSysProg = document.getElementById("catalogSysProg");
	var currentColorSysProg = document.getElementById("catalogSysProg").style.backgroundColor;
	
	
	switch(event.target.parameter){ 
		
	case "one":	
			if(currentColorOne == ""){
				catalogOne.style.backgroundColor = "orangered";
			}
			else{
				catalogOne.style.backgroundColor = "";
			}
				
			if(currentColorSimple == "orangered"){
				catalogSimple.style.backgroundColor = "";
			}
				
			if(currentColorSysProg == "orangered"){
				catalogSysProg.style.backgroundColor = "";
			}
				
			break;
			
	case "simple":	
			if(currentColorSimple == ""){
				catalogSimple.style.backgroundColor = "orangered";
			}
			else{
				catalogSimple.style.backgroundColor = "";
			}
				
			if(currentColorOne == "orangered"){
				catalogOne.style.backgroundColor = "";
			}
				
			if(currentColorSysProg == "orangered"){
				catalogSysProg.style.backgroundColor = "";
			}
				
			break;
				
	case "sysprog":
			if(currentColorSysProg == ""){
				catalogSysProg.style.backgroundColor = "orangered";
			}
			else{
				catalogSysProg.style.backgroundColor = "";
			}
				
			if(currentColorOne == "orangered"){
				catalogOne.style.backgroundColor = "";
			}
				
			if(currentColorSimple == "orangered"){
				catalogSimple.style.backgroundColor = "";
			}
				
			break;
				
	default: alert("Parameter ungültig: " + event.target.parameter);
		
	}
}





function addPlayerToTable(){
	
	var playerName = document.getElementById("inputPlayerName").value; //Spielername aus Textfeld wird übergeben
	var table = document.getElementById("tablePlayerlistBody");
	var maxPlayer = 6;
	//alert(document.getElementById("inputPlayerName"));
	
	
	if(playerCount <= maxPlayer){
		if(playerName === ""){ //wenn kein Name eingegebn und login geklickt wurde
			alert("Bitte geben Sie einen Namen ein!");
		}
		else{
			playerCount += 1;
			alert(playerCount);
			
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");
			var playerNameText = document.createTextNode(playerName);
			
			
			td2.appendChild(playerNameText);
			tr.appendChild(td1);
			tr.appendChild(td2);
			table.appendChild(tr);
		}
		
		if(playerCount == 2){
			var startButton = document.getElementById("buttonStart").disabled = false; //Start Button deaktivieren
		}
	}
	else{
		alert("Maximale Spieleranzahl erreicht!");
	}
}



function changeStyleHalloween(event){
	//alert(event.type);
	document.getElementsByTagName('body')[0].style.backgroundImage ='url(images/Halloween.jpg)';
}

function changeStyleChristmas(){
	//alert("christmas");
	document.getElementsByTagName('body')[0].style.backgroundImage ='url(images/Christmas.jpg)';
}

function changeStyleStandard(){
	//alert("standard");
	document.getElementsByTagName('body')[0].style.backgroundImage ='url(images/background_wood.jpg)';
}
	

