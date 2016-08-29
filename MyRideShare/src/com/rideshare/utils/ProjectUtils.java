package com.rideshare.utils;

import java.io.UnsupportedEncodingException;

import org.apache.log4j.Logger;

public class ProjectUtils {
	final static Logger logger = Logger.getLogger(ProjectUtils.class);

	public ProjectUtils() {
		// TODO Auto-generated constructor stub
	}

	public String convertToMd5(final String md5) throws UnsupportedEncodingException {
		StringBuffer sb = null;
		try {
			final java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
			final byte[] array = md.digest(md5.getBytes("UTF-8"));
			sb = new StringBuffer();
			for (int i = 0; i < array.length; ++i) {
				sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1, 3));
			}
			return sb.toString();
		} catch (final java.security.NoSuchAlgorithmException e) {
			logger.debug("convertToMd5 : " + e);
		}
		return sb.toString();
	}

	public static void main(String[] args) throws UnsupportedEncodingException {
		ProjectUtils pu = new ProjectUtils();
		System.out.println("utils: " + pu.convertToMd5("sajedul"));
	}
}
