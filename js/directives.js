(function(){
  var app = angular.module('wna-directives',[]);
  //header directive
  app.directive('wnaHeader',function(){
    return{
      restrict: 'E',
      templateUrl: 'views/common/sidebar.html'
    };
  });
  //custom page title
  app.directive('pageTitle',function($rootScope, $timeout){
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'WNA Dashboard';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle+ ' | WNA Dashboard';
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    };
  })
  //* authentication directive
  app.directive('authenticate',function () {
    var client_id="h3Uo8bO0D5bsHI6PA7PK0S7iJAklhN";
    var response_type="token"; //code
    return{
      template: function(elem,attr){
        console.log(attr);
        return "<a href='https://whatnowatlanta.com/oauth/authorize/?client_id="+client_id+"&redirect_uri="+attr.redirecturi+"&scope=openid&response_type="+response_type+"'><button type='submit' class='btn btn-primary block full-width m-b'>Authenticate</button></a>";
      }
    };
  });
})();
