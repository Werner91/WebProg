

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import de.fhwgt.quiz.application.Quiz;
import de.fhwgt.quiz.error.QuizError;

/**
 * Servlet implementation class GetLoginData
 */
@WebServlet("/GetLoginData")
public class GetLoginData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String playerName;
	
	private int playerCount = 0;
	private int playerMax = 6;
	private String[] playerArray = new String[playerMax];
    
	/**
     * Default constructor. 
     */
    public GetLoginData() {
        super();
    }
    
    //Einsprung ins Servlet durch den Servlet-Container um Initialisierungen vorzunehmen
    public void init(ServletConfig config) throws ServletException{
    	super.init(config);
    	System.out.println("init aufgerufen!");
    }
    
    
    
    
    

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		playerName = request.getParameter("inputPlayerName");
		
		
		if(playerName == null){
			
			response.getWriter().println("Fehler: Es wurde kein Name eingegeben");
		
		}else if("".equals(playerName)){
			
			//leerer String
			response.getWriter().println("Fehler: Es wurde kein Name eingegeben");
		
		}else{
			
			//wenn Name gültig, dann neuen Spieler erstellen
			    		
			QuizError playerError = new QuizError();
			
			if(Quiz.getInstance().createPlayer(playerName, playerError) == null){
				
				// error - could not create player
			    response.getWriter().println("Fehler beim Erstellen des Spielers: " + playerError.getType());
			    
			}else{
				// successfully created player
			    RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
			    dispatcher.forward(request, response);    			
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
