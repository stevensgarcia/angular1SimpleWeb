var services = function($scope, ServiceFactory) {
   ServiceFactory.getServices()
     .then(function(servicesList) {
        $scope.services = servicesList;
     });
};

var app = angular.module('computer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
   $routeProvider
      .when('/main', {
         templateUrl: 'main.html',
         controller: 'MainCtrl'
      })
      .when('/about', {
         templateUrl: 'about.html',
         controller: 'MainCtrl'
      })
      .when('/services', {
         templateUrl: 'services.html',
         controller: 'ServiceCtrl'
      })
      .when('/contact', {
         templateUrl: 'contact.html',
         controller: 'ContactCtrl'
      })
      .otherwise({
         redirectTo: '/main'
      });
}])

.controller('MainCtrl', ['$scope', 'ServiceFactory', function($scope, ServiceFactory) {
   
   services($scope, ServiceFactory);

}])

.factory('ServiceFactory', ['$http', function($http) {
  return {
     getServices: function() {
        return $http.get('services.json')
           .then(function(response) {
              console.log("Service response in ServiceFactory: ", response.data);
              return response.data;
           });
     }
  }

}])

.controller('ServiceCtrl', ['$scope', 'ServiceFactory', function($scope, ServiceFactory) {

   services($scope, ServiceFactory);

}])

.controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('locations.json')
   .then(function(response) {
      $scope.locations = response.data;
   })
   .catch(function(reason) {
      console.log('Something went wrong: ', reason);
   });
   
}]);
