<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
<%!
HashMap<String,String> gender = new HashMap<String, String>();
%>
<%
gender.put("1", "Male");
gender.put("2", "Female");
gender.put("3", "Other");

%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Sign UP</title>
</head>
<body>
	<form action="signup" method="post">
		Full Name : <ctg:textInput name="fullname"  size="30" /><br>
		Email : <ctg:textInput name="email"  size="30" /><br>
		Password : <input type="password" name="password" id="password"  size="30" /><br>
		Birth Year : <ctg:textInput name="birthyear"  size="30" /><br>
		Gender :  <input type="radio" name="gender" value="1" checked> Male
				  <input type="radio" name="gender" value="2"> Female
				  <input type="radio" name="gender" value="3"> Other
		<br>
		City : <ctg:textInput name="city"  size="10" /><br>
		Zip Code : <ctg:textInput name="zipcode"  size="10" /><br>
		Street : <ctg:textInput name="street"  size="30" /><br>
		State : <ctg:textInput name="state"  size="30" /><br>
		<input type="Submit" value="Sign Up" />
	</form>

</body>
</html>