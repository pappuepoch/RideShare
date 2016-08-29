<%@page import="java.util.List"%>
<%@page import="com.rideshare.model.Posts"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>User Post</title>
</head>
<body>
<%
List<Posts> posts = (List)request.getAttribute("posts");
if(posts==null){
	response.setHeader("Location", "posts.jsp"); 
}
%>

	this is user post

	<c:forEach var="post" items="${posts}"	varStatus="loopCounter">
		------------------  <c:out value="count: ${loopCounter.count}" /> ---------------------------<br><br>
		Post Id: <c:out value="${post.getPostid()}" /><br>
		Post Type :<c:out value="${post.getPosttype()}" /><br><br>
		Post :<c:out value="${post.getPost()}" /><br>
		Post Time: <c:out value="${post.getDateupdated()}" /><br>
		Post By:<c:out value="${post.getUserid()}" /><br><br>
		
	</c:forEach>

</body>
</html>