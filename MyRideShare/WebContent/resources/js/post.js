"use strict";

$(document).ready(function(){
	var intCounter=0;
	var tid = setInterval(mycode, 5000);
	function mycode() {
		var posttype= $('input[name="posttype"]:checked', '#ridepost').val();
	  console.log("Printing after: "+intCounter++);
	  console.log("posttype: "+posttype);
	  //checkNewPosts();
	}
	function abortTimer() { // to be called when you want to stop the timer
	  clearInterval(tid);
	}
	

	load25PostByType();


	var win = $(window);

	$(window).on('scroll', function()
	{
		   //console.log("Counter  from scroll   "+$("#postcounter").attr("data-counter"))
           //console.log("win "+win.height())
           //console.log("top "+win.scrollTop());
           //console.log("doc  "+$(document).height());
	       //+'<input type="hidden"  data-counter=''/>'
		
		
		if ($(document).height()-win.scrollTop()<= 1000) {
    		//var firstResult = $("#firstResult").val();
			//var maxResults = $("#maxResults").val();
			//console.log("first "+firstResult)
			//console.log("max "+maxResults)
			//console.log("Counter  from scroll   "+$("#postcounter").attr("data-counter"))//testing
			loadinfinitePostByType();
	
		}
	});
	
	
	
	//loadAll();
	$("input[name=posttype]:radio").change(function () {
		$("#profile").empty();
		load25PostByType();
	});
	
            $('#submit_post').click(function(){
                var post=$("#post").val();
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
                    					
                    					$("#profile").prepend('<div class="thumbnail thumbnail-post getId" data-postid="'+item.postid+'" id="post_'+item.postid+'" >'+             						
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
            									'<span class="fa fa-thumbs-o-up link-post active"></span>'+
            									'<a href="#" class="link-post active" role="button" data-like-postid="'+item.postid+'">Like</a>'+
            									'<span id="likeCount'+item.postid+'" >Count</span><span class="fa fa-comment link-post"></span>'+
            									'<a href="#" role="button" class="commentopenId" data-postid="'+item.postid+'">Comment</a>'+
            									'<span id="commentsCount'+item.postid+'" >Com Count</span>'+
            									'<span class="fa fa-reply link-post"></span>'+
            									'<a href="#" class="delete-post" role="button" data-del-postid="'+item.postid+'">Delete</a></div>'+
            									'<div id ="comentContainer_'+item.postid+'" >'+
            									'</div>'+
            									'</div></div>'
            								);
                    					
                    				
                    					var likeCount = getLikeCount(item.postid);
                        				getCommentsCount(item.postid);
                    				}
                    			}
                    			)
                    		}

                    	});
                    }
                    
                });
                return false;
            });// submit_post
            
            $(document).on( "click", ".link-post", function() {
            	var postid = $(this).attr("data-like-postid");
            	putLike(postid);
            	return false;
            });

            $(document).on( "click", ".commentopenId", function() { 
            	var postid = $(this).attr("data-postid");
            	appendCommentBox(postid)
            	appendExistingComments(postid);
            	
            	return false;
            });
            
            $(document).on( "click", ".comment-post", function() {
            	var postid = $(this).attr("data-comment-postid");
            	var comments = $("#comments_"+postid).val();
            	postComments(postid,comments);
            });
            
            $(document).on( "click", ".delete-post", function() {
            	var postid = $(this).attr("data-del-postid");
            	deletePost(postid)
            	return false;
            });
                   
    });

