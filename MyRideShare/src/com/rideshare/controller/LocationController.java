package com.rideshare.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;

import com.rideshare.model.Users;
import com.rideshare.services.DBService;

/**
 * Servlet implementation class LocationController
 */
@WebServlet("/LocationController")
public class LocationController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final static Logger logger = Logger.getLogger(LocationController.class);
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LocationController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		DBService dbs = new DBService(request, response);
		List<Users> users = dbs.getUserList();
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		logger.debug("LocationController JSON : "+mapper.writeValueAsString(users));
		response.getWriter().print(mapper.writeValueAsString(users));
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		

		doGet(request, response);
	}

}
