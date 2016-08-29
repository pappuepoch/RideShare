package com.rideshare.dao;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

import com.rideshare.model.Posts;
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
			session.close();
			return true;
		}
		logger.debug("saveData fail "+o.toString());
		return false;
	}
	public boolean saveOrUpdate(Object o){
		Session session = HibernateUtil.getSessionFactory().openSession();
		if (session.isConnected()) {

			session.beginTransaction();

			logger.debug("saveOrUpdate : "+o.toString());
			session.saveOrUpdate(o);
			session.getTransaction().commit();
			session.close();
			return true;
		}
		logger.debug("saveOrUpdate fail "+o.toString());
		return false;
	}
	public <T> List<T> getResultList(String query){
		
		Session session = HibernateUtil.getSessionFactory().openSession();
		if (session.isConnected()) {

		Query q = session.createQuery(query);

		List<T> resultList = q.list();
		System.out.println("num of users:" + resultList.size());
		for (T next : resultList) {
			System.out.println("next user: " + next);
			logger.debug("next user: " + next);
		}
		session.close();
		return resultList;
		}
		logger.debug("getResultList cannot perform "+query);
		return null;
	}
	public List<Posts> getOrderedPostList( String order, String column) {
		// TODO Auto-generated method stub
		Session session = HibernateUtil.getSessionFactory().openSession();
		logger.debug("getOrderedPostList Started");
		if("DESC".toLowerCase().equals(order.toLowerCase())){
			List<Posts> posts = session.createCriteria(Posts.class).addOrder( Order.desc(column) ).list() ; 
			logger.debug("getOrderedPostList posts count "+posts.size());
			return posts;
		}else{
			List posts = session.createCriteria(Posts.class).addOrder( Order.asc(column) ).list() ; 
			logger.debug("getOrderedPostList posts count "+posts.size());
			return posts;
		}
	}
	public List<Posts> getOrderedPostListByRange( String order, String column, int firstResult, int maxResults) {
		// TODO Auto-generated method stub
		Session session = HibernateUtil.getSessionFactory().openSession();
		logger.debug("getOrderedPostList Started");
		Criteria criteria = session.createCriteria(Posts.class);
		criteria.setFirstResult(firstResult);
		criteria.setMaxResults(maxResults);
		if("DESC".toLowerCase().equals(order)){
			criteria.addOrder(Order.desc(column));
		}else{
			criteria.addOrder(Order.asc(column));
		}
		List<Posts> posts = criteria.list() ; 
		logger.debug("getOrderedPostList posts count "+posts.size());
		return posts;
	}
}
