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

import com.rideshare.dao.DAO_Service;
import com.rideshare.model.Comments;
import com.rideshare.model.Likes;
import com.rideshare.services.DBService;

/**
 * Servlet implementation class LikesController
 */
@WebServlet("/likesController")
public class LikesController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	final static Logger logger = Logger.getLogger(LikesController.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LikesController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		logger.debug("LikesController : doGet() Started");
		String sPostId = request.getParameter("postid");
		int postid = (sPostId==null)?0:Integer.parseInt(sPostId);
		DBService dbs = new DBService(request, response);
		//dbs.getPostList();
		int likesCount = dbs.getLikesCountByPostId(postid);
		logger.debug("LikesController likesCount : "+likesCount);
		//return likesCount;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		logger.debug("LikesController : doPost() Started");
		boolean loginStatus = false;
		String cmd = request.getParameter("cmd");
		HttpSession session = request.getSession();
		loginStatus = (boolean)session.getAttribute("loginStatus");
		RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
		if(loginStatus){
			String sPostId = request.getParameter("postid");
			int postid = (sPostId==null)?0:Integer.parseInt(sPostId);
			logger.debug("LikesController : delLike() postid : "+postid+", cmd "+cmd);
			DBService dbs = new DBService(request, response);
			if("add".equals(cmd)){
				dbs.insertLikes(postid);
			}
			if("del".equals(cmd)){
				dbs.delLikes(postid);
			}
			rd = request.getRequestDispatcher("postActivityController");
		}
		rd.forward(request, response);
	}

}
