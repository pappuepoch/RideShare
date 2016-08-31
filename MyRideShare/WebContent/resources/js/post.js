"use strict";

$(document).ready(function(){ 
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
                    							'<p>'+item.post+'</p><p>'+item.posttype+'</div>'+
                    							'<div class="links-post">'+
                    							'<span class="fa fa-thumbs-o-up link-post active"></span><a href="#"	class="link-post active" role="button">Like</a> <span class="fa fa-comment link-post"></span><a href="#" class="link-post" role="button">Comment</a> <span	class="fa fa-reply link-post"></span><a href="#" class="link-post" role="button">Share</a></div></div></div>'
                    					);

                    				}
                    			}
                    			)
                    		}

                    	});
                    }
                    
                });
                return false;
            });// getComments

           
    });
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
