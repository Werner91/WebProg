//Websocket
var socket;
var readyToSend = false;

//AJAX
var request;

//Game 
var gameRunning = false;

//Player
playerId = -1;
var playerCount = 0;

//Playerliste
var curPlayerList;

//akitver / ausgewählter Katalog
var activeCatalog = "";

//Question
var curQuestion = "";
var curAnswer1 = "";
var curAnswer2 = "";
var curAnswer3 = "";
var curAnswer4 = "";
var curTimeOut = 0;
var isQuestionActive = false;

//Antwortauswahl
var curSelection = -1;


/*
 * Funktion wird nachdem die Seite geladen wurde aufgerufen
 * Initiiert Websocketverbindung, Listener werden registriert
 * 
 */
function init(){
	
	//Websocket öffnen
	var url = "ws://localhost:8080/Quiz/SocketHandler";
	socket = new WebSocket(url);
	
	//event handler Websocket
	socket.onopen = function(){
		readyToSend = true;
	}
	
	socket.onerror = function(event){
		alert("Websocket Fehler: " + event.data);
	}
	
	socket.onclose = function(event){
		console.log("Websocket geschlossen: " + event.data);
	}
	
	socket.onmessage = receivedWSMessage;
	
	
	//listener login und start button
	var buttonLogin = document.getElementById("buttonLogin");
	buttonLogin.addEventListener("click", clickedLogin, true);
	
	var buttonStart = document.getElementById("buttonStart");
	buttonStart.addEventListener("click", clickedStart, true);
	
	//request catalogs
	requestCatalogs(); //function in catalog.js
	
}




/*
 * 
 * Funktion empfängt über Websocket Nachrichten im JSON-Format
 * 
 */
function receivedWSMessage(message){  //messages die vom server an den client geschickt werden, werden hier ausgewertet
	
	//parse JSON-Nachricht
	var parsedJSONMessage = JSON.parse(message.data);
	
	console.log("Received message type: " + parsedJSONMessage.messageType);
	
	
	switch(parsedJSONMessage.messageType){
	
		case 2: //Login Response ok
				console.log("Player ID: " + parsedJSONMessage.playerID);
				playerId = parsedJSONMessage.playerID;
				processSuccessfullLogin();
				break;
			
		
		case 5: //catalog change
				console.log("Catalog changed: " + parsedJSONMessage.catalogName);
				activeCatalog = parsedJSONMessage.catalogName;
				highlightChoosenCatalog(activeCatalog);
				break;
			
			
		case 6: //Playerlist
				console.log("PlayerList" );
				var playerlist = parsedJSONMessage;
				curPlayerList = playerlist;
				updatePlayerList(playerlist);
				break;
			
				
		case 7: //Start Game
				console.log("Startgame");
				gameRunning = true;
				
				//clear login stuff
				clearLoginDiv();
				showGameDiv();
				
				//request first question
				sendWSMessage(8); //typ 8: question request
				break;
				
			
		case 9: //Question
				console.log("Question: " + parsedJSONMessage.question);
				curQuestion = parsedJSONMessage.question;
				curAnswer1 = parsedJSONMessage.answer1;
				curAnswer2 = parsedJSONMessage.answer2;
				curAnswer3 = parsedJSONMessage.answer3;
				curAnswer4 = parsedJSONMessage.answer4;
				curTimeOut = parsedJSONMessage.timeOut;
				showQuestion();
				isQuestionActive = true;
				break;
			
			
			
		case 11: //Question Result
				console.log("Correct: " + parsedJSONMessage.correct);
			
				//markiere Spielerauswahl rot
				if(curSelection != -1){
					document.getElementById(curSelection).style.borderColor = "red";
					document.getElementById(curSelection).style.backgroundColor = "#FF0800";	
				}
				
				//markiere korrekte Antworten grün
				document.getElementById(parsedJSONMessage.correct).style.borderColor = "green";
				document.getElementById(parsedJSONMessage.correct).style.backgroundColor = "#8Db600";
				
				
				//false, d.h. es können keine Antworten mehr geklickt werden
				isQuestionActive = false;
				
				window.setTimeout(function(){
					//frage nach zwei Sekunden neue Frage an
					sendWSMessage(8);
				}, 2000) //kein ; ??????????
				
				break;
		
		
		case 12: //Game Over
				console.log("GameOver - Spiel ist zu ende");
				GameOver(parsedJSONMessage);
				break;
		
		
		case 255: //Error
				console.log("Error: " + parsedJSONMessage.errorMessage);	
				if(parsedJSONMessage.fatal == 1){ // Spiel beenden
					var confirmDialog = confirm("Es ist ein fataler Fehler aufgetreten: " + parsedJSONMessage.errorMessage + " Das Spiel wird beendet!\n\nNeues Spiel starten?");
					if(confirmDialog){
						// reload page
						location.reload();
					} else {
						// clean up main div
						document.getElementById("playground").innerHTML = "<h1>Das Spiel wurde beendet!</h1><p><br><br><br><h3>Laden Sie die Seite neu um ein neues Spiel zu starten";					
					}
				} else { // Fehler ist nicht fatal, Spiel wird nicht beendet
					alert("Es ist ein Fehler aufgetreten: " + parsedJSONMessage.errorMessage);
					console.log("Warning: " + parsedJSONMessage.errorMessage);
				}
				break;
		
		
		default:
			console.log("Unbekannter Nachrichten-Typ empfangen");
			break;
	}
	
	
}



