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

import com.rideshare.model.Comments;
import com.rideshare.services.DBService;

/**
 * Servlet implementation class Comments
 */
@WebServlet("/commentsController")
public class CommentsController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final static Logger logger = Logger.getLogger(CommentsController.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CommentsController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		logger.debug("commentsController Started");
		boolean loginStatus = false;
		HttpSession session = request.getSession();
		loginStatus = (session.getAttribute("loginStatus")!=null)?(boolean)session.getAttribute("loginStatus"):false;
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			//String comments = request.getParameter("comments");
			String sPostId = request.getParameter("postid");
			int postid = (sPostId==null)?0:Integer.parseInt(sPostId);
			//comments = (comments==null)?"":comments;
			logger.debug("commentsController postid : "+postid);
			DBService dbs = new DBService(request, response);
			List<Comments> comments =(List)dbs.getCommentsByPostId(postid);
			
			logger.debug("commentsController Size : "+comments.size());
			for(Comments c : comments){
				logger.debug("commentsController : "+ c.toString());
			}
			rd = request.getRequestDispatcher("postActivityController");
		
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		logger.debug("commentsController JSON : "+mapper.writeValueAsString(comments));
		response.getWriter().print(mapper.writeValueAsString(comments));
		return;
		}
		//rd.forward(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		boolean loginStatus = false;
		HttpSession session = request.getSession();
		loginStatus = (session.getAttribute("loginStatus")!=null)?(boolean)session.getAttribute("loginStatus"):false;
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			String comments = request.getParameter("comments");
			String sPostId = request.getParameter("postid");
			int postid = (sPostId==null)?0:Integer.parseInt(sPostId);
			comments = (comments==null)?"":comments;
			DBService dbs = new DBService(request, response);
			dbs.insertComments(postid, comments);
			rd = request.getRequestDispatcher("postActivityController");
		}
		rd.forward(request, response);

	}

}