function checkNewPosts(){
	$.ajax({
        url:'postController',
        type:'get',
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

function deletePost(postid){
	//alert("Come");
	$.ajax({
        url:'postActivityController',
        type:'post',
        data:{postid:postid,cmd:"del"},
        dataType: 'json',
        success: function(data) { 
        	$("#post_"+postid).remove();
        	//getLikeCount(postid);
        }
        
    });
	//return this.count;
}


function getCommentsCount(postid){
	$.ajax({
        url:'commentsController',
        type:'get',
        data:{postid:postid},
        dataType: 'json',
        success: function(data) { 
        	$("#commentsCount"+postid).text(" "+data.length);
        }
        
    });
}


function putLike(postid){
	$.ajax({
        url:'likesController',
        type:'post',
        data:{postid:postid,cmd:"add"},
        dataType: 'json',
        success: function(data) { 
        	console.log(data);
        	getLikeCount(postid);
        }
        
    });
	//return this.count;
}

function appendCommentBox(postid){

	var htmlcode='<input type="text" placeholder="Your comments" class="form-control title-post" name="comments_'+postid+'" id="comments_'+postid+'" /><br>'+
	'<input type="button" value="Comment" class="comment-post btn btn-default" data-comment-postid="'+postid+'" />';
	return htmlcode;

}
function appendExistingComments(postid){
	//
	$("#comentContainer_"+postid).empty();
	var htmlcode="<div class='detailBox'>" +appendCommentBox(postid)+
	"<div class='commentBox'>" +
	"<div class='actionBox'>" +
	" <ul class='commentList_"+postid+"'>"
	$("#comentContainer_"+postid).append(htmlcode);
	
	$.ajax({
        url:'commentsController',
        type:'get',
        data:{postid:postid},
        dataType: 'json',
        success: function(data) { 
        	$.each( data, function( key, comment ) {
        		var uifill = " <li >" +
    			"  <div class='commentText'>" +
    			" <p class=''>"+comment.comment+"</p> <span class='date sub-text'>on "+moment(comment.dateupdated).format("DD-MM-YYYY HH:mm:ss")+"</span>" +
    			"  </div>" +
    			"    </li>" ;
        		$(".commentList_"+postid).append(uifill);//here
        	});

        }
        
    });
	
	var endHtml= "</ul>" +"</div>" ;
	$("#comentContainer_"+postid).append(endHtml);
	
}

function postComments(postid,comments){
	
	$.ajax({
        url:'commentsController',
        type:'post',
        data:{postid:postid,comments:comments},
        dataType: 'json',
        success: function(data) {
        	var uifill = " <li >" +
			"  <div class='commentText'>" +
			" <p class=''>"+data.comment+"</p> <span class='date sub-text'>on "+moment(data.dateupdated).format("DD-MM-YYYY HH:mm:ss")+"</span>" +
			"  </div>" +
			"    </li>" ;		
    		$(".commentList_"+postid).append(uifill);
        	console.log(data.comment);
        	console.log("#commentList_"+postid);
        	$("#comments_"+postid).val("");
        	getCommentsCount(postid);
        }
        
    });
	return false;
	
}

function load25PostByType(){
	var firstResult = $("#firstResult").val();
	var maxResults = $("#maxResults").val();
	firstResult = (firstResult==0)?0:firstResult;
	maxResults = (maxResults==0)?25:maxResults;
	var newval=(Number(firstResult)+Number(maxResults));
    console.log(firstResult+" : "+maxResults+", new firstResult "+ Number(newval));
    var posttype= $('input[name="posttype"]:checked', '#ridepost').val();
    var counter=0;
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
 
            				var user = objectFindByKey(data.users,"userid", item.userid);
            			
            				$("#profile").append('<div class="thumbnail thumbnail-post getId" data-postid="'+item.postid+'" id="post_'+item.postid+'" >'+             						
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
									'<span class="fa fa-thumbs-o-up link-post active"></span>'+
									'<a href="#" class="link-post active" role="button" data-like-postid="'+item.postid+'">Like</a>'+
									'<span id="likeCount'+item.postid+'" >Count</span><span class="fa fa-comment link-post"></span>'+
									'<a href="#" role="button" class="commentopenId" data-postid="'+item.postid+'">Comment</a>'+
									'<span id="commentsCount'+item.postid+'" >Com Count</span>'+
									'<span class="fa fa-reply link-post"></span>'+
									'<a href="#" class="delete-post" role="button" data-del-postid="'+item.postid+'">Delete</a></div>'+
									'<div id ="comentContainer_'+item.postid+'" >'+
									'</div>'+
									'</div></div>'
									
									
								);
            				$("#postcounter").attr("data-counter",counter++);//to getcounter for posts
            				
            				var likeCount = getLikeCount(item.postid);
            				getCommentsCount(item.postid);
            				
            				
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
        data:{postid:postid},
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


//test
function loadinfinitePostByType(){
	var firstResult =parseInt( $("#postcounter").attr("data-counter"));
	var maxResults = firstResult+5;
	firstResult = (firstResult==0)?0:firstResult;
	maxResults = (maxResults==0)?25:maxResults;
	var newval=(Number(firstResult)+Number(maxResults));
    console.log(firstResult+" : "+maxResults+", new firstResult "+ Number(newval));
    var posttype= $('input[name="posttype"]:checked', '#ridepost').val();
    var counter=firstResult;
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
 
            				var user = objectFindByKey(data.users,"userid", item.userid);
            			
            				$("#profile").append('<div class="thumbnail thumbnail-post getId" data-postid="'+item.postid+'" id="post_'+item.postid+'" >'+             						
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
									'<span class="fa fa-thumbs-o-up link-post active"></span>'+
									'<a href="#" class="link-post active" role="button" data-like-postid="'+item.postid+'">Like</a>'+
									'<span id="likeCount'+item.postid+'" >Count</span><span class="fa fa-comment link-post"></span>'+
									'<a href="#" role="button" class="commentopenId" data-postid="'+item.postid+'">Comment</a>'+
									'<span id="commentsCount'+item.postid+'" >Com Count</span>'+
									'<span class="fa fa-reply link-post"></span>'+
									'<a href="#" class="delete-post" role="button" data-del-postid="'+item.postid+'">Delete</a></div>'+
									'<div id ="comentContainer_'+item.postid+'" >'+
									'</div>'+
									'</div></div>'
								);

            				var likeCount = getLikeCount(item.postid);
            				getCommentsCount(item.postid);
            				
                			$("#postcounter").attr("data-counter",counter++);
            			})
            		}
            	});
            
        }
        
    });
}









