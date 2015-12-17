

import java.io.IOException;



import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import de.fhwgt.quiz.application.Quiz;
import de.fhwgt.quiz.loader.LoaderException;

/**
 * Servlet implementation class AjaxCatalogServlet
 */
@WebServlet("/AjaxCatalogServlet")
public class AjaxCatalogServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxCatalogServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 * 
	 * methode nimmt den ajax-request entgegen, sendet katalogliste an client zurück
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String[] catalogList = null;
		
		try {
			
			catalogList = Quiz.getInstance().getCatalogList().keySet().toArray(new String[0]);
			
		} catch (LoaderException e) {
			
			e.printStackTrace();
			
		}
		
		
		//baue xml-antwort string
		String XMLresponse = "<main>";
		
		for(int i = 0; i < catalogList.length; i++){
			// System.out.println("katalog: " + catalogList[i]);
			XMLresponse += "<catalogName>" + catalogList[i] + "</catalogName>";
		}
		
		XMLresponse += "</main>";
		
		//setzte xml als ContentType
		response.setContentType("text/xml");
		
		//sende nachricht mit xml-string an client
		PrintWriter writer = response.getWriter();
		writer.print(XMLresponse);
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
