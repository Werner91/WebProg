function changeBackgroundColorOnClick(event){
	//alert("changeBackgroundColorOnClick");
	//alert(document.getElementById("catalogOne").style.backgroundColor);
	
	var catalogOne = document.getElementById("catalogOne");
	var currentColorOne = document.getElementById("catalogOne").style.backgroundColor; 
	
	var catalogSimple = document.getElementById("catalogSimple");
	var currentColorSimple = document.getElementById("catalogSimple").style.backgroundColor; 
	
	var catalogSysProg = document.getElementById("catalogSysProg");
	var currentColorSysProg = document.getElementById("catalogSysProg").style.backgroundColor;
	
	//alert(event.target.parameter);
	switch(event.target.parameter){ 
		
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