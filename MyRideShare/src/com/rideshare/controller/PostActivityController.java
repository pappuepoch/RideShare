package com.rideshare.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;

import com.rideshare.model.Posts;
import com.rideshare.services.DBService;

/**
 * Servlet implementation class PostActivityController
 */
@WebServlet("/postActivityController")
public class PostActivityController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final static Logger logger = Logger.getLogger(PostActivityController.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PostActivityController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		boolean loginStatus = false;
		HttpSession session = request.getSession();
		loginStatus = (session.getAttribute("loginStatus")!=null)?(boolean)session.getAttribute("loginStatus"):false;
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			logger.debug("postActivityController : post inserted");
			DBService dbs = new DBService(request, response);
			List<Posts> posts = dbs.getPostList();
			rd = request.getRequestDispatcher("user_post.jsp");
			ObjectMapper mapper = new ObjectMapper();
			/*response.setContentType("text/html");
			response.setCharacterEncoding("UTF-8");
			logger.debug("commentsController JSON : "+mapper.writeValueAsString(posts));
			response.getWriter().print(mapper.writeValueAsString(posts));
			return;*/
		}
		
		rd.forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		logger.debug("PostActivityController : doPost() Started");
		boolean loginStatus = false;
		String cmd = request.getParameter("cmd");
		boolean xcmd = (request.getAttribute("xcmd")!=null)?(boolean)request.getAttribute("xcmd"):false;
		if(xcmd){
			doGet(request, response);
		}
		HttpSession session = request.getSession();
		loginStatus = (session.getAttribute("loginStatus")!=null)?(boolean)session.getAttribute("loginStatus"):false;
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			String sPostId = request.getParameter("postid");
			int postid = (sPostId==null)?0:Integer.parseInt(sPostId);
			logger.debug("PostActivityController : delPost() postid : "+postid+", cmd "+cmd);
			DBService dbs = new DBService(request, response);
			if("del".equals(cmd)){
				dbs.delPost(postid);
				request.setAttribute("xcmd", true);
			}
			rd = request.getRequestDispatcher("postActivityController");
		}
		rd.forward(request, response);
	}

}
