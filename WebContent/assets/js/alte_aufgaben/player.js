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
	
}