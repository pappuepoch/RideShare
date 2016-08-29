package com.rideshare.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.rideshare.services.DBService;

/**
 * Servlet implementation class EditProfile
 */
@WebServlet("/editProfile")
public class EditProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditProfile() {
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
			rd = request.getRequestDispatcher("edit_profile.jsp");
		}
		rd.forward(request, response);
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String fullname = request.getParameter("fullname");
		String city = request.getParameter("city");
		String password = request.getParameter("password");
		String email = request.getParameter("email");
		String gender = request.getParameter("gender");
		String zipcode = request.getParameter("zipcode");
		String birthyear = request.getParameter("birthyear");
		String street = request.getParameter("street");
		String state = request.getParameter("state");
		boolean loginStatus = false;
		HttpSession session = request.getSession();
		loginStatus = (boolean)session.getAttribute("loginStatus");
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			DBService dbs = new DBService(request, response);
			if(dbs.updateProfile(fullname, gender, state, city, street, zipcode, birthyear, email, password)){
				rd = request.getRequestDispatcher("edit_profile.jsp");
			}else{
				rd = request.getRequestDispatcher("error.jsp");
			}
		}
		rd.forward(request, response);
	}

}
