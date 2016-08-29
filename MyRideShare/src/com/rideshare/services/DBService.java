package com.rideshare.services;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;

import com.rideshare.dao.DAO_Service;
import com.rideshare.model.Users;
import com.rideshare.utils.HibernateUtil;
import com.rideshare.utils.ProjectUtils;

public class DBService {
	final static Logger logger = Logger.getLogger(DBService.class);

	public void insertUser(String fullname, String sGender, String state, String city, String street, String sZipcode,
			String sBirthyear, String email, String password) {

		logger.debug("insertUser started");
		ProjectUtils pu = new ProjectUtils();
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



		/*Query q = session.createQuery("From Users ");

			List<Users> resultList = q.list();
			System.out.println("num of users:" + resultList.size());
			for (Users next : resultList) {
				System.out.println("next user: " + next);
				logger.debug("next user: " + next);
			}*/



	}
	public List<Users> getUserList() {

		logger.debug("getUserList started");
		ProjectUtils pu = new ProjectUtils();

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
}
