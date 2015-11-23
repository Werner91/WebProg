<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>QUIZ</title>
		
		<!-- Bootstrap -->
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    	
 		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		
		<!-- CSS Datei -->
		<link href="assets/css/index.css" rel="stylesheet">
		
    	<!--JavaScript-->
		<script type="text/javascript" src="assets/js/main.js"></script>
		<script type="text/javascript" src="assets/js/lauftext.js"></script>
		<script type="text/javascript" src="assets/js/changeStyle.js"></script>
		<script type="text/javascript" src="assets/js/showQuestion.js"></script>
		<script type="text/javascript" src="assets/js/player.js"></script>
		
		<!-- JSP import -->
		<%@ page import="de.fhwgt.quiz.application.Quiz" %>
		<%@ page import="de.fhwgt.quiz.application.Player" %>
		
	</head>
	
	
	<body>
	
		<%  //erzeuge Spielelogik
			Quiz quiz = Quiz.getInstance();
		%>
	
	
	
		<header class="page_header">
			<div>
				<h1>
					<span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
					
					<form>
						 <input class="laufschriftHeadline" type="text" size="50" name="headlineticker" id="headlineticker">
					</form>
					
				</h1>
			</div>
		</header>
		
		

		<div class="content">
		
		
			<div class="playground" style="float:left">
				<div id="loginFormular">
					
					<!-- Formular mit JSP -->
				  	<form action="<%= response.encodeURL("GetLoginData")%>">
				
						<label>
							Name:
							<input id="inputPlayerName" class="textbox" type="text" name="inputPlayerName" size="30" maxlength="30">
						</label>
						<br>
						<input id="buttonLogin" name="buttonLogin" class="loginbutton" type="submit" value="Login" />
						<input id="buttonStart" name="buttonStart" class="loginbutton" type="submit" value="start" />
						
					 </form>
					 
				</div>	
				
				
				<div id="showQuestionBox"></div>
				
				
				
			</div>	<!-- Ende Playground -->
			
			
			<div class="catalogs" style="float:right">
				<h4>
					<span class="glyphicon glyphicon-book" aria-hidden="true"></span>
	                <span>Catalogs</span>
                </h4>
                
                <hr/>
                
                
                <%
                	String[] catalogList = Quiz.getInstance().getCatalogList().keySet().toArray(new String[0]);
                
					//verfügbare Kataloge anzeigen
					for(int i = 0; i < catalogList.length; i++){
					%>
					
					<div class="catalogList">
						<%= catalogList[i] %>
					</div>
						
						
						
						
					<%	
					}
              		%>
                
                
                
                
                
                
                
                
                
                
                
                
                
                <!--<table	 id="catalogsTable">
          			<tr><td id="catalogOne">One</td></tr>
               		<tr><td id="catalogSimple">Simple</td></tr>
               		<tr><td id="catalogSysProg">SysProg</td></tr>
				</table>
				-->
            </div>	<!-- Ende Catalogs -->
            
			
			<br>
			<div class="highscore" style="float:right">
				<h4>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                <span>Highscore</span>
                </h4>
                <hr/>
                
                <table id="highscoreTable" class="table table-hover">
	          		<thead>
	               		<tr>
	                    	<td>Player</td>
	        				<td>Score</td>
	         			</tr>
					</thead>
					
					<tbody id="tablePlayerlistBody">
						<% Player[] playerList = Quiz.getInstance().getPlayerList().toArray(new Player[0]);
						
						//playerList Table erstellen
						if(playerList.length == 0){
							%>
								
								<tr>
									<td>Keine Spieler</td>
									<td></td>
									<td></td>
								</tr>	
		
							<%
							}
						else{ //wenn Spieler vorhanden
							
							for(int i = 0; i < playerList.length; i++){
								%>
								
									<tr>
										<td><%= playerList[i].getName() %></td>
										<td><%= playerList[i].getScore() %></td>
									</tr>	
								
								<%	
							}
						}
						%>
						
					</tbody>
               </table>
               
			</div>	<!-- Ende Highscore -->
			
			
		</div>	<!-- Ende Content -->
		
		<footer>
		 	<hr/>
				<input class="loginbutton" type="button" id="buttonStyleStandard" value="Standard">
				<input class="loginbutton" type="button" id="buttonStyleHalloween" value="Halloween">
				<input class="loginbutton" type="button" id="buttonStyleChristmas" value="Christmas">
				<br/>
			 Gruppe: Stroh, Strohm, Steinbinder
		</footer>
		
	</body>
</html>