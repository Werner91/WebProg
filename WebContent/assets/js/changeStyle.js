
document.addEventListener("DOMContentLoaded", init, false); //Event wird geworfen, wenn DOM-Baum geladen

function init(){
	//alert("init aufgerufen");
	
	var buttonStyleStandard = document.getElementById("buttonStyleStandard");
	var buttonStyleChristmas = document.getElementById("buttonStyleChristmas");
	var buttonStyleHalloween = document.getElementById("buttonStyleHalloween");
	
	buttonStyleStandard.addEventListener("click", changeStyleStandard, false);
	buttonStyleChristmas.addEventListener("click", changeStyleChristmas, false);
	buttonStyleHalloween.addEventListener("click", changeStyleHalloween, false); /*false: Listener reagiert erst beim Bubbling/ true: Listener reagiert beim absteigen im Baum*/
	
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
	

