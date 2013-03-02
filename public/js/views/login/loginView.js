// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "text!templates/login/login.html", "helpers/message", "enums/messageType"], function($, _, Backbone, LoginTemplate, MessageHelper, TipoMsg) {
    var Login;
    Login = (function(_super) {

      __extends(Login, _super);

      function Login() {
        return Login.__super__.constructor.apply(this, arguments);
      }

      Login.prototype.el = ".page";

      Login.prototype.template = _.template(LoginTemplate);

      Login.prototype.initialize = function() {};

      Login.prototype.render = function() {
        return this.$el.html(this.template());
      };

      Login.prototype.events = {
        "submit #frmLogin": "login",
        "click #btnVer": "loginVerify",
        "click #btnLogout": "logout",
        "click #btnCadastrar": "cadastrar"
      };

      Login.prototype.testeSessao = function(event) {
        return $.post("/sessao", data, function(data) {
          return alert(data.msg);
        }).fail(function() {
          return alert("erro");
        });
      };

      Login.prototype.login = function(event) {
        var login;
        login = {
          email: $("#inputEmail").val(),
          senha: $("#inputPassword").val()
        };
        $.post("/login", login, function(data, status, request) {
          console.log(data);
          return alert("Autenticado");
        }).fail(function(request, status, error) {
          console.log(request, status, error);
          return MessageHelper.show(request.responseText, TipoMsg.erro);
        });
        return event.preventDefault();
      };

      Login.prototype.cadastrar = function() {
        return window.location.hash = "#/usuario";
      };

      Login.prototype.loginVerify = function(event) {
        return $.post("/ver", {
          teste: "qualquer coisa"
        }, function(data, status, request) {
          return console.log(data.msg);
        }).fail(function(request, status, error) {
          return console.log("erro");
        });
      };

      Login.prototype.logout = function(event) {
        return $.post("/logout", {}, function(data, status, request) {
          return console.log(data.msg);
        }).fail(function(request, status, error) {
          return console.log("erro");
        });
      };

      Login.prototype.validarCampos = function() {
        var erro;
        erro = void 0;
        this.$el.find("input").each(function(index) {
          $(this).parent().find(".help-inline").detach();
          if ($(this).val() === "") {
            $(this).parent().parent().addClass("error");
            $(this).parent().append("<span class=\"help-inline\">Campo requerido</span>");
            return erro = true;
          } else {
            return $(this).parent().parent().removeClass("error");
          }
        });
        return erro;
      };

      return Login;

    })(Backbone.View);
    return Login;
  });

}).call(this);
