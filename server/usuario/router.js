// Generated by CoffeeScript 1.4.0
(function() {
  var UsuarioModel, login, sys;

  UsuarioModel = require('./usuarioModel');

  sys = require('sys');

  login = require('./../login/login');

  module.exports = function(app) {
    app.post('/usuario', function(req, res) {
      var usuarioModel, usuarioPost;
      usuarioPost = req.body;
      if (usuarioPost.senha !== usuarioPost.confirmacaoSenha) {
        res.send({
          errors: {
            confirmacaoSenha: {
              message: 'Confirmação de senha incorreta.',
              path: 'confirmacaoSenha'
            }
          }
        });
        return;
      }
      usuarioModel = new UsuarioModel(usuarioPost);
      return usuarioModel.save(function(e, o) {
        if (e) {
          return res.send(e);
        } else {
          return res.send(o);
        }
      });
    });
    app.get('/usuario', function(req, res) {
      var usuarioModel;
      usuarioModel = new UsuarioModel(usuarioPost);
      return usuarioModel.find({}, function(e, o) {
        if (e) {
          return res.send(e);
        } else {
          return res.send(o);
        }
      });
    });
    app.get('/usuario/:id', function(req, res) {
      var usuarioModel;
      usuarioModel = new UsuarioModel(usuarioPost);
      return usuarioModel.findById(req.params.id, function(e, o) {
        if (e) {
          return res.send(e);
        } else {
          return res.send(o);
        }
      });
    });
    app.put('/usuario/:id', function(req, res) {
      var usuarioModel, usuarioPost;
      usuarioPost = req.body;
      usuarioModel = new UsuarioModel(usuarioPost);
      return usuarioModel.save(function(e, o) {
        if (e) {
          return res.send(e);
        } else {
          return res.send(o);
        }
      });
    });
    return app["delete"]('/usuario/:id', function(req, res) {
      var usuarioModel;
      usuarioModel = new UsuarioModel(usuarioPost);
      return usuarioModel.findById(req.params.id, function(e, o) {
        if (e) {
          return res.send(e);
        } else {
          return o.remove(function(e) {
            if (e) {
              return res.send(e);
            } else {
              return res.send(o);
            }
          });
        }
      });
    });
  };

}).call(this);
