"use strict";

$(document).ready(function(){
	var count=20;
	load25PostByType();
	//loadAll();
	$("input[name=posttype]:radio").change(function () {
		$("#profile").empty();
		load25PostByType();
	});
	
            $('#submit_post').click(function(){
                var post=$("#post").val();
                //alert($('input[name="posttype"]:checked', '#ridepost').val());
                var posttype= $('input[name="posttype"]:checked', '#ridepost').val();
                $.ajax({
                    url:'postController',
                    type:'post',
                    data:{post:post,posttype:posttype},
                    dataType: 'json',
                    success: function(data) {
                    	//$("#profile").empty(); 
                    	$("#post").val("");
                    	$.each( data, function( key, value ) {
                    		if(key=="posts"){
                    			$.each(value, function(index, item){
                    				if(index==0){
                    					//console.log(item);
                    					var user = objectFindByKey(data.users,"userid", item.userid);
                    					//console.log(user);

                    					$("#profile").prepend('<div class="thumbnail thumbnail-post">'+            						
                    							'<div class="caption">'+
                    							'<div class="media">'+
                    							'<div class="media-left">'+
                    							'<a href="#" class="image-post"> <img data-src="resources/js/holder.js/50x50?theme=social"></a></div>'+
                    							'<div class="media-body">'+
                    							'<a class="media-heading title-post" href="#">'+user.fullname+'</a>'+
                    							'<h5 class="time-post">'+moment(item.dateupdated).format("DD-MM-YYYY HH:mm:ss")+'</h5>'+
                    							'</div></div>'+			
                    							'<p>'+item.post+'</p><p>'+'</div>'+
                    							'<div class="links-post">'+
                    							'<span class="fa fa-thumbs-o-up link-post active"></span><a href="#"	class="link-post active" role="button">Like</a> <span class="fa fa-comment link-post"></span>'+
                    							'<a href="#" class="link-post" role="button">Comment</a> <span	class="fa fa-reply link-post"></span>'+
                    							'<a href="#" class="link-post" role="button">Delete</a></div></div></div>'
                    					);

                    				}
                    			}
                    			)
                    		}

                    	});
                    }
                    
                });
                return false;
            });// submit_post
            

            $(document).on( "click", ".commentopenId", function() {
            	//alert("Cone");
            	//var oneClick=true;
       
            	var postid = $(this).attr("data-postid");
            	appendExistingComments(postid);
            	//if (oneClick){
            	//$("#comentContainer_"+postid).toggle(function () {appendCommentBox(postid)});
            	//}
            	//console.log(this);
            	//console.log(postid);
            	//var postId= $(".getId").attr("tabindex");
            	//alert(postid);
            	return false;
            });
            
            $(document).on( "click", ".comment-post", function() {
            	var postid = $(this).attr("data-comment-postid");
            	var comments = $("#comments_"+postid).val();
            	postComments(postid,comments);
            	//appendCommentBox(postid);
            	//console.log(comments);
            	//console.log(postid);
            	//var postId= $(".getId").attr("tabindex");
            	//alert(comments);
            	return false;
            });
            
            /*$("#commentopenId").click(function(){
            	alert("Cone");
            	var htmlcode='<textarea rows="4" cols="90%" class="media-heading title-post" name="post" id="post">ggg</textarea>';	
            	
            	$("#comentContainer").append(htmlcode)
            });*/
           
    });
function appendCommentBox(postid){
//	var htmlcode='<textarea rows="4" cols="90%" class="media-heading title-post" name="comments_'+postid+'" id="comments_'+postid+'" ></textarea><br>'+
//	'<input type="button" value="Comment" class="comment-post" data-comment-postid="'+postid+'" />';
//	$("#comentContainer_"+postid).append(htmlcode);
//	//$("#comentContainer_"+postid).append();
	
	//oneClick=false;
	
	/*var htmlcode="<div class='detailBox'>" +
			" <div class='titleBox'> " +
			"<label>Comment Box</label> "+
			"<button type='button' class='close' aria-hidden='true'>&times;</button> " +
			"</div> <div class='commentBox'>" +
			" <a id='view'>view All comments </a>" +
			"</div>" +
			"<div class='actionBox'>" +
			" <ul class='commentList'>" +
			" <li>" +
			"  <div class='commentText'>" +
			" <p class=''>Hello this is a test comment.</p> <span class='date sub-text'>on March 5th, 2014</span>" +
			"  </div>" +
			"    </li>" +
			"   </ul>" +
			"   <form class='form-inline' role='form'>" +
			"<div class='form-group'>" +
			" <input class='form-control' type='text' placeholder=''Your comments' />" +
			" </div>" +
			" <div class='form-group'>" +
			"  <button class='btn btn-default'>Add</button>" +
			" </div>" +
			" </form>" +
			" </div>" +
			"</div>";*/
	
	$("#comentContainer_"+postid).append(htmlcode);

}
function appendExistingComments(postid){
	$("#comentContainer_"+postid).empty();
	var htmlcode="<div class='detailBox'>" +
	" <div class='titleBox'> " +
	"<label>Comment Box</label> "+
	"<button type='button' class='close' aria-hidden='true'>&times;</button> " +
	"</div> <div class='commentBox'>" +
	" <a id='view'>view All comments </a>" +
	"</div>" +
	"<div class='actionBox'>" +
	" <ul class='commentList'>" +
	$("#comentContainer_"+postid).append(htmlcode);
	
	$.ajax({
        url:'commentsController',
        type:'get',
        data:{postid:postid},
        dataType: 'json',
        success: function(data) { 
        	$.each( data, function( key, comment ) {
        		var ui = " <li>" +
    			"  <div class='commentText'>" +
    			" <p class=''>"+comment.comment+"</p> <span class='date sub-text'>on "+moment(comment.dateupdated).format("DD-MM-YYYY HH:mm:ss")+"</span>" +
    			"  </div>" +
    			"    </li>" +
    			"   </ul>" ;
        		
        		$("#comentContainer_"+postid).append(ui);
        		//$("#comentContainer_"+postid).prepend(comment.comment);
        		//$("#comentContainer_"+postid).prepend(comment.dateupdated);
        	});
        	console.log(data);
        	//return data.likeCount;
        }
        
    });
	
	var endHtml= "</ul>" +"</div>" +"</div>";
	$("#comentContainer_"+postid).append(endHtml);
	
}

