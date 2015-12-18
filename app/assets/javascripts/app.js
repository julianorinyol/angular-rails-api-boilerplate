angular.module('boilerApp', ['ui-router'])
.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello world!';
}]);