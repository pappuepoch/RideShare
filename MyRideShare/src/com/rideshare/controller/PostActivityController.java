package com.rideshare.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

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
		loginStatus = (boolean)session.getAttribute("loginStatus");
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			logger.debug("postActivityController : post inserted");
			DBService dbs = new DBService(request, response);
			dbs.getPostList();
			rd = request.getRequestDispatcher("user_post.jsp");
		}
		rd.forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
