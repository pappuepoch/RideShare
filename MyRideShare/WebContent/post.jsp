<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Sign UP</title>
</head>
<body>
	<form action="postController" method="post">
		Post : <ctg:textInput name="post"  size="30" /><br>
		Post Type :  <input type="radio" name="posttype" value="1" checked> Post a Ride
				  <input type="radio" name="posttype" value="2"> Get a Ride
		<br>
		<input type="Submit" value="Save Post" />
	</form>

</body>
</html>