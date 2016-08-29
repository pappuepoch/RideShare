<%@page import="com.rideshare.model.Users"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
<%
Users users = (Users)session.getAttribute("users");
if(users==null){
	response.setHeader("Location", "index.jsp"); 
}
String zipcode = users.getZipcode()+"";
String birthyear = users.getBirthyear()+"";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Sign UP</title>
</head>
<body>
	<form action="editProfile" method="post">
		Full Name : <ctg:textInput name="fullname"  size="30" value="<%=users.getFullname() %>" /><br>
		Email : <ctg:textInput name="email"  size="30" value="<%=users.getEmail() %>" /><br>
		Password : <input type="password" name="password" id="password"  size="30" value="<%=users.getPassword() %>" readonly /><br>
		Birth Year : <ctg:textInput name="birthyear"  size="30" value="<%=birthyear %>" /><br>
		Gender :  <input type="radio" name="gender" value="1" <%=(users.getGender()==1)?"checked":"" %> > Male
				  <input type="radio" name="gender" value="2" <%=(users.getGender()==2)?"checked":"" %>> Female
				  <input type="radio" name="gender" value="3" <%=(users.getGender()==3)?"checked":"" %>> Other
		<br>
		City : <ctg:textInput name="city" size="10" value="<%=users.getCity() %>" /><br>
		Zip Code : <ctg:textInput name="zipcode"  size="10" value="<%=zipcode %>" /><br>
		Street : <ctg:textInput name="street"  size="30" value="<%=users.getStreet() %>" /><br>
		State : <ctg:textInput name="state"  size="30" value="<%=users.getState() %>" /><br>
		<input type="Submit" value="Update Profile" />
	</form>

</body>
</html>