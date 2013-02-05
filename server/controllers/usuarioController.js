// Generated by CoffeeScript 1.4.0
(function() {
  var UsuarioModel, login, resHelper, sys;

  UsuarioModel = require('./../models/usuarioModel');

  sys = require('sys');

  login = require('./../login/login');

  resHelper = require('./../helpers/response');

  module.exports = function(app) {
    app.get('/usuarios', function(req, res) {
      return UsuarioModel.find({}, function(e, o) {
        return resHelper.defaultResponse(res, e, o);
      });
    });
    app.post('/usuario', function(req, res) {
      var usuarioModel;
      if (req.body.senha !== req.body.confirmacaoSenha) {
        resHelper.sendError(res, {
          errors: {
            confirmacaoSenha: {
              message: 'Confirmação de senha incorreta.',
              path: 'confirmacaoSenha'
            }
          }
        });
        return;
      }
      usuarioModel = new UsuarioModel(req.body);
      return usuarioModel.save(function(e, o) {
        return resHelper.defaultResponse(res, e, o);
      });
    });
    app.get('/usuario/:id', function(req, res) {
      return UsuarioModel.findById(req.params.id, function(e, o) {
        return resHelper.defaultResponse(res, e, o);
      });
    });
    app.put('/usuario/:id', function(req, res) {
      return UsuarioModel.findById(req.params.id, function(e, o) {
        if (e) {
          return resHelper.sendError(res, e);
        } else {
          o.nome = req.body.nome;
          o.email = req.body.email;
          o.senha = req.body.senha;
          return o.save(function(e, o) {
            return resHelper.defaultResponse(res, e, o);
          });
        }
      });
    });
    return app["delete"]('/usuario/:id', function(req, res) {
      return UsuarioModel.findById(req.params.id, function(e, o) {
        if (e) {
          return resHelper.sendError(res, e);
        } else {
          return o.remove(function(e, o) {
            return resHelper.defaultResponse(res, e, o);
          });
        }
      });
    });
  };

}).call(this);