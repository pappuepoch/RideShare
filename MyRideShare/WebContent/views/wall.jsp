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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="resources/js/post.js"></script>
<script type="text/javascript" src="resources/js/moment.js"></script>

</head>
<body>
	<jsp:include page="/views/fragments/wallControl.jsp"></jsp:include>
	<input type="hidden" id="maxResults" value=5 >
	<input type="hidden" id="firstResult" value=0>
	<!--timeline-->
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
					<FORM action="" id="ridepost">
						<textarea rows="4" cols="90%" class="media-heading title-post" name="post" id="post">
						</textarea><br>
						<input type="radio" name="posttype" value="1" checked> Post a Ride
				  		<input type="radio" name="posttype" value="2"> Get a Ride
				  	</FORM>
					</div>
				</div>
			</div>
			<!--#caption-->
			<div class="">
				<span class="">
					<input type="Submit" id="submit_post" value="Post" class="link-post"/>
				</span>
			</div>
		</div>
		<!--#post timeline-->
		<!--post Timeline-->
		<div id="profile">
			
        </div>
		
		<!--#post timeline-->
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
