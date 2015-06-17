var blob;  //Global variable blob
$(function() {
    $( "#date" ).datepicker();
});
jQuery(document).ready(function() {

	$('.btnupload').prop('disabled',true);
	$('#dialog').css('display','none');

	var formData = new FormData();
	
	$('.btngallery').on('click',function(e){
		//e.preventDefault();
		getPhotoCustom(pictureSource.PHOTOLIBRARY);

	});
	$('.filebtn').click(function(){
	   	if ($('#woNumber')[0].selectedIndex == 0 ) {
			$('.btnupload').prop('disabled',true);
		}
		else {
			$('.btnupload').prop('disabled',false);
		}
	});
	var authHash = 'bWFuYWJzaHlAZ21haWwuY29tOk9ubGluZTU3NTk=';
	var  url = "http://10.0.2.2:9090/rest/api/2/search?jql=project='WO'+order+by+duedate&fields=key,summary";
    var result;
    var keys = [];
    var options = $("#woNumber");	
	

	$.ajax({

	    beforeSend: function (xhr) {
	        xhr.setRequestHeader("Authorization", "Basic " + authHash);
	    },

	    url:url,
		type: "GET",				
	    dataType: "json",
	    contentType: "application/json",
	    async: false,
	    success: function (responseText) {
        
            var result;
            var keys = [];
            var options = $("#woNumber");
            for( var i = 0, len = responseText['issues'].length; i < len; i++ ) {
                  //console.log(responseText['issues'][i]['key']);
                  keys.push(responseText['issues'][i]['key']);
            }
			$.each(keys, function(index,event) {
			    //console.log(keys[5]);
			    options.append($("<option />").text(keys[index]));
			});
	    },
	    	
	    error: function(response) {

	    	alert('Error !!!');

	    }
	});
	$('#woNumber').on("change",function(){
	
	  console.log('changed:%s',keys);
	  var updurl = 'http://10.0.2.2:9090/rest/api/2/search?jql=issue=' + $(this).val() + '&fields=key,summary,description,email,issuetype,assignee';
	  console.log(updurl);
	  if ($('#largeImage').attr('src') != '' && $(this)[0].selectedIndex != 0 ) {
	  	$('.btnupload').prop('disabled',false);
	  }
	  else if ($('#smallImage').attr('src') != '' && $(this)[0].selectedIndex != 0 ) {
	  	$('.btnupload').prop('disabled',false);
	  }
	  else {
	  	$('.btnupload').prop('disabled',true);
	  }
	  if ( $(this)[0].selectedIndex != 0 ) {
  
			$.ajax({
			    beforeSend: function (xhr) {
			        xhr.setRequestHeader("Authorization", "Basic " + authHash);
			    },
			    url:updurl,
				type: "GET",			
			    dataType: "json",
			    contentType: "application/json",
			    async: false,
			    success: function (responseText) {
			    	console.log("issue Key:%s" , responseText['issues'][0]['fields'].summary );
			    	$('#issueType').val(responseText['issues'][0]['fields'].issuetype.name);
			    	$('#issueDescription').val(responseText['issues'][0]['fields'].issuetype.description);
			    	$('#operation').val(responseText['issues'][0]['fields'].summary);
			    	$('#impact').val(responseText['issues'][0]['fields'].description);

			    	
		        	//$('#email').val(responseText['issues'][0]['fields'].assignee.emailAddress);
		        	
			    },
			    	
			    error: function(response) {
			    	console.log(response.responseText['expand']);
			    	alert("Error");
			    }
			});
		}
	
	});
   
	$('#vendorId option:first').text('Please select one');
	$('.tab-content').css('display','none');
	$('.btn.btnupload').on('click',function(){

			console.log('blob in main.js:',blob);
			//From here, appending the blob data to a form such that it will be uploaded as a file is easy:
		    formData.append('file', blob);

		var attachUrl = 'http://10.0.2.2:9090/rest/api/2/issue/' + $('#woNumber option:selected').val() + '/attachments'
	   	$.ajax({

	   			beforeSend: function(xhr){xhr.setRequestHeader("X-Atlassian-Token", "no-check");},
				url: attachUrl , // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,     // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				success: function(data)   // A function to be called if request succeeds
				{
				console.log('uploaded to jira');					
	                  $( "#dialog").text('Uploaded to Jira:' + data[0].id);	
	                  $( "#dialog" ).dialog();
	                  /* Reset the options */

	                  $('#smallImage').css('display','none');
	                  $('#smallImage').attr('src','');
	                  $('#largeImage').css('display','none');
	                  $('#largeImage').attr('src','');
	                  $('.btnupload').prop('disabled',true);
				},
				error: function(data){
					console.log('fail to upload');
	                  $( "#dialog").text('upload Failed!');	
	                  $( "#dialog" ).dialog();

				}
		});		
	});

});












