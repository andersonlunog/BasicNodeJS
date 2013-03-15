// Generated by CoffeeScript 1.4.0
(function() {
  var crypt, loginHelper, messageHelper, responseHelper, sys, usuarioModel;

  sys = require("sys");

  usuarioModel = require("./../models/usuarioModel");

  crypt = require("./../helpers/cryptography");

  responseHelper = require("./../helpers/response");

  messageHelper = require("./../helpers/message");

  loginHelper = require("./../helpers/login");

  module.exports = function(app) {
    app.post("/login", function(req, res) {
      var email, senha;
      email = req.body.email;
      senha = req.body.senha;
      return usuarioModel.findByEmail(email, (function(usuario) {
        var sessaoUsuario;
        if (!usuario) {
          return responseHelper.sendError(res, messageHelper.loginFail);
        } else if (usuario.passValidate(senha)) {
          sessaoUsuario = {
            sID: req.sessionID,
            userID: usuario.id,
            userName: usuario.nome,
            userMail: usuario.email,
            token: crypt.sessionTokenGenerate(req)
          };
          req.session.user = sessaoUsuario;
          return res.send(200);
        } else {
          return responseHelper.sendError(res, messageHelper.loginFail);
        }
      }), function(erro) {
        return responseHelper.sendError(res, erro);
      });
    });
    return app.post("/logout", loginHelper.logged, function(req, res) {
      delete req.session.user;
      return res.send(200);
    });
  };

}).call(this);
