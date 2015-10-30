
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen

function init(){
	//alert("init aufgerufen");
	
	var buttonStyleStandard = document.getElementById("buttonStyleStandard").addEventListener("click", changeStyleStandard, false);
	var buttonStyleChristmas = document.getElementById("buttonStyleChristmas");
	var buttonStyleHalloween = document.getElementById("buttonStyleHalloween");
	
	var buttonLogin = document.getElementById("buttonLogin");
	
	//buttonStyleStandard.addEventListener("click", changeStyleStandard, false);
	buttonStyleChristmas.addEventListener("click", changeStyleChristmas, false);
	buttonStyleHalloween.addEventListener("click", changeStyleHalloween, false); /*false: Listener reagiert erst beim Bubbling/ true: Listener reagiert beim absteigen im Baum*/
	buttonLogin.addEventListener("click", addPlayerToTable, false);
	
}

function addPlayerToTable(){
	var playerName = document.getElementById("inputPlayerName").value; //Spielername aus Textfeld wird übergeben
	var table = document.getElementById("tablePlayerlistBody");
	//alert(document.getElementById("inputPlayerName"));
	
	if(playerName === ""){
		alert("Bitte geben Sie einen Namen ein!");
	}
	else{
		
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var playerNameText = document.createTextNode(playerName);
		
		
		td2.appendChild(playerNameText);
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
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
	

