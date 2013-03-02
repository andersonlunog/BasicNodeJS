// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["underscore", "backbone", "model"], function(_, Backbone, BaseModel) {
    var UsuarioModel;
    UsuarioModel = (function(_super) {

      __extends(UsuarioModel, _super);

      function UsuarioModel() {
        return UsuarioModel.__super__.constructor.apply(this, arguments);
      }

      UsuarioModel.prototype.defaults = {
        nome: "",
        email: "",
        senha: "",
        confirmacaoSenha: ""
      };

      UsuarioModel.prototype.urlRoot = "/usuario";

      return UsuarioModel;

    })(BaseModel);
    return UsuarioModel;
  });

}).call(this);