/*
 * 
 * Funktion sendet über Websocket Nachrichten im JSON-Format
 * 
 */
function sendWSMessage(type){
	
	//prüfen ob Websocket bereit zum senden ist
	if(readyToSend){
		
		var messageType = type.toString();
		var jsonData;
		var selection = curSelection;
	
	
		switch(type){
		
			case 1: //Login Request
					//Name aus Eingabefeld auslesen
					var inputName = document.getElementById("inputPlayerName"); //id ggf nochmal prüfen
					var playerName = inputName.value;
					
					//Login Request mit Typ und Spielername
					console.log("send message type 1");
					jsonData = JSON.stringify({
						messageType : messageType,
						loginName : playerName
					});
					break;
				
					
			case 5: //catalog change
					var catalogName = activeCatalog;
					
					// CatalogChange with type + catalogname
					console.log("send MessageType 5");
					jsonData = JSON.stringify({
						messageType : messageType,
						catalogName : catalogName
					});
					break;
					
					
			case 7: //Start Game
					var catalogName = activeCatalog;
				
					 // StartGame with type + catalogname
					console.log("send MessageType 7");
					jsonData = JSON.stringify({
						messageType : messageType,
						catalogName : catalogName
					});
					break;
				
			case 8: //Question Request
					// QuestionRequest with type
					console.log("send MessageType 8");
					jsonData = JSON.stringify({
						messageType : messageType
					});				
					break;
			
			case 10://Question Answered
					// QuestionAnswered with type + selected answer		
					console.log("send MessageType 10");				
					jsonData = JSON.stringify({
						messageType : messageType,
						selection : selection
					});				
					break;	
			
					
			default:
				console.log("Unbekannter Nachrichten-Typ kann nicht gesendet werden");
				break;
		}
		
		//sende Nachricht zum Server
		socket.send(jsonData);
	
	}
	else{ //Websocket ist nicht bereit zum senden
		
		alert("Verbindung zum Server wurde noch nicht aufgebaut!");
		
	}
	
	
}





/*
 * Funnktion reagiert auf den Klick auf den
 * Login Button. Eingabe des Spielers wird
 * ausgwertet und an den Server gesendet
 */
function clickedLogin(event){
	
	var inputName = document.getElementById("inputPlayerName");
	var playerName = inputName.value;
	
	//verify user name
	if(playerName == ""){
		alert("Es wurde kein Name eingegeben!");
	}
	else{
		//send Login Request
		sendWSMessage(1);
	}
	event.stopPropagation(); //stops event bubbling, other handlers won't be executed
}




/*
 * Listener für den Klick auf den Start-Button
 * Main-div wird aktualisert und eine Spiel-Starten-
 * Nachricht wird an den Server gesendet
 */
function clickedStart(event){
	//clean up main div
	clearLoginDiv();
	
	//send GameSart
	sendWSMessage(7);
	event.stopPropagation();
}




function processSuccessfullLogin(){
	
	//remove login button + name input field
	var playground = document.getElementById("playground");
	playground.removeChild(document.getElementById("loginFormular"));
	
	//change text of start nutton
	var startButton = document.getElementById("startButton");
	
	if(playerId == 0){
		//Spielleiter
		startButton.textContent = "Warte auf weitere Spieler ...";
	}
	else{
		//normaler Spieler
		startButton.textContent = "Warte auf Spielstart ...";
	}
	
	
}




