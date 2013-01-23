// Generated by CoffeeScript 1.4.0
(function() {
  var algorithmCipher, crypto, keyCipher, sys;

  crypto = require("crypto");

  sys = require("sys");

  algorithmCipher = "aes256";

  keyCipher = "gGHF45$%fgfsdD&*l13kj13@#s859df__jh5k";

  module.exports = {
    sha1: function(str, iteracoes) {
      var i, shaUm;
      if (typeof str !== "string") {
        str = str.toString();
      }
      if (typeof iteracoes === "undefined") {
        iteracoes = 0;
      }
      shaUm = crypto.createHash("sha1").update(str).digest("HEX");
      i = 0;
      while (i < iteracoes) {
        shaUm = crypto.createHash("sha1").update(shaUm).digest("HEX");
        i++;
      }
      return shaUm;
    },
    gerarSalt: function() {
      var salt;
      salt = this.sha1(new Date(), 10);
      return salt;
    },
    gerarSessionToken: function(req) {
      var i, ip_address, keys, ret;
      ip_address = null;
      try {
        ip_address = req.headers["x-real-ip"];
      } catch (error) {
        ip_address = req.connection.remoteAddress;
      }
      keys = [req.headers.origin, req.headers["user-agent"], req.headers.referer];
      ret = "";
      i = 0;
      while (i < keys.length) {
        ret += keys[i];
        i++;
      }
      return this.sha1(ret);
    },
    cifrar: function(str) {
      var cipher;
      cipher = crypto.createCipher(algorithmCipher, keyCipher);
      return cipher.update(str, "utf8", "hex") + cipher.final("hex");
    },
    decifrar: function(cript) {
      var decipher;
      decipher = crypto.createDecipher(algorithmCipher, keyCipher);
      return decipher.update(cript, "hex", "utf8") + decipher.final("utf8");
    }
  };

}).call(this);
