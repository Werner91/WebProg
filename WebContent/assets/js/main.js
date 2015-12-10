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





function clickedLogin(event){
	
	
}



function clickedStart(event){
	
}




function processSuccessfullLogin(){
	
	
}



function clearLoginDiv(){
	
	
}

function showGameDiv(){
	
	
	
	
}


function showQuestion(){
	
	
	
}
















