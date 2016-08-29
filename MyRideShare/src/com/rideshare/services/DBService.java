package com.rideshare.services;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.Query;
import org.hibernate.Session;

import com.rideshare.dao.DAO_Service;
import com.rideshare.model.Posts;
import com.rideshare.model.Users;
import com.rideshare.utils.HibernateUtil;
import com.rideshare.utils.ProjectUtils;
import com.sun.org.apache.xml.internal.resolver.helpers.Debug;

public class DBService {
	final static Logger logger = Logger.getLogger(DBService.class);
	HttpServletRequest request; HttpServletResponse response;
	HttpSession session;
	ProjectUtils pu;
	public DBService(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated constructor stub
		this.request=request;
		this.response= response;
		this.session = request.getSession(false);
		this.pu = new ProjectUtils();
	}

	public boolean insertPost(int posttype, String post) throws UnsupportedEncodingException {

		logger.debug("insertPost started");
		Users user = (Users)this.session.getAttribute("users");
		Posts posts = new Posts(user.getUserid(), post, posttype, new Date(), new Date());
		logger.debug("insertPost posts"+ posts.toString());
		DAO_Service daos = new DAO_Service();
		return daos.saveData(posts);
	}
	public List<Posts> getPostList() {
		logger.debug("getPostList started");
		//String query = "From Posts ORDER BY  `posts`.`dateupdated` DESC";
		DAO_Service daos = new DAO_Service();
		List<Posts> resultList = daos.getOrderedPostList("DESC","dateupdated");
		//List<Posts> resultList = daos.getOrderedPostListByRange("DESC","dateupdated",0,5);
		
		this.request.setAttribute("posts", resultList);
		System.out.println("num of Posts:" + resultList.size());
		/*ObjectMapper mapper = new ObjectMapper();
		try {
			logger.debug("JSON Test: "+mapper.writeValueAsString(resultList));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.debug("Cannot Convert To JSON : "+e);
		}
		for (Posts next : resultList) {	
			System.out.println("next Posts: " + next);
			logger.debug("next Posts: " + next);
			try {
				logger.debug("JSON Test: "+mapper.writeValueAsString(next));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
				logger.debug("Cannot Convert To JSON : "+e);
			}
		}*/
		return resultList;
	}
	public void insertUser(String fullname, String sGender, String state, String city, String street, String sZipcode,
			String sBirthyear, String email, String password) {

		logger.debug("insertUser started");
		int gender = (sGender != null) ? Integer.parseInt(sGender) : 0;
		int zipcode = (sZipcode != null) ? Integer.parseInt(sZipcode) : 0;
		int birthyear = (sBirthyear != null) ? Integer.parseInt(sBirthyear) : 0;

		Users user;
		try {
			user = new Users(fullname, gender, state, city, street, zipcode, birthyear, email, pu.convertToMd5(password),
					new Date(), new Date());
			DAO_Service daos = new DAO_Service();
			daos.saveData(user);
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			logger.debug("Error @ insertUser : "+e);
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
	public boolean checkLogin(String email,String password){
		logger.debug("checkLogin started");
		String query = "From Users ";
		DAO_Service daos = new DAO_Service();
		List<Users> resultList = daos.getResultList(query);
		System.out.println("num of users:" + resultList.size());
		for (Users next : resultList) {
			System.out.println("next user: " + next);
			if(email.equals(next.getEmail())){
				String md5pw;
				try {
					logger.debug("User: "+ next.getEmail()+", checked with # "+email);
					md5pw = pu.convertToMd5(password);
					if(md5pw.equals(next.getPassword())){
						logger.debug("Login Successful");
						this.session.setAttribute("users", next);
						this.session.setAttribute("loginStatus", true);
						return true;
					}
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					logger.debug("Cannot convert to MD5 : "+ e);
					e.printStackTrace();
				}
				
			}
			logger.debug("next user: " + next);
		}
		return false;
	}

	public boolean updateProfile(String fullname, String gender, String state, String city, String street, String zipcode,
			String birthyear, String email, String password) {
		// TODO Auto-generated method stub
		Users users = (Users)this.session.getAttribute("users");
		users.setBirthyear((birthyear!=null)?Integer.parseInt(birthyear):users.getGender());
		users.setCity(city);
		//users.setEmail(email);
		users.setDateupdated(new Date());
		users.setFullname(fullname);
		users.setGender((gender!=null)?Integer.parseInt(gender):users.getGender());
		//users.setPassword(pu.convertToMd5(password));
		users.setState(state);
		users.setStreet(street);
		users.setZipcode((zipcode!=null)?Integer.parseInt(zipcode):users.getZipcode());
		DAO_Service daos = new DAO_Service();
		return daos.saveOrUpdate(users);
		
	}
}
