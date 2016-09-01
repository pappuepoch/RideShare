<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@page import="com.rideshare.model.Users"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@include file="/includes/base_config.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>Google Maps Sample</title>
<meta charset="utf-8" />

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
	type="text/javascript"></script>
<script src="resources/js/googlemapsService.js" type="text/javascript"></script>
<script src="resources/js/GoogleMapsServiceFacade.js" type="text/javascript"></script>
 <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYyVfBbxBp2RfkKi0RQysjKWAKSNtyQa8&libraries=places&callback=GoogleMapServiceFacade.initGoogleMapServiceFacade"></script>
<!-- <link href="resources/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/font-awesome.min.css" rel="stylesheet">
<link href="resources/css/style.css" rel="stylesheet">
<link href="resources/css/wall.css" rel="stylesheet"> -->
</head>
<%
Users users = (Users)session.getAttribute("users");

%>
<body>
	<style>
html, body {
	margin: 20px 20px;
	padding: 0;
	
}

#map {
	height: 100%;
	width: 100%;
	float: left;

}

.top {
	top: left;

}

</style>


<%-- <jsp:include page="/views/fragments/wallControl.jsp"></jsp:include> --%>
<input type="hidden" id="userCity" value="<%=users.getCity() %>" />

	<div class="top">
		<input id="txt_address" type="text"   > <label>	<input type="checkbox" id="chk_forcast" name="forcast" >Show 5 Days Forcast </input>  </label><input
			id="btn_locate" type="button" value="Locate"> <br>
		<input id="txt_originAddress" type="text"
               placeholder="Enter an origin location" size="50"><br>

        <input id="txt_destinationAddress" type="text"
               placeholder="Enter a destination location" size="50">
               
          <input id="btn_findRoute" type="button" value="Find Route"><br>
		
	</div>
	<div id="map"></div>

</body>
</html>