/*
 * Funktion entfernt den Inhalt aus dem main-div
 * (z.B. Login-Feld, Login-Button)
 */
function clearLoginDiv(){
	
	//clean up playground
	document.getElementById("playground").innerHTML = "";
	
}






/*
 * Funktion aktualisiert den main-div und legt darin Inhalte für 
 * Fragen, Antworten und Timeout an
 */
function showGameDiv(){
	
	var playground = document.getElementById("playground");
	
	//create div-container for headline (questioncatalog), question, answer, timer
	var questDiv = document.createElement("div");
	questDiv.id = "questDiv";
	
	//headline questioncatalog
	var title = document.createElement("h3");
	title.id = "GameDivTitle";
	title.textContent = "Fragenkatalog: " + activeCatalog;
	
	//div-container for question
	var question = document.createElement("div");
	question.id = "QuestionText";
	question.style.fontSize = "16px";
	
	questDiv.appendChild(title);
	questDiv.appendChild(question);
	
	var answers = [];
	
	for(var i = 0; i < 4; i++){
		answers[i] = focumnet.createElement("div");
		answers[i].className = "answerDiv";
		answers[i].id = i;
		
		answers[i].addEventListener("click", function(event){
			if(isQuestionActive){
				//lese Antwort Auswahl aus
				curSelection = event.target.id;
				console.log("clicked answer: " + event.target.id);
				
				//sende QuestionAnswered
				sendWSMessage(10);
			}
		}, false);
		
		//füge dem div eine Frage hinzu ("zeige Frage an")
		questDiv.appendChild(answers[i]);
	}
	
	//timeout
	var timeOut = document.createElement("p");
	timeOut.id = "timeOut";
	
	//füge Timer aus dem dic hinzu
	questDiv.appendChild(timeOut);
	
	//füge Überschrift (Fragenkatalog), Frage, Antworten, Timer dem playground-dvi hinzu
	playground.appendChild(questDiv);

}



/*
 * Funktion zeigt aktuelle Frage, Antworten und Timeout an
 */
function showQuestion(){
	console.log("frage anzeigen");
	
	document.getElementById("QuestionText").textContent = curQuestion;
	
	var answerText = [curAnswer1, curAnswer2, curAnswer3, curAnswer4];
	
	var answers = document.getElementsByClassName("answerDiv");
	
	for (var i = 0; i < 4; i++) {
		answers[i].style.borderColor = "black";
		answers[i].style.backgroundColor = "white";
		answers[i].textContent = answerText[i];
	}
	document.getElementById("timeOut").textContent = "Time Out: " + curTimeOut	+ " Sekunden";
	
}




/*
 * Funktion zeigt Spielende und die Position
 * des Spielers an
 */
function GameOver(parsedJSONMessage){
	
	var questDiv = document.getElementById("questDiv");
	while(questDiv.firstChild){
		questDiv.removeChild(questDiv.firstChild);
	}
	
	var title = document.createElement("h3");
	title.textContent = "Game Over!";
	questDiv.appendChild(title);
	
	rank = parsedJSONMessage.rank;
	
	var confirmDialog = false;
	
	if(rank == 1){
		// Spiel gewonnen
		//alert("Glückwünsch. Sie haben das Spiel gewonnen!");
		confirmDialog = confirm("Glückwünsch. Sie haben das Spiel gewonnen!\n\nNeues Spiel starten?");
	} else {
		// Spiel nicht gewonnen
		// alert("Glückwünsch. Sie wurden " + rank + ".!");
		confirmDialog = confirm("Glückwünsch. Sie wurden " + rank + "!\n\nNeues Spiel starten?");
	}
	
	console.log("Game over. Reload page: " + confirmDialog);
	
	// hat der Spieler mit Ja oder Nein auf den Dialog geantwortet?
	if(confirmDialog){ // ja
		// reload page
		location.reload();
	} else { // nein
		// clean up main div
		if(rank == 1){
			document.getElementById("main").innerHTML = "<h1>Glückwünsch. Sie haben das Spiel gewonnen!</h1><p><br><br><br><h3>Laden Sie die Seite neu um ein neues Spiel zu starten";			
		} else {
			document.getElementById("main").innerHTML = "<h1>Glückwünsch. Sie wurden " + rank + "!</h1><p><br><br><br><h3>Laden Sie die Seite neu um ein neues Spiel zu starten";			
		}					
	}

}












