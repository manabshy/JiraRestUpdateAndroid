
       
        var formApp = angular.module('formApp', []);

        // create angular controller and pass in $scope and $http
        function formController($scope, $http) {
         
          // create a blank object to hold our form information
          // $scope will allow this to pass between controller and view

            $scope.formData = {};
            // when submitting the add form, send the text to the node API        

            $scope.createWordOrder= function(form) {

              var url = 'http://10.0.2.2:9090/rest/api/2/issue/' + $('#woNumber option:selected').val() + '/';

              console.log('url to post:%s',url);

              var postData = 
                  {
                      "fields": {
                         "project":
                         { 
                            "key": "WO"
                         },
                         "summary": $('#operation').val(),
                         "description": $('#impact').val(),
                         "issuetype": {
                            "name": "Bug"
                         },

                          "assignee": {

                          "name": $('#email').val()

                          }
                     }
                  };
                var parameters = JSON.stringify(postData);
                var authHash = 'bWFuYWJzaHlAZ21haWwuY29tOk9ubGluZTU3NTk=';  
                $.ajax({

                  url:url,
                  type: "PUT",
                  data: parameters,
                  
                  beforeSend: function(xhr){
                  
                  xhr.setRequestHeader('Authorization', 'basic: ' + authHash );

                  },
                  
                    dataType: "json",
                    contentType: "application/json",
                    async: false,
                    success: function (issuedata) {
                      $(function() {
                          $( "#dialog" ).dialog();
                      });

                    },
                    error: function(response) {
                      console.log(response.responseText);
                      alert("Error");
                    }
                });

            };
            $scope.reset=function(form){
              if (form) {
                console.log('reset form is valid');
                form.$setPristine();
                $scope.formData = {};

                //form.$setUntouched();
              }
              $scope.formData = angular.copy($scope.formData);
              $('#dialog').css("display","none");
                    
            };    
        }
        
    