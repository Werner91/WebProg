

/*
 * funktion aktualisiert die spielerliste
 * abhängig von der spieleranzahl wird der
 * start-button angepasst
 */
function updatePlayerList(playerlist){
	
	//get playerlist table
	var table = document.getElementById("tablePlayerlistBody").getElementsByTagName("tbody")[0];
	
	//remove all entries of table
	while(table.firstChild){
		table.removeChild(table.firstChild);
	}
	
	playerCount = 0;
	
	
	// JSON String
	// message data Playerlist: {"messageType":6,"players":[{"score":"0","player":"dsgffd"},{"score":"0","player":"qwe"}]}
	
	var playerListArray = playerlist.players;
	var length = playerListArray.length;
	
	//build table entries
	for(var i = 0; i < length; i++){
		var row = table.insertRow();
		
		var cellRank = row.insertCell();
		cellRank.textContent = i + 1;
		
		var cellPlayer = row.insertCEll();
		cellPlayer.textContent = playerListArray[i].playername;
		
		var cellScore = row.insertCell();
		cellScore.textContent = playerListArray[i].score;
		
		playerCount++;
	}
	
	
	if((playerId == 0 ) && (gameRunning == false)){
		
		//aktiviere Startbutton, wenn genug Spieler + Katalog ausgewählt
		if((playerCount >= 2) && (activeCatalog == "")){
			var startButton = document.getElementById("startButton");
			startButton.textContent = "Wähle Katalog um Spiel zu starten";
		}
		else if((playerCount >= 2) && (activeCatalog != "")){
			var startButton = document.getElementById("startButton");
			startButton.textContent = "Spiel starten";
			startButton.disabled = false;
		}
		else if((playerCount < 2) && (activeCatalog != "")){
			var startButton = document.getElementById("startButton");
			startButton.textContent = "Warte auf weitere Spieler...";
			startButton.disabled = true;
		}
		
	}
}