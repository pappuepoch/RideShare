<%@page import="java.util.List"%>
<%@page import="com.rideshare.model.Posts"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
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
		<form action="likesController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			<input type="hidden" name="cmd" value="add">
			<input type="submit" value="Likes" />
		</form>
		<form action="likesController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			<input type="hidden" name="cmd" value="del">
			<input type="submit" value="Dislikes" />
		</form>
		<form action="commentsController" method="get" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			<input type="submit" value="View Comments" />
		</form>
		<form action="commentsController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			Comments : <ctg:textInput name="comments"  size="30" /><br>
			<input type="submit" value="Post Comment" />
		</form>
		
	</c:forEach>

</body>
</html>