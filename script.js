/**
 * Service handler to request a list of services
 * @param {Object} $scope Scope instance of the current controller
 * @param {Object} ServiceFactory Factory object to make the request
 */
var services = function($scope, ServiceFactory) {
   ServiceFactory.getServices()
     .then(function(servicesList) {
        $scope.services = servicesList;
     });
};

var app = angular.module('computer', ['ngRoute'])

// Set routes
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
   
   // Get a list of services from local db
   services($scope, ServiceFactory);

}])

.factory('ServiceFactory', ['$http', function($http) {
  return {
     getServices: function() {
        return $http.get('services.json')
           .then(function(response) {
              return response.data;
           });
     }
  }

}])

.controller('ServiceCtrl', ['$scope', 'ServiceFactory', function($scope, ServiceFactory) {

   // Get a list of services from local db
   services($scope, ServiceFactory);

}])

.controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {
  
   // Get a list of locations in db
  $http.get('locations.json')
   .then(function(response) {
      $scope.locations = response.data;
   })
   .catch(function(reason) {
      console.log('Something went wrong: ', reason);
   });
   
}]);
