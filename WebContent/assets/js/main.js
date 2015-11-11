
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen
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





function showQuestion(){
	//alert("showQuestion aufgerufen");
	var playground = document.getElementById("loginFormular").innerHTML = "";
	
	var frage = document.createTextNode("Welcher Mechanismus kann unter Unix zur Kommunikation "
		+ "über das Netzwerk verwendet werden?");
	var antwort_1 =	document.createTextNode("Sockets");
	var antwort_2 =	document.createTextNode("Message Queues");
	var antwort_3 =	document.createTextNode("Pipes");
	var antwort_4 =	document.createTextNode("Semaphore");
	
	var showQuestionBox = document.getElementById("showQuestionBox");
	
	var ul = document.createElement("ul");
	var liFrage = document.createElement("li");
	var li_1 = document.createElement("li");
	var li_2 = document.createElement("li");
	var li_3 = document.createElement("li");
	var li_4 = document.createElement("li");
	
	liFrage.appendChild(frage);
	li_1.appendChild(antwort_1);
	li_2.appendChild(antwort_2);
	li_3.appendChild(antwort_3);
	li_4.appendChild(antwort_4);
	
	ul.appendChild(liFrage);
	ul.appendChild(li_1);
	ul.appendChild(li_2);
	ul.appendChild(li_3);
	ul.appendChild(li_4);
	showQuestionBox.appendChild(ul);
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






function putPlayerToTheTop(event){
	//alert("putPlayerToTheTop aufgerufen!");
	var tr = this.parentNode;
	var playerlist = document.getElementById("tablePlayerlistBody");
	playerlist.insertBefore(tr,playerlist.firstChild);
	
}



function addPlayerToTable(){
	
	var playerName = document.getElementById("inputPlayerName").value; //Spielername aus Textfeld wird übergeben
	var playerlist = document.getElementById("tablePlayerlistBody");
	var maxPlayer = 6;
	//alert(playerName);
	
	if(playerCount <= maxPlayer){
		if(playerName === ""){ //wenn kein Name eingegebn und login geklickt wurde
			alert("Bitte geben Sie einen Namen ein!");
		}
		else{
		//	alert("else");
			playerCount += 1;
			
			var tr = document.createElement("tr");
			
			var td1 = document.createElement("td");
			var td2 = document.createElement("td");
			
			var playernameText = document.createTextNode(playerName);
			
			td1.appendChild(playernameText);
			
			tr.appendChild(td1);
			tr.appendChild(td2);
			
			playerlist.appendChild(tr);
			
		}
		
		if(playerCount == 2){
			var startButton = document.getElementById("buttonStart");
			startButton.disabled = false; //Start Button aktivieren
			startButton.addEventListener("click", showQuestion, false);
		}
	}
	else{
		alert("Maximale Spieleranzahl erreicht!");
	}
	
	td1.addEventListener("click", putPlayerToTheTop, false);
	td1.parameter = playername;

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
	
	//alert(event.target.parameter);
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
	

