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
                   
    });
function appendCommentBox(postid){

	var htmlcode='<input type="text" placeholder="Your comments" class="form-control title-post" name="comments_'+postid+'" id="comments_'+postid+'" /><br>'+
	'<input type="button" value="Comment" class="comment-post btn btn-default" data-comment-postid="'+postid+'" />';
	return htmlcode;

}
function appendExistingComments(postid){
	//
	$("#comentContainer_"+postid).empty();
	var htmlcode="<div class='detailBox'>" +appendCommentBox(postid)+
	"<div class='titleBox'> " +
	"<button type='button' class='close' aria-hidden='true'>&times;</button> " +
	"</div> " +
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
