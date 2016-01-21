angular.module('boilerApp')
.factory('posts', [
  '$http', 
  function($http){
    var o = {
        posts: []
      };
    o.getAll = function() {
        return $http.get('/api/v1/posts')
        .success(function(data) {
          angular.copy(data, o.posts);
        });
      };
    o.create = function(post) {
      return $http.post('/api/v1/posts', post).success(function(data){
        o.posts.push(data);
      });
    };
    o.upvote = function(post) {
      return $http.put('api/v1/posts/' + post.id + '/upvote.json')
        .success(function(data){
          post.upvotes += 1;
        });
    };
    o.get = function(id) {
      return $http.get('api/v1/posts/' + id + '.json').then(function(res){
        return res.data;
      });
    };
    o.addComment = function(id, comment) {
      return $http.post('api/v1/posts/' + id + '/comments.json', comment);
    };
    o.upvoteComment = function(post, comment) {
      return $http.put('api/v1/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
        .success(function(data){
          comment.upvotes += 1;
        });
    };
    return o;
}])