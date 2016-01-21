angular.module('boilerApp')
.controller('AuthCtrl', [
'$scope',
'$state',
'$http',
'$rootScope',
'AUTH_EVENTS',
'AuthService',
'$cookies',
'$window',
function($scope, $state, $http, $rootScope, AUTH_EVENTS, AuthService, $cookies, $window){
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function(credentials) {
    // Auth.login($scope.credentials).then(function(){
    //   $state.go('home');
    // });
    // return $http.post('/api/v1/sessions', credentials).success(function(data){
    //   console.log('log in success!');
    // });
    // console.log('AuthCtrl log in function');

    AuthService.login(credentials).then(function (user) {

      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $state.go('home');
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };

  $scope.register = function(credentials) {
// $window.sessionStorage["userInfo"] = JSON.stringify(res.data.user);
debugger;
    // $cookies.put('api_key', res.data.user.api_key);
      console.log('AuthCtrl register function');
    return $http.post('/api/v1/users', credentials).success(function(data){
      // debugger;
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(data);
      console.log('register success!');
      console.log(data);
      $state.go('home');
    });
  };
}]);


// .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
//   $scope.credentials = {
//     username: '',
//     password: ''
//   };
//   $scope.login = function (credentials) {
//     AuthService.login(credentials).then(function (user) {
//       $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//       $scope.setCurrentUser(user);
//     }, function () {
//       $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//     });
//   };
// })

