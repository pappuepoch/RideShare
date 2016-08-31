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
import org.hibernate.Session;

import com.rideshare.services.DBService;
import com.rideshare.utils.HibernateUtil;

import jdk.nashorn.internal.ir.RuntimeNode.Request;

/**
 * Servlet implementation class LoginController
 */
@WebServlet("/LoginController")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final static Logger logger = Logger.getLogger(LoginController.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		boolean loginStatus = false;
		HttpSession session = request.getSession();
		loginStatus = (session.getAttribute("loginStatus")!=null)?(boolean)session.getAttribute("loginStatus"):false;
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			rd = request.getRequestDispatcher("views/wall.jsp");
		}
		rd.forward(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		DBService dbs = new DBService(request, response);
		RequestDispatcher rd;
		logger.debug("LoginController");
		if(dbs.checkLogin(username, password)){
			rd = request.getRequestDispatcher("user_home.jsp");
			logger.debug("LoginController: user_home");
		}else{
			rd = request.getRequestDispatcher("index.jsp");
			logger.debug("LoginController: index");
		}
		
		rd.forward(request, response);
	}

}
