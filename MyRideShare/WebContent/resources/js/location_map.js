/**
 * 
 */
function getALLUserList(){
	alert("Come");
	$.ajax({
        url:'LocationController',
        type:'get',
        dataType: 'json',
        success: function(data) { 
        	console.log(data);
        }
        
    });
	
}