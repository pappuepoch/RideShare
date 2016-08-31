package com.rideshare.services;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.Query;
import org.hibernate.Session;

import com.rideshare.dao.DAO_Service;
import com.rideshare.model.Comments;
import com.rideshare.model.Likes;
import com.rideshare.model.Posts;
import com.rideshare.model.Users;
import com.rideshare.utils.HibernateUtil;
import com.rideshare.utils.ProjectUtils;
import com.sun.org.apache.xml.internal.resolver.helpers.Debug;

public class DBService {
	final static Logger logger = Logger.getLogger(DBService.class);
	HttpServletRequest request;
	HttpServletResponse response;
	HttpSession session;
	ProjectUtils pu;

	public DBService(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated constructor stub
		this.request = request;
		this.response = response;
		this.session = request.getSession(false);
		this.pu = new ProjectUtils();
	}

	public boolean insertComments(int postid, String comment) {
		logger.debug("insertComments started");
		Users users = (Users) this.session.getAttribute("users");
		if (users != null) {
			Comments comments = new Comments(users.getUserid(), postid, comment, new Date(), new Date());
			DAO_Service daos = new DAO_Service();
			daos.saveData(comments);
			return true;
		}
		return false;
	}

	public boolean insertPost(int posttype, String post) throws UnsupportedEncodingException {
		logger.debug("insertPost started");
		Users user = (Users) this.session.getAttribute("users");
		Posts posts = new Posts(user.getUserid(), post, posttype, new Date(), new Date());
		logger.debug("insertPost posts" + posts.toString());
		DAO_Service daos = new DAO_Service();
		return daos.saveData(posts);
	}

	public Map<String,Object> getPostList() {
		logger.debug("getPostList started");
		// String query = "From Posts ORDER BY `posts`.`dateupdated` DESC";
		DAO_Service daos = new DAO_Service();
		List<Posts> posts = daos.getOrderedPostList("DESC", "dateupdated");
		String query = "From Users ";
		List<Users> users = daos.getResultList(query);
		// List<Posts> resultList =
		// daos.getOrderedPostListByRange("DESC","dateupdated",0,5);

		this.request.setAttribute("posts", posts);
		System.out.println("num of Posts:" + posts.size());
		
		Map<String,Object> retMap = new HashMap<>();
		retMap.put("users", users);
		retMap.put("posts", posts);

		return retMap;
	}
	public Map<String,Object> getPostListByIndex(int firstResult, int maxResults, int posttype) {
		logger.debug("getPostList started");
		// String query = "From Posts ORDER BY `posts`.`dateupdated` DESC";
		DAO_Service daos = new DAO_Service();
		List<Posts> posts = daos.getOrderedPostListByRangeAndType("DESC", "dateupdated", firstResult, maxResults, posttype);
		String query = "From Users ";
		List<Users> users = daos.getResultList(query);
		// List<Posts> resultList =
		// daos.getOrderedPostListByRange("DESC","dateupdated",0,5);

		this.request.setAttribute("posts", posts);
		System.out.println("num of Posts:" + posts.size());
		
		Map<String,Object> retMap = new HashMap<>();
		retMap.put("users", users);
		retMap.put("posts", posts);

		return retMap;
	}

	public void insertUser(String fullname, String sGender, String state, String city, String street, String sZipcode,
			String sBirthyear, String email, String password) {

		logger.debug("insertUser started");
		int gender = (sGender != null) ? Integer.parseInt(sGender) : 0;
		int zipcode = (sZipcode != null) ? Integer.parseInt(sZipcode) : 0;
		int birthyear = (sBirthyear != null) ? Integer.parseInt(sBirthyear) : 0;

		Users user;
		try {
			user = new Users(fullname, gender, state, city, street, zipcode, birthyear, email,
					pu.convertToMd5(password), new Date(), new Date());
			DAO_Service daos = new DAO_Service();
			daos.saveData(user);
		} catch (UnsupportedEncodingException e) {
			logger.debug("Error @ insertUser : " + e);
			e.printStackTrace();
		}
	}

	public List<Users> getUserList() {
		logger.debug("getUserList started");
		String query = "From Users ";
		DAO_Service daos = new DAO_Service();
		List<Users> resultList = daos.getResultList(query);
		System.out.println("num of users:" + resultList.size());
		for (Users next : resultList) {
			System.out.println("next user: " + next);
			logger.debug("next user: " + next);
		}
		return resultList;
	}

	public int getLikesCountByPostId(int postid) {
		logger.debug("getLikesCountByPostId started");
		String query = "From Users ";
		DAO_Service daos = new DAO_Service();
		List<Likes> resultList = daos.getLikesByPostId(postid, "DESC", "dateupdated");
		System.out.println("num of users:" + resultList.size());
		for (Likes next : resultList) {
			System.out.println("next user: " + next);
			logger.debug("next user: " + next);
		}
		return resultList.size();
	}

	public boolean checkLogin(String email, String password) {
		logger.debug("checkLogin started");
		String query = "From Users ";
		DAO_Service daos = new DAO_Service();
		List<Users> resultList = daos.getResultList(query);
		System.out.println("num of users:" + resultList.size());
		for (Users next : resultList) {
			System.out.println("next user: " + next);
			if (email.equals(next.getEmail())) {
				String md5pw;
				try {
					logger.debug("User: " + next.getEmail() + ", checked with # " + email);
					md5pw = pu.convertToMd5(password);
					if (md5pw.equals(next.getPassword())) {
						logger.debug("Login Successful");
						this.session.setAttribute("users", next);
						this.session.setAttribute("loginStatus", true);
						return true;
					}
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					logger.debug("Cannot convert to MD5 : " + e);
					e.printStackTrace();
				}

			}
			logger.debug("next user: " + next);
		}
		return false;
	}

	public boolean updateProfile(String fullname, String gender, String state, String city, String street,
			String zipcode, String birthyear, String email, String password) {
		// TODO Auto-generated method stub
		Users users = (Users) this.session.getAttribute("users");
		users.setBirthyear((birthyear != null) ? Integer.parseInt(birthyear) : users.getGender());
		users.setCity(city);
		// users.setEmail(email);
		users.setDateupdated(new Date());
		users.setFullname(fullname);
		users.setGender((gender != null) ? Integer.parseInt(gender) : users.getGender());
		// users.setPassword(pu.convertToMd5(password));
		users.setState(state);
		users.setStreet(street);
		users.setZipcode((zipcode != null) ? Integer.parseInt(zipcode) : users.getZipcode());
		DAO_Service daos = new DAO_Service();
		return daos.saveOrUpdate(users);

	}

	public List getCommentsByPostId(int postid) {
		// TODO Auto-generated method stub
		logger.debug("getCommentsByPostId started");
		DAO_Service daos = new DAO_Service();
		List<Comments> resultList = daos.getCommentsListByPostId(postid, "DESC", "dateupdated");
		// List<Posts> resultList =
		// daos.getOrderedPostListByRange("DESC","dateupdated",0,5);
		this.request.setAttribute("comments", resultList);
		System.out.println("num of comments:" + resultList.size());
		return resultList;
	}

	public boolean insertLikes(int postid) {
		logger.debug("insertLikes started");
		Users user = (Users) this.session.getAttribute("users");
		Likes likes = new Likes(user.getUserid(), postid, new Date(), new Date());
		logger.debug("insertLikes likes" + likes.toString());
		DAO_Service daos = new DAO_Service();
		return daos.saveData(likes);

	}

	public void delLikes(int postid) {
		logger.debug("delLikes started");
		Users users = (Users) this.session.getAttribute("users");
		DAO_Service daos = new DAO_Service();
		daos.delLikes(users.getUserid(), postid);

	}

	public void delPost(int postid) {
		logger.debug("delPost started");
		Users users = (Users) this.session.getAttribute("users");
		DAO_Service daos = new DAO_Service();
		daos.delPostById(users.getUserid(), postid);

	}
}
