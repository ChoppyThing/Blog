var async = require("async");

'use strict';

module.exports = function(Post) {
  Post.fetchPosts = function(page = 1, cb) {
    let currentDate = new Date();

    const LIMIT = 3;
    let from = (page - 1) * LIMIT;
    let post = null;
    let count = null;
    let response;
    
    async.parallel([
      (callback) => {
        Post.find({skip: from, limit: LIMIT}, function (err, postList) {
          posts = postList;
          callback();
        });
      },
      (callback) => {
        Post.find({}, function (err, posts) {
          count = posts.length;
          callback();
        });
      }
    ], function(err, results) {
      response = {
        "page": page,
        "perPage": LIMIT,
        "total": count,
        "data": posts,
        "timestamp": currentDate
      };

      cb(null, response);
    });
  };

  Post.remoteMethod(
    'fetchPosts', {
      http: {
        path: '/fetch/page',
        verb: 'get'
      },
      accepts: {
        arg: 'page',
        type: 'string',
        http: {
          source: 'query'
        }
      },
      returns: {
        arg: 'posts',
        type: 'array'
      }
    }
  );
};
