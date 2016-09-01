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
<script src="resources/js/GoogleMapsAllTripsServiceFacade.js" type="text/javascript"></script>
 <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYyVfBbxBp2RfkKi0RQysjKWAKSNtyQa8&libraries=places&callback=GoogleMapServiceFacade.initGoogleMapServiceFacade"></script>
<!-- <link href="resources/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/font-awesome.min.css" rel="stylesheet">
<link href="resources/css/style.css" rel="stylesheet">
<link href="resources/css/wall.css" rel="stylesheet"> -->
</head>

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




	<div id="map"></div>

</body>
</html>
