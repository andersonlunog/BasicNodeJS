// Generated by CoffeeScript 1.4.0
(function() {
  var crypt, resHelper, sys;

  sys = require("sys");

  resHelper = require("./response");

  crypt = require("./cryptography");

  module.exports = {
    logged: function(req, res, next) {
      if (req.session.user && crypt.sessionTokenGenerate(req) === req.session.user.token) {
        return next();
      } else {
        return resHelper.authenticationError(res);
      }
    }
  };

}).call(this);
