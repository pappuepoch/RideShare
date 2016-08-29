package com.rideshare.dao;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;

import com.rideshare.model.Users;
import com.rideshare.services.DBService;
import com.rideshare.utils.HibernateUtil;

public class DAO_Service {
	final static Logger logger = Logger.getLogger(DAO_Service.class);
	public boolean saveData(Object o){
		Session session = HibernateUtil.getSessionFactory().openSession();
		if (session.isConnected()) {

			session.beginTransaction();

			logger.debug("saveData : "+o.toString());
			session.save(o);
			session.getTransaction().commit();
			
			return true;
		}
		logger.debug("saveData cannot save "+o.toString());
		return false;
	}
	public <T> List<T> getResultList(String query){
		Session session = HibernateUtil.getSessionFactory().openSession();
		if (session.isConnected()) {

		Query q = session.createQuery(query);

		List<T> resultList = q.list();
		/*System.out.println("num of users:" + resultList.size());
		for (T next : resultList) {
			System.out.println("next user: " + next);
			logger.debug("next user: " + next);
		}*/
		return resultList;
		}
		logger.debug("getResultList cannot perform "+query);
		return null;
	}
}
