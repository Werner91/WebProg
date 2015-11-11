function lauftext(){
	//headline = WebQuiz
	document.getElementById("headlineticker").value = "" +
	headline.substring(begin,end) + " " + headline.substring(0,begin); //substring(begin, end) -> gesamter Text WebQuiz wird angezeigt
	begin ++;
	if(begin >= end) //wenn WebQuiz einmal durchgelaufen ist
	{ 
	 begin = 0; 
	}
	/* Laufgeschwindigkeit: Höhere Zahl = langsamer */
	window.setTimeout("lauftext()", 300); 
}