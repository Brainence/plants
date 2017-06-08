 var templateApp = angular.module("plantsApp", []);

     templateApp.controller("PlantsCtrl", [ '$scope', function($scope) {
       
         $.getJSON( "data/plants.json", function( data ) {
             $scope.plants = data;
             $scope.$apply();
             console.log($scope.plants);
             });
         
         /*$scope.plants = [ {id : "plant1", name : "Plant1", details : "Details1", irrigationPeriod : "1 day", image : "http://f.tqn.com/y/biology/1/W/e/e/183248784.jpg"}, 
         {id : "plant2", name : "Plant2", details : "Details2", irrigationPeriod : "2 day", image : "http://f.tqn.com/y/biology/1/W/e/e/183248784.jpg"}, 
         {id : "plant3", name : "Plant3", details : "Details3", irrigationPeriod : "3 day", image : "http://f.tqn.com/y/biology/1/W/e/e/183248784.jpg"} ];*/
         
         /*$.ajax({
             type: "GET",
             url: "../../data/plants.php",
             crossDomain: true,
             cache: false,
             success: function(result){
                 var result=$.parseJSON(result);
                 $scope.plants = result;
                 $scope.$apply();
             }
             });*/
                 
         $scope.DetailsPlant = function(plantId){
             for(i=0; i<$scope.plants.length; i++){
                 if($scope.plants[i].id == plantId){
                     $scope.seceltedPlant = { 
                         id: $scope.plants[i].id, 
                         name : $scope.plants[i].name, 
                         details: $scope.plants[i].details, 
                         irrigationPeriod : $scope.plants[i].irrigationPeriod, 
                         image : $scope.plants[i].image
                     }
                     $scope.$apply();
                     break;
                 }
             }
         };
         
         $scope.Pour = function(){
             alert("Done!");
         }
         
         $scope.ScanQR = function(){
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                  if(!result.cancelled){
                      var isFinding = false;
                      var res;
                      for(i=0; i<$scope.plants.length; i++){
                         if($scope.plants[i].id == result.text){
                             res = $scope.plants[i].id;
                             isFinding = true;
                             break;
                         }
                     }
                      if(isFinding == true) {
                          var r = confirm('Go to ' + result.text + '?');
                          if (r == true) {
                              $scope.DetailsPlant(res);
                              $.mobile.changePage("#page_details");
                              $("[data-role=panel]").panel("close");
                          }
                      }
                      else {
                          alert("Not found!");
                      }
                  }
              },
              function (error) {
                  alert("Scanning failed: " + error);
              },
              {
                  prompt : "Place a barcode inside the scan area", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true // iOS
              }
           );
         }
         
     } ]);