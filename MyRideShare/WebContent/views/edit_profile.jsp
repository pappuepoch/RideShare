<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@page import="com.rideshare.model.Users"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
<%@include file="/includes/base_config.jsp"%>

<%
 
Users users = (Users)session.getAttribute("users");
if(users==null){
	response.setHeader("Location", "index.jsp"); 
}
String zipcode = users.getZipcode()+"";
String birthyear = users.getBirthyear()+"";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Register</title>

	<link rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
		<link rel="stylesheet"
			href="../resources/css/bootstrap-select.min.css" type="text/css" />
		<script
			src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script
			src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
		<script src="/resources/js/bootstrap-select.min.js"></script>
		<script src="/resources/js/register.js"></script>
</head>

<body>


	<jsp:include page="/views/fragments/header.jsp"></jsp:include>


	<div class="container">
		<div class="row">

			<form action="editProfile" method="post" id="form">
				<div>
					<label id="lblError"></label>

				</div>

				<div class="form-group">
					<label for="Register-name">Full Name</label>
					<ctg:textInput name="fullname" size="30"
						value="<%=users.getFullname() %>" cssClass="form-control" />
					<!-- <input type="text" id="Register-name" class="form-control" name="txtName" /> -->
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<ctg:textInput name="email" size="30"
						value="<%=users.getEmail() %>" cssClass="form-control" />
					<!-- <input type="text" id="email" class="form-control" name="txtEmail" /> -->
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<!-- <input type="password" id="password" class="form-control" name="txtPassword" /> -->
					<input type="password" name="password" id="password" size="30"
						value="<%=users.getPassword() %>" class="form-control" readonly /><br>
					<label id="lblPasswordError"></label>
				</div>

				<div class="form-group">
					<label for="gender">Gender </label> <label><input
						type="radio" name="gender" value="1"
						<%=(users.getGender()==1)?"checked":"" %>> Male</label> <label><input
						type="radio" name="gender" value="2"
						<%=(users.getGender()==2)?"checked":"" %>> Female</label>
				</div>


				<div class="form-group">
					<label for="birthday">BirthDay</label>
					<ctg:textInput name="birthyear" size="30" value="<%=birthyear %>"
						cssClass="form-control" />
					<!-- <input id="birthday" type="date" class="form-control" name="txtState" /> -->
					<label id="lblBirthdayError"></label>

				</div>

				<div class="form-group">
					<label for="state">State</label>
					<ctg:textInput name="state" size="30"
						value="<%=users.getState() %>" cssClass="form-control" />
					<!--  <input id="state" type="text" class="form-control" name="txtState" /> -->
				</div>

				<div class="form-group">
					<label for="city">City</label>
					<ctg:textInput name="city" size="10" value="<%=users.getCity() %>"
						cssClass="form-control" />
					<!-- <input id="city" type="text" class="form-control" name="txtCity" /> -->
				</div>

				<div class="form-group">
					<label for="street">Street</label>
					<ctg:textInput name="street" size="30"
						value="<%=users.getStreet() %>" cssClass="form-control" />
					<!-- <input id="street" type="text" class="form-control" name="txtStreet" /> -->
				</div>


				<div class="form-group">
					<label for="zipcode">Zip code</label>
					<ctg:textInput name="zipcode" size="10" value="<%=zipcode %>"
						cssClass="form-control" />
					<!-- <input id="zipcode" type="text" class="form-control" name="txtZipCode" /> -->
				</div>

				<button type="submit" class="btn btn-default" id="btnSubmit">Submit</button>

			</form>

		</div>
	</div>
</body>

</html>