<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
<%@include file="/includes/base_config.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Car Pooling</title>

<!-- Bootstrap -->
<link href="resources/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/font-awesome.min.css" rel="stylesheet">
<link href="resources/css/style.css" rel="stylesheet">
<link href="resources/css/wall.css" rel="stylesheet">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="resources/js/googlemapsService.js" type="text/javascript"></script>
<script src="resources/js/GoogleMapsPostFacade.js"
	type="text/javascript"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYyVfBbxBp2RfkKi0RQysjKWAKSNtyQa8&libraries=places&callback=GoogleMapServiceFacade.initGoogleMapServiceFacade"></script>
</head>
<body>
<style>
/*         html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        } */

        #map {
            height: 50%;
            width:100%;
        }
    </style>
	<jsp:include page="/views/fragments/wallControl.jsp"></jsp:include>
	<input type="hidden" id="maxResults" value=2>
	<input type="hidden" id="firstResult" value=0> <!--timeline-->
	<section class="timeline col-sm-9">
		<!--post Timeline-->
		<div class="thumbnail thumbnail-post">
			<!--caption-->
			<div class="caption">
				<div class="media">
					<div class="media-left">
						<a href="#" class="image-post"> <img
							data-src="resources/js/holder.js/50x50?theme=social"></a>
					</div>
					<div class="media-body">
						<ctg:currentDateTime color="blue" size="15" />
						<form action="" id="ridepost">
							<textarea rows="4" cols="90%" class="media-heading title-post"
								name="post" id="post">
						</textarea>
							<br>
							<input type="radio" name="posttype" value="1" checked /> Post a
							Ride <input type="radio" name="posttype" value="2" /> Get a Ride
							<input type="hidden" id="originAddressLatitude"/>
							<input type="hidden" id="originAddressLongitude"  />
							<input type="hidden" id="destinationAddressLatitude"  />
							<input type="hidden" id="destinationAddressLongitude" /></br>
							<input type="submit" value="Save"/>
						</form>


					</div>
				</div>
			</div>

		</div>
		
  <div >
		<input id="txt_originAddress" type="text"
               placeholder="Enter an origin location">

        <input id="txt_destinationAddress" type="text"
               placeholder="Enter a destination location">

        <input id="btn_findRoute" type="button" value="Find Route">


	</div>
	<div class="caption">
		<div id="map"> </div>
		</div>
		

		<div id="profile"></div>

	</section>
	<!--#timeline-->
	</div>
	<!--#container-->
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/holder.js"></script>
</body>
</html>
