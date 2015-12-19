import java.util.TimerTask;
import org.json.JSONException;

import de.fhwgt.quiz.error.QuizError;
import de.fhwgt.quiz.application.Player;
import de.fhwgt.quiz.application.Quiz;


import javax.websocket.Session;




/*
 * Klasse für das Timout der Fragen
 * Ist Timout einer Frage abgelaufen wird eine Nachricht
 * mit den korrekten Antworten an den Client gesendet
 * 
 * Ein TimerTask ist eine Klasse, die uns Runnable implementieren lässt und 
 * Operationen umfasst, die zu einem Zeitpunkt oder in einer beliebigen Wiederholung 
 * ausgeführt werden sollen.
 * http://openbook.rheinwerk-verlag.de/javainsel9/javainsel_14_007.htm 
 */
public class Timer extends TimerTask{

	private Session tSession;
	private Player tPlayer;
	
	
	public Timer(Player tPlayer, Session tSession){
		this.tPlayer = tPlayer;
		this.tSession = tSession;
	}
	
	
	
	@Override
	public void run() {
		System.out.println("Time out!");
		
	/*	try{
			QuizError qError = new QuizError();
			
			try{
				//erstelle Timeout-Nachricht und sende diese an den Client
				//tSession.getBasicRemote().sendText(
						// Parameter true -> Timeout abgelaufen + Index der richtigen Antwort
						//new SocketJSONMessage(11, new Object[] { true, Quiz.getInstance().answerQuestion(tPlayer, -1, qError) } )
				//		.getJSONString()
					//	);
			}
		}*/
		
	}

}
















