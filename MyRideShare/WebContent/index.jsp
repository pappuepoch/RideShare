<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
<%@page import="java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>My Ride Share</title>
</head>
<body>
	<ctg:currentDateTime color="#9F81F7" size='20px'/>
	<h2>Uase Login</h2>
	<form action="LoginController" method="get">
	User Name : <input type="text" name="user" id="username"><br>
	Password : <input type="password" name="password" id="password"><br>
	<input type="submit" value="Log In">	
	</form>
	new user? <a href="signup">Sign Up</a>
</body>
</html>