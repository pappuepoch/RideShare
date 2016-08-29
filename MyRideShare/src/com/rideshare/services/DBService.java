package com.rideshare.services;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;

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

		Session session = HibernateUtil.getSessionFactory().openSession();
		if (session.isConnected()) {

			session.beginTransaction();
			Users user;
			try {
				user = new Users(fullname, gender, state, city, street, zipcode, birthyear, email, pu.convertToMd5(password),
						new Date(), new Date());
				logger.debug(user.toString());
				session.save(user);
				session.getTransaction().commit();

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.debug("insertUser" + e);
			}

			Query q = session.createQuery("From Users ");

			List<Users> resultList = q.list();
			System.out.println("num of users:" + resultList.size());
			for (Users next : resultList) {
				System.out.println("next user: " + next);
				logger.debug("next user: " + next);
			}

		}

	}
}
