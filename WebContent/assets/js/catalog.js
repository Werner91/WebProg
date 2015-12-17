

/*
 *  funktion fragt via ajax verfügbare kataloge vom server ab
 */
function requestCatalogs(){
	
	//prüfe ob browser ajax unterstützt
	if(window.XMLHttpRequest){ // code for IE7+, Firefox, Chrome, Opera, Safari
		
		//ajax request-objekt erzeugen
		request = new XMLHttpRequest(); //request in main.js angelegt
		
		//kommunikation mit server initialisieren
		request.open("GET",	"AjayCatalogServlet", true);
		
		//eventhandler registrieren, um auf asynchrone antwort vom server reagieren zu können
		request.onreadystatechange = ajaxServerCatalogResponse;
		
		//anfrage senden
		request.send(null);
	}
	else{ // code for IE6, IE5, non AJAX compatible browsers
		alert("Kann Katalog nicht auswählen - Browser unterstützt kein AJAX. Für das Spiel ist IE7+, Firefox, Chrome, Opera, Safari oder ein anderer AJAX-fähriger Browser notwendig!");
	}
}


/*
 * funktion empfängt über ajax verfügbare kataloge
 */
function ajaxServerCatalogResponse(){
	
	// States (0 - uninitialized, 1 - open, 2 - sent, 3 - receiving) werden nicht verarbeitet
	
	//State 4 - die antwort des servers liegt vollständig vor
	if(request.readyState == 4){
		console.log("received catalogs, catalog.js");
		
		var answer = request.responseXML.getElementsByTagName("catalogsEntry"); 
		
		for(var i = 0; i < answer.length; i++){
			
			//erzeuge div mit text, css-klasse hinzuweisen
			var catalogDiv = document.createElement("div");
			catalogDiv.className = "catalogList";
			catalogDiv.textContent = answer[i].firstChild.nodeValue;
			
			//füge div zum dom-baum hinzu + registriere eventlistener
			document.getElementById("catalogsEntry").appendChild(catalogDiv);
			catalogDiv.addEventListener("click", clickedCatalog, false);
		}
	}
}


/*
 * Funktion reagiert auf den Klick auf einen Fragen Katalog
 * geklickter Fragenkatalog wird farblich hervorgehoben und mit
 * einer Nachricht via Websocket beim Server als aktiver Katalog hinterlegt
 */
function clickedCatalog(event){
	if((playerId == 0) && (gameRunning == false)){
		
		//hebe ausgewählten katalog hervor
		activeCatalog = event.target.textContent;
		highlightChoosenCatalog(activeCatalog);
		
		//send catalog change
		sendWSMessage(5);
		
		//passe start button an falls genügend Spieler angemeldet sind (Text ändern, Start button aktivieren)
		if(playerCount >= 2){
			var buttonStart = document.getElementById("startButton");
			buttonStart.textContent = "Spiel starten";
			buttonStart.disabled = false;
		}
	}
	event.stopPropagation();
}






function highlightChoosenCatalog(catalogName){
	
	// get all catalogs and set background to default
    var catalogArray = window.document.getElementsByClassName("catalogList");
    for(var i = 0; i < catalogArray.length; i++) {
    	if(catalogArray[i].textContent == catalogName){
    		// hebe den aktiven Katalog vor
    		console.log("bla");
    		catalogArray[i].style.backgroundColor="#ffa500";
    	} else {
    		// setze Farbe bei allen anderen Katalogen zurück
    		catalogArray[i].style.backgroundColor="#f3f3f3";
    	}
    }
}