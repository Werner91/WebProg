

import java.io.IOException;

import org.jdom2.*;
import org.jdom2.input.SAXBuilder;


public class catalogReader{
	
	public catalogReader() throws JDOMException, IOException{
		Document doc = new SAXBuilder().build( "C:/Users/Achimpb/git/WebProg/catalogs/one.xml" );
		Element frage = doc.getRootElement();
		Element neueFrage = frage.getChild("fragenblock");
		Element laneueFrage = frage.getChild("frage");
		System.out.println(laneueFrage);
	}
	
	public static void main(String[] args){
		System.out.println("catalogReader aufgerufen!");
		try {
			new catalogReader();
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}