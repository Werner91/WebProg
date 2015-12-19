import de.fhwgt.quiz.application.Player;
import de.fhwgt.quiz.application.Quiz;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;






public class SocketJSONMessage {
	
	private String JSONString; //enthält String, der aus JSON-Objekten mit der Methode toString() erzeugt wird
	
	private int messageType; //Typ der Nachricht, 1 = LoginRequest etc.
	private Object[] messageData = new Object[6]; //String, z.B. Spielername, Fragen, Antworten, ...
	
	
	/**
	 * Konstruktor baut JSON-Objekt aus Empfangsdaten (JSONString)
	 * @param JSONString String enthält Loginname, Katalogname
	 * @throws JSONException
	 */
	public SocketJSONMessage(String JSONString) throws JSONException {
		
		this.JSONString = JSONString;
		
		//lege neues JSON.Objekt an
		JSONObject jObject = new JSONObject(this.JSONString);
		
		//lese messageType aus
		switch(jObject.getInt("messageType")){
			
			case 1: //LoginRequest
				System.out.println("LoginRequest, SocketJSONMessage.java");
				this.messageType = jObject.getInt("messageType");
				this.messageData[0] = jObject.getString("loginName");
				break;
				
				
			case 5:
				
			case 7:
				
				
			case 8:
			case 10:
				
				
				
				
				
			default:
					break;
		
		
		
		
		}
		
		
		
		
		
		
	}

}

















