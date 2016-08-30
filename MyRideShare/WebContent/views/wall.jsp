<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
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


  </head>
  <body>
     <jsp:include page="/views/fragments/wallControl.jsp"></jsp:include>
        
        <!--timeline-->
        <section class="timeline col-sm-9">
        <!--post Timeline-->
        <div class="thumbnail thumbnail-post">
            <!--caption-->
            <div class="caption">
                <div class="media">
                  <div class="media-left">
                    <a href="#" class="image-post">
                     <img data-src="resources/js/holder.js/50x50?theme=social">
                    </a>
                  </div>
                  <div class="media-body">
                    <a class="media-heading title-post" href="#">Your Comment Title</a>
                    <h5 class="time-post">3 minutes ago</h5>
                  </div>
                </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sit doloremque numquam vitae saepe, sed perferendis inventore nesciunt facere tenetur pariatur deleniti, nihil quos quidem enim molestias est. Magnam, impedit!</p>
            </div><!--#caption-->
            <div class="links-post">
                <span class="fa fa-thumbs-o-up link-post"></span><a href="#" class="link-post" role="button">Like</a> 
                <span class="fa fa-comment link-post"></span><a href="#" class="link-post" role="button">Comment</a> 
                <span class="fa fa-reply link-post"></span><a href="#" class="link-post" role="button">Share</a> 
            </div>
        </div>
        <!--#post timeline-->
        <!--post Timeline-->
        <div class="thumbnail thumbnail-post">
            <!--caption-->
            <div class="caption">
                <div class="media">
                  <div class="media-left">
                    <a href="#" class="image-post">
                     <img data-src="resources/js/holder.js/50x50?theme=social">
                    </a>
                  </div>
                  <div class="media-body">
                    <a class="media-heading title-post" href="#">Owner Comments</a>
                    <h5 class="time-post">Timer for  Post</h5>
                  </div>
                </div>
               <p>retrive posts  depends decending</p>
            </div><!--#caption-->
            <div class="links-post">
                <span class="fa fa-thumbs-o-up link-post active"></span><a href="#" class="link-post active" role="button">Like</a> 
                <span class="fa fa-comment link-post"></span><a href="#" class="link-post" role="button">Comment</a> 
                <span class="fa fa-reply link-post"></span><a href="#" class="link-post" role="button">Share</a> 
            </div>
        </div>
        <!--#post timeline-->
      </section>
      <!--#timeline-->
    </div><!--#container-->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="resources/js/bootstrap.min.js"></script>
    <script src="resources/js/holder.js"></script>
  </body>
</html>
