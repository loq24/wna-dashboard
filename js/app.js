(function(){
  var app = angular.module('wna',['wna-directives','wna-controllers','ui.router','ngStorage']);

  app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/dashboard/edit-business-profile");
    $stateProvider
    .state('dashboard', {
        abstract: true,
        url: "/dashboard",
        templateUrl: "views/common/content.html",

    })
      .state('dashboard.edit-business-profile', {
          url: "/edit-business-profile",
          templateUrl: "views/edit-business-profile.html",
          controller: "EditBusinessProfileCtrl",
          data: { pageTitle: 'Edit Business Profile' },
      })
    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        data: { pageTitle: 'Login' },
        controller: function ($http) {
          console.log(sessionStorage.access_token);
        }
    })
    .state('logout', {
        url: "/logout",
        template: "",
        controller: function($http,$location){
          console.log(sessionStorage.access_token);
          $http.get('https://whatnowatlanta.com/oauth/destroy?access_token='+sessionStorage.access_token).success(function(data){
             console.log(sessionStorage.access_token);
             delete sessionStorage.access_token;
             delete sessionStorage.user;
             delete sessionStorage.siteurl;
             delete sessionStorage.site_id;
              $location.path("/login");
          }).error(function(data) {
              $location.path("/login");
          });

        }
    })
    .state("accesstoken", {
      url: "/access_token=:accessToken",
      template: '',
      controller: function ($location,$http, $rootScope) {
        var hash = $location.path().substr(1);
         var splitted = hash.split('&');
         var params = {};
          for (var i = 0; i < splitted.length; i++) {
           var param  = splitted[i].split('=');
             var key    = param[0];
             var value  = param[1];
             params[key] = value;
             $rootScope.accesstoken=params;
           }
           //store token to session
           sessionStorage.access_token = params['access_token'];
           //get user information
           $http.get('https://whatnowatlanta.com/oauth/me/?access_token='+sessionStorage.access_token).success(function(data){
               sessionStorage.user = data['ID'];
               $location.path("/select");
           }).error(function(data) {
               $location.path("/login");
           });
       }
    })
    .state('select', {
        url: "/select",
        templateUrl: "views/select.html",
        controller: 'SelectCtrl',
        data: { pageTitle: 'Select Website' },
    })


  });
  app.run(function($rootScope, $state) {
      $rootScope.$state = $state;
  });


  /**
   * Configure the Routes
   */
  // app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
  //   $routeProvider
  //     /* Uncomment the statement below to acquire tokens */
  //     //* Process Token
      // .when("/access_token=:accessToken", {
      //   template: '',
      //   controller: function ($location,$rootScope) {
      //     var hash = $location.path().substr(1);
      //      var splitted = hash.split('&');
      //      var params = {};
      //
      //       for (var i = 0; i < splitted.length; i++) {
      //        var param  = splitted[i].split('=');
      //          var key    = param[0];
      //          var value  = param[1];
      //          params[key] = value;
      //          $rootScope.accesstoken=params;
      //          if(key == "access_token") sessionStorage.access_token = value;
      //        }
      //        $location.path("/");
      //    }
      // })
  //     //* test token
  //     .when("/", {
  //       templateUrl: "partials/wna-sites.html",
  //       controller: "ViewSitesCtrl"
  //     })
  //     .when("/signin", {
  //       template: '',
  //       controller: function ($location,$rootScope) {
  //         var client_id="h3Uo8bO0D5bsHI6PA7PK0S7iJAklhN";
  //         var client_secret="LyRGXZRM0uRcXyU3nvbdgb5nuPXOaf";
  //         var redirect_uri="http://localhost:8888/wna-dashboard/";
  //         var response_type="token"; //code
  //         var url="https://whatnowatlanta.com/oauth/authorize/?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type="+response_type;
  //         window.location.replace(url);
  //       }
  //     })
  //     .when("/signout", {
  //       template: '',
  //       controller: function ($location,$rootScope) {
  //         var client_id="h3Uo8bO0D5bsHI6PA7PK0S7iJAklhN";
  //         var redirect_uri="http://localhost:8888/wna-dashboard/";
  //         var response_type="token"; //code
  //         var scope = "auth";
  //         var url="https://whatnowatlanta.com/oauth/authorize/?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type="+response_type+"&scope="+scope;
  //         window.location.replace(url);
  //       }
  //     })
  //     .when("/site/:siteDomain", {
  //       templateUrl: "partials/site-view.html",
  //       controller: "ViewSiteCtrl"
  //     })
  //     // Pages
  //     // .when("/gallery", {templateUrl: "partials/gallery.html", controller: "GalleryCtrl"})
  //     // .when("/floorplans", {templateUrl: "partials/floorplans.html", controller: "FloorplansCtrl"})
  //     // .when("/community", {templateUrl: "partials/community.html", controller: "CommunityCtrl"})
  //     // .when("/neighborhood", {templateUrl: "partials/neighborhood.html", controller: "PageCtrl"})
  //     // // Blog
  //     //.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
  //     //.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
  //     // else 404
  //     .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  //
  //     // use the HTML5 History API
  //     //$locationProvider.html5Mode(true);
  // }]);

})();
