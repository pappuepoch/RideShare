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
<script src="resources/js/location.js" type="text/javascript"></script>
<script src="resources/js/location_map.js" type="text/javascript"></script>
<script async defer
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYyVfBbxBp2RfkKi0RQysjKWAKSNtyQa8&callback=GoogleMapService.initGoogleMapService"></script>
</head>
<%
Users users = (Users)session.getAttribute("users");

%>
<body>
	<style>
html, body {
	margin: 0;
	padding: 0;
}

#map {
	height: 500px;
	width: 700px;
	float: left;
	border: black solid 1px;
}

.top {
	top: left;
	border: black solid 1px;
}

.left {
	clear: auto;
	float: left
}

.right {
	float: left;
	text-align: left;
	border: black solid 1px;
}
</style>
<input type="hidden" id="userCity" value="<%=users.getCity() %>" />

	<div class="top">
		<input id="txt_address" type="text" value="Cairo, EG"><input
			id="btn_locate" type="button" value="Locate"><br>
		<input id="txt_originAddress" type="text" value="Cairo, EG"><input
			id="txt_destinationAddress" type="text" value="Alexandria, EG"><input
			id="btn_findRoute" type="button" value="Find Route">
	</div>
	<div id="map"></div>

	<div class="right">ali abo ali</div>

<INPUT type="button" onclick="getALLUserList();" value="getUser" />

</body>
</html>
