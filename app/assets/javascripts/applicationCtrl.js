angular.module('boilerApp')
.controller('ApplicationController', [
'$scope',
'$state',
'$rootScope',
'AUTH_EVENTS',
'AuthService',
'USER_ROLES',
'$cookies',
function($scope, $state, $rootScope, AUTH_EVENTS, AuthService, USER_ROLES, $cookies) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.test = 'test';
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.autoLogin = function () {
  	var apiKey = $cookies.get('api_key');
  	AuthService.autoLogin(apiKey).then(function(user) {
		$scope.setCurrentUser(user);
	  	$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
  	}, function () {
  		console.log('please log in');
  	});
  };

  $scope.autoLogin();
}])



 // AuthService.login(credentials).then(function (user) {

 //      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
 //      $scope.setCurrentUser(user);
 //      $state.go('home');
 //    }, function () {
 //      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
 //    });