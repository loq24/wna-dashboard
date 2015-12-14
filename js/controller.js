(function(){
  var app = angular.module('wna-controllers',['ngSanitize']);
  //Sanitize Filter
  app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
  }]);

  //main controller
  app.controller('MainCtrl',function($scope,$rootScope, $http){

  });
  //select page controller
  app.controller('SelectCtrl',function($scope, $http, $location, $rootScope){
    //get all the sites the user has access to
    var user = sessionStorage.user;
    console.log(sessionStorage.access_token);
    console.log(user);
    $scope.sites = [];
    $http.get('https://whatnowatlanta.com/wp-json/user-site-list/v2/user/'+user).success(function(data){
      $scope.sites = data;
    }).error(function(data) {
        $location.path("/login");
    });
    //go to dashboard after selecting website
    $scope.gotoDashboard = function(value){
      sessionStorage.site_id = value.userblog_id;
      sessionStorage.siteurl = value.siteurl;
      $location.path("/dashboard");
    }

  });
  //dashbaord controller
  app.controller('EditBusinessProfileCtrl',function($scope,$rootScope, $http){
      //get selected site data
      var siteurl = sessionStorage.siteurl;
      var site_id = sessionStorage.site_id;
      $http.get(siteurl+'/wp-json/wna-pp/v2/details').success(function(data){
        $scope.bpformdata = data[""];
        console.log($scope.bpformdata);
      }).error(function(data) {
          $location.path("/login");
      });

      //process edit profile form on submit
      $scope.process_bpForm = function(){
        alert("asd");
        console.log($scope.bpformdata);
      };

      //tabs
      $scope.tab = 1;
      $scope.selectTab = function(setTab){
        $scope.tab = setTab;
      };
      $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
      };

      //dynamically add row
      $scope.addPSRow = function(){
        $scope.bpformdata.primary_services.push({ service_title: "", service_description: "" });
      };
      $scope.addBARow = function(){
        $scope.bpformdata.business_addresses.push({ address: "", latitude: "", longitude: "" });
      };

      //remove row
      $scope.removePSItem = function(index){
        $scope.bpformdata.primary_services.splice(index,1);
      };
      $scope.removeBAItem = function(index){
        $scope.bpformdata.business_addresses.splice(index,1);
      };
  });
  //sidebar controller
  app.controller('SidebarCtrl',function($scope,$rootScope, $http, $location){
      var user = sessionStorage.user;
      //query the data regarding the login user
      $scope.userdetails = [];
      $http.get('https://whatnowatlanta.com/wp-json/wp/v2/users/'+user).success(function(data){
        $scope.userdetails = data;
      }).error(function(data) {
          $location.path("/login");
      });
      //open and close settings box
      $scope.openandclose = "";
      $scope.opensettingsbox = function(){
        if($scope.openandclose == ""){
          $scope.openandclose = "open";
        }
        else{
          $scope.openandclose = "";
        }
      }

  });

})();