function postComments(postid,comments){
	
	$.ajax({
        url:'commentsController',
        type:'post',
        data:{postid:postid,comments:comments},
        dataType: 'json',
        success: function(data) { 
        	//this.count = data.likeCount;
        	//$("#comentContainer_"+postid).append(htmlcode);
        	
        	//console.log(data.likeCount);
        	console.log(data);
        	//return data.likeCount;
        }
        
    });
	
}

function load25PostByType(){
	var firstResult = $("#firstResult").val();
	var maxResults = $("#maxResults").val();
	firstResult = (firstResult==0)?0:firstResult;
	maxResults = (maxResults==0)?25:maxResults;
	var newval=(Number(firstResult)+Number(maxResults));
    console.log(firstResult+" : "+maxResults+", new firstResult "+ Number(newval));
    var posttype= $('input[name="posttype"]:checked', '#ridepost').val();
//    $("input[id=firstResult]").val(Number(newval))
    
	$.ajax({
        url:'postActivityController',
        type:'get',
        data:{maxResults:maxResults,firstResult:firstResult,posttype:posttype},
        dataType: 'json',
        success: function(data) { 
        	$("#post").val("");
            $.each( data, function( key, value ) {
            		if(key=="posts"){
            			$.each(value, function(index, item){
            				//console.log(item);
            				var user = objectFindByKey(data.users,"userid", item.userid);
            				//console.log(user);
            				//var likeCount = getLikeCount(item.postid);
            				//console.log(likeCount);
            				$("#profile").append('<div class="thumbnail thumbnail-post getId" data-postid="'+item.postid+'" >'+            						
            						'<div class="caption">'+
            							'<div class="media">'+
            								'<div class="media-left">'+
            									'<a href="#" class="image-post"> <img data-src="resources/js/holder.js/50x50?theme=social"></a></div>'+
            								'<div class="media-body">'+
            									'<a class="media-heading title-post" href="#">'+user.fullname+'</a>'+
            						'<h5 class="time-post">'+moment(item.dateupdated).format("DD-MM-YYYY HH:mm:ss")+'</h5>'+
            						'</div></div>'+			
									'<p>'+item.post+'</p><p></div>'+
									'<div class="links-post">'+
									'<span class="fa fa-thumbs-o-up link-post active"></span><a href="#"	class="link-post active" role="button">Like</a> <span id="likeCount'+item.postid+'" >Count</span><span class="fa fa-comment link-post"></span>'+
									'<a href="javasctipt:" role="button" class="commentopenId" data-postid="'+item.postid+'">Comment</a> <span class="fa fa-reply link-post"></span>'+
									'<a href="#" class="link-post" role="button">Delete</a></div>'+
									'<div id ="comentContainer_'+item.postid+'" >'+
									
									'</div>'+
									'</div></div>'
								);

            				var likeCount = getLikeCount(item.postid);
            			})
            		}
            	});
            
        }
        
    });
}



function getLikeCount(postid){
	$.ajax({
        url:'likesController',
        type:'get',
        datda:{postid:postid},
        dataType: 'json',
        success: function(data) { 
        	this.count = data.likeCount;
        	$("#likeCount"+postid).text(" "+data.likeCount);
        	//console.log(data.likeCount);
        	console.log(this.count);
        	//return data.likeCount;
        }
        
    });
	//return this.count;
}

function loadAll(){
	$.ajax({
        url:'postActivityController',
        type:'get',
        dataType: 'json',
        success: function(data) { 
        	$("#post").val("");
            $.each( data, function( key, value ) {
            		if(key=="posts"){
            			$.each(value, function(index, item){
            				//console.log(item);
            				var user = objectFindByKey(data.users,"userid", item.userid);
            				//console.log(user);
            				
            				$("#profile").append('<div class="thumbnail thumbnail-post">'+            						
            						'<div class="caption">'+
            							'<div class="media">'+
            								'<div class="media-left">'+
            									'<a href="#" class="image-post"> <img data-src="resources/js/holder.js/50x50?theme=social"></a></div>'+
            								'<div class="media-body">'+
            									'<a class="media-heading title-post" href="#">'+user.fullname+'</a>'+
            						'<h5 class="time-post">'+moment(item.dateupdated).format("DD-MM-YYYY HH:mm:ss")+'</h5>'+
            						'</div></div>'+			
            						'<p>'+item.post+'</p><p>'+item.posttype+'</div>'+
									'<div class="links-post">'+
									'<span class="fa fa-thumbs-o-up link-post active"></span><a href="#"	class="link-post active" role="button">Like</a> <span class="fa fa-comment link-post"></span><a href="#" class="link-post" role="button">Comment</a> <span	class="fa fa-reply link-post"></span><a href="#" class="link-post" role="button">Share</a></div></div></div>'
								);

            			})
            		}
            	});
        }
        
    });
}

function objectFindByKey(jsonObj, searchField, searchVal) {
    var results = [];
    for (var i=0 ; i < jsonObj.length ; i++)
    {
        if (jsonObj[i][searchField] == searchVal) {
            results.push(jsonObj[i]);
        }
    }
    return results[0];
}
