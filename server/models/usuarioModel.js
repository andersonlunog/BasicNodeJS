// Generated by CoffeeScript 1.4.0
(function() {
  var Usuario;

  Usuario = (function() {
    var Model, Schema, crypt, cryptPass, mongoose, setSenha, usuarioSchema;
    mongoose = require("mongoose");
    Schema = require("mongoose").Schema;
    crypt = require("./../seguranca/criptografia");
    setSenha = function(value) {
      var salt, senha;
      if (!value) {
        return null;
      }
      salt = crypt.gerarSalt();
      senha = cryptPass(value + salt);
      this.set("salt", salt);
      return senha;
    };
    cryptPass = function(value) {
      return crypt.sha1(value, 1000);
    };
    usuarioSchema = new Schema({
      nome: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        index: {
          unique: true,
          sparse: true
        }
      },
      senha: {
        type: String,
        required: true,
        set: setSenha
      },
      salt: {
        type: String,
        required: true
      }
    });
    usuarioSchema.method({
      passValidate: function(pass) {
        var passSha, salt;
        salt = this.get("salt");
        passSha = cryptPass(pass + salt);
        return passSha === this.get("senha");
      }
    });
    usuarioSchema["static"]({
      findByEmail: function(email, success, error) {
        return this.findOne({
          email: email
        }, function(e, o) {
          if (e) {
            if (error) {
              return error(e);
            }
          } else {
            if (success) {
              return success(o);
            }
          }
        });
      }
    });
    Model = mongoose.model("Usuario", usuarioSchema);
    return Model;
  })();

  module.exports = Usuario;

}).call(this);