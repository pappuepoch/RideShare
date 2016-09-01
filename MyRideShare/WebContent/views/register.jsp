<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@include file="/includes/base_config.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Register </title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="resources/css/bootstrap-select.min.css" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="resources/js/bootstrap-select.min.js"></script>
    <script src="resources/js/register.js"></script>

</head>

<body>




    <div class="container">
        <div class="row">

        <form action="signup" method="post" id="formId">
            <div >
                <label id="lblError"></label>
                
            </div>

            <div class="form-group">
                <label for="Register-name">Full Name</label>
                <input type="text" id="Register-name" class="form-control" name="fullname" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" class="form-control" name="email" />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" name="password" />
                <label  id="lblPasswordError" ></label>
            </div>

            <div class="form-group">
                <label for="gender">Gender </label>
                <label><input type="radio" id="gender" name="gender" value="1"/>  Male</label>
            </div>
            <div class="form-group">
                <label><input type="radio" id="gender" name="gender" value="2"/>  Female</label>
            </div>


            <div class="form-group">
                <label for="birthday">BirthDay</label>
                <input id="birthday" type="date" class="form-control" name="birthyear" />
                <label  id="lblBirthdayError" ></label>
                
            </div>

            <div class="form-group">
                <label for="state">State</label>
                <input id="state" type="text" class="form-control" name="state" />
            </div>

            <div class="form-group">
                <label for="city">City</label>
                <input id="city" type="text" class="form-control" name="city" />
            </div>

            <div class="form-group">
                <label for="street">Street</label>
                <input id="street" type="text" class="form-control" name="street" />
            </div>


            <div class="form-group">
                <label for="zipcode">Zip code</label>
                <input id="zipcode" type="text" class="form-control" name="zipcode" />
            </div>

            <button type="submit" class="btn btn-default" id="btnSubmit" value="submit">Submit</button>

            </form>

        </div>
    </div>
</body>

</html>