angular.module('boilerApp', ['ui.router', 'templates', 'ngCookies'])
// .config([
// '$stateProvider',
// '$urlRouterProvider',
// function($stateProvider, $urlRouterProvider) {

//   $stateProvider
//     .state('home', {
//       url: '/home',
//       templateUrl: 'home/_home.html',
//       controller: 'MainCtrl'
//     })
//     .state('posts', {
//       url: '/posts/{id}',
//       templateUrl: 'posts/_posts.html',
//       controller: 'PostsCtrl'
//     });
//   $urlRouterProvider.otherwise('home');
// }])
// .controller('MainCtrl', [
// '$scope',
// 'posts',
// function($scope, posts){
//   $scope.test = 'Hello world!';
//   $scope.posts = [
//     {title: 'post 1', upvotes: 5},
//     {title: 'post 2', upvotes: 2},
//     {title: 'post 3', upvotes: 15},
//     {title: 'post 4', upvotes: 9},
//     {title: 'post 5', upvotes: 4}
//   ];
//   $scope.addPost = function(){
//     if(!$scope.title || $scope.title === '') { return; }
//     $scope.posts.push({
//       title: $scope.title,
//       link: $scope.link,
//       upvotes: 0,
//       comments: [
//         {author: 'Joe', body: 'Cool post!', upvotes: 0},
//         {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
//       ]
//     });
//     $scope.title = '';
//     $scope.link = '';
//   };

//   $scope.incrementUpvotes = function(post) {
//     post.upvotes += 1;
//   };

// }])
// .factory('posts', [
//   '$http', 
//   function($http){
//     var o = {
//         posts: []
//       };
//     o.getAll = function() {
//         return $http.get('/posts.json')
//         .success(function(data) {
//           angular.copy(data, o.posts);
//         });
//       };
//     o.create = function(post) {
//       return $http.post('/posts.json', post).success(function(data){
//         o.posts.push(data);
//       });
//     };
//     o.upvote = function(post) {
//       return $http.put('/posts/' + post.id + '/upvote.json')
//         .success(function(data){
//           post.upvotes += 1;
//         });
//     };
//     o.get = function(id) {
//       return $http.get('/posts/' + id + '.json').then(function(res){
//         return res.data;
//       });
//     };
//     o.addComment = function(id, comment) {
//       return $http.post('/posts/' + id + '/comments.json', comment);
//     };
//     o.upvoteComment = function(post, comment) {
//       return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
//         .success(function(data){
//           comment.upvotes += 1;
//         });
//     };
//     return o;
// }])
// .controller('PostsCtrl', [
// '$scope',
// '$stateParams',
// 'posts',
// function($scope, $stateParams, posts){
//   $scope.post = posts.posts[$stateParams.id];

//   $scope.addComment = function(){
//     if($scope.body === '') { return; }
//     $scope.post.comments.push({
//       body: $scope.body,
//       author: 'user',
//       upvotes: 0
//     });
//     $scope.body = '';
//   };
// }]);
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl'
      ,
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      },
      data: {
        authorizedRoles: ['*']
      }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'posts/_posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      // onEnter: ['$state', 'Auth', function($state, Auth) {
      //   Auth.currentUser().then(function (){
      //     $state.go('home');
      //   })
      // }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      // onEnter: ['$state', 'Auth', function($state, Auth) {
      //   Auth.currentUser().then(function (){
      //     $state.go('home');
      //   })
      // }]
    });

  $urlRouterProvider.otherwise('home');
}])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})
.factory('AuthService', function ($http, Session, $window, $cookies) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/api/v1/sessions', credentials)
      .then(function (res) {
        // Session.create(res.data.id, res.data.user.id,
                       // res.data.user.role);
        $window.sessionStorage["userInfo"] = JSON.stringify(res.data.user);
        $cookies.put('api_key', res.data.user.api_key);
        return res.data.user;
      }, function(error) {
          console.log(error);
      });
  };
  authService.autoLogin = function (api_key) {
    // debugger;
    return $http
      .post('/api/v1/auto-login', { api_key: api_key})
      .then(function (res) {
        // Session.create(res.data.id, res.data.user.id,
                       // res.data.user.role);
        $window.sessionStorage["userInfo"] = JSON.stringify(res.data.user);
        // $cookies.put('api_key', res.data.user.api_key);
        // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        // $scope.setCurrentUser(user);
        console.log('auto login success!');
        return res.data.user;
      }, function(error) {
          console.log(error);
      });
  };
  // , function(error) {
//       deferred.reject(error);
//     }
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
})
.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
.factory('AuthInterceptor', function ($rootScope, $q,
                                      AUTH_EVENTS) {
  return {
    responseError: function (response) { 
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.directive('loginDialog', function (AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<div ng-if="visible"  \
                    ng-include="\'login-form.html\'">',
    link: function (scope) {
      var showDialog = function () {
        scope.visible = true;
      };
  
      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
})
.run(function ($rootScope, AUTH_EVENTS, AuthService, $cookies) {
  // $rootScope.$on('$stateChangeStart', function (event, next) {
  //   var authorizedRoles = next.data.authorizedRoles;
  //   if (!AuthService.isAuthorized(authorizedRoles)) {
  //     event.preventDefault();
  //     if (AuthService.isAuthenticated()) {
  //       // user is not allowed
  //       $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
  //     } else {
  //       // user is not logged in
  //       $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
  //     }
  //   }
  // });
  var apiKey = $cookies.get('api_key');
  AuthService.autoLogin(apiKey);
  console.log('app started');

})



// function login(userName, password) {
//     var deferred = $q.defer();

//     $http.post("/api/login", {
//       userName: userName,
//       password: password
//     }).then(function(result) {
//       userInfo = {
//         accessToken: result.data.access_token,
//         userName: result.data.userName
//       };
//       $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
//       deferred.resolve(userInfo);
//     }, function(error) {
//       deferred.reject(error);
//     });

//     return deferred.promise;
//   }
