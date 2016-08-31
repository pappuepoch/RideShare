package com.rideshare.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;

import com.rideshare.dao.DAO_Service;
import com.rideshare.model.Posts;
import com.rideshare.services.DBService;

/**
 * Servlet implementation class PostController
 */
@WebServlet("/postController")
public class PostController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final static Logger logger = Logger.getLogger(PostController.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PostController() {
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
			rd = request.getRequestDispatcher("post.jsp");
		}
		rd.forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		logger.debug("PostController : doPost");
		boolean loginStatus = false;
		HttpSession session = request.getSession();
		loginStatus = (session.getAttribute("loginStatus")!=null)?(boolean)session.getAttribute("loginStatus"):false;
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			String post = (String)request.getParameter("post");
			String sPosttype = (String)request.getParameter("posttype");
			int posttype = (sPosttype==null)?0:Integer.parseInt(sPosttype);
			logger.debug("PostController : Sending post");
			DBService dbs = new DBService(request, response);
			boolean result = dbs.insertPost(posttype, post);
			if(result){
				logger.debug("PostController : post inserted");
				Map<String,Object> retMap = dbs.getPostList();
				
				response.setContentType("text/html");
				response.setCharacterEncoding("UTF-8");
				ObjectMapper mapper = new ObjectMapper();
				logger.debug("likesController JSON : "+mapper.writeValueAsString(retMap));
				response.getWriter().print(mapper.writeValueAsString(retMap));
				return;
				/*//dbs.getPostList();
				rd = request.getRequestDispatcher("user_home.jsp");*/
			}
		}
		rd.forward(request, response);
	}

}
