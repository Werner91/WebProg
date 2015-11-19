package de.unihannover.se.soa08.tutorials;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GetLoginData
 */
@WebServlet("/GetLoginData")
public class GetLoginData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String playerName;

    /**
     * Default constructor. 
     */
    public GetLoginData() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//request
		playerName = request.getParameter("inputPlayerName");
		java.io.PrintWriter ausgabe = response.getWriter();
		
		if(playerName == null){
			System.out.println("Es wurde kein Name gesendet!");
			ausgabe.println("<html><body>Es wurde kein Name gesendet!</body></html>");
		}
		else if("".equals(playerName)){
			System.out.println("Es wurde kein Name angegeben!");
			ausgabe.println("<html><body>Es wurde kein Name angegeben!</body></html>");
		}
		else{
			System.out.println("Spielername: " + playerName);
			//ausgabe.println("<html><body>" + playerName + "</body></html>");
			ausgabe.println(playerName);
		}
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
