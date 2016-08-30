<%@page import="java.util.List"%>
<%@page import="com.rideshare.model.Posts"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix='ctg' uri='/WEB-INF/custom_tag.tld'%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>User Post</title>

</head>
<body>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){ 
            $('#getComments').click(function(){
                var postid=$("#postid").val();
                $.ajax({
                    url:'commentsController',
                    type:'get',
                    data:{postid:postid},
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                    }
                    
                });
                return false;
            });// getComments

            $('#likeCountPostId').click(function(){
                var postid=$("#postid").val();
                //alert(postid);
                $.ajax({
                    url:'likesController',
                    type:'get',
                    data:{postid:postid},
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                    }
                    
                });
                return false;
            });//likeCountPostId
            
    });
</script>
<%
List<Posts> posts = (List)request.getAttribute("posts");
if(posts==null){
	response.setHeader("Location", "posts.jsp"); 
}
%>

	<p>this is user post</p>

	<c:forEach var="post" items="${posts}"	varStatus="loopCounter">
		------------------  <c:out value="count: ${loopCounter.count}" /> ---------------------------<br><br>
		Post Id: <c:out value="${post.getPostid()}" /><br>
		Post Type :<c:out value="${post.getPosttype()}" /><br><br>
		Post :<c:out value="${post.getPost()}" /><br>
		Post Time: <c:out value="${post.getDateupdated()}" /><br>
		Post By:<c:out value="${post.getUserid()}" /><br><br>
		<form action="postActivityController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			<input type="hidden" name="cmd" value="del">
			<input type="submit" value="Delete Post" />
		</form>
		<form action="likesController" method="get" >
			<input type="hidden" id="likeCountPostId" name="postid" value="${post.getPostid()}">
			<input type="submit" value="Likes Count" />
		</form>
		<form action="likesController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			<input type="hidden" name="cmd" value="add">
			<input type="submit" value="Likes" />
		</form>
		<form action="likesController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			<input type="hidden" name="cmd" value="del">
			<input type="submit" value="Dislikes" />
		</form>
		<form action="commentsController" method="get" >
			<input type="hidden" id="postid" name="postid" value="${post.getPostid()}">
			<input type="submit" id="getComments" value="View Comments" />
		</form>
		<form action="commentsController" method="post" >
			<input type="hidden" name="postid" value="${post.getPostid()}">
			Comments : <ctg:textInput name="comments"  size="30" /><br>
			<input type="submit" value="Post Comment" />
		</form>
		
	</c:forEach>

</body>
</html>