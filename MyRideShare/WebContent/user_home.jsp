<%@page import="com.rideshare.model.Users"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%
Users users = (Users)session.getAttribute("users");
if(users==null){
	response.setHeader("Location", "index.jsp"); 
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Home Page :: <%=users.getFullname() %></title>
</head>
<body>
	<h1>This is your home page!</h1>
	Welcome <%=users.getFullname() %><br>
	<a href="editProfile">Edit Profile</a>
</body>
</html>