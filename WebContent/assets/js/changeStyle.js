
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen

function init(){
	//alert("init aufgerufen");
	
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
	
	
	switch(event.target.parameter){ //holt parameter
		
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
	

