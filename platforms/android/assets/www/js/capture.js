var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      console.log("imageData:%s",imageData);
      // Get image handle
      var smallImage = document.getElementById('smallImage');
      // Unhide image elements
      smallImage.style.display = 'block';
      if ( $('#woNumber')[0].selectedIndex != 0 ) {
        $('.btnupload').prop('disabled',false);
      }
        // Show the captured photo
      // The in-line CSS rules are used to resize the image
      smallImage.src = "data:image/jpeg;base64," + imageData;
      /****************************************************/
      // create blob object from the base64-encoded image data
      blob = dataURItoBlob(smallImage.src);
      //var fd = new FormData(document.forms[0]);
      console.log('blob in capture.js:',blob);

      
            //formData.append('file', blob);
            /* This code is for testing
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
                      alert('Success - Uploaded');       
                      $('#loading').hide();
                      $("#message").html(data);
                      },
                      error: function(data){
                        console.log('fail to upload');
                      }
                  }); 
              */      
/****************************************************/

    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
       console.log('imageURI:%s',imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;

    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }


    //*****************MB Custom ****************************************
    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }


    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccessCustom(imageData) {
      // Uncomment to view the base64-encoded image data
      console.log("imageData in custom:%s",imageData);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';
      if ( $('#woNumber')[0].selectedIndex != 0 ) {
        $('.btnupload').prop('disabled',false);
      }
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      largeImage.src = "data:image/jpeg;base64," + imageData;
      /****************************************************/
      // create blob object from the base64-encoded image data
      blob = dataURItoBlob(largeImage.src);
      //var fd = new FormData(document.forms[0]);
      console.log('blob in capture.js:',blob);


      //var zFile = new Blob([imageData],  {type: 'image/jpeg'});
      //console.log("zFile:",zFile);

    }    

    function getPhotoCustom(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessCustom, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source });
    }

    //this function will convert a dataURI to a Blob:
    function dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
}