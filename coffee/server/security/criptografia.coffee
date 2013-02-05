crypto = require("crypto")
sys = require("sys")
algorithmCipher = "aes256" # or any other algorithm supported by OpenSSL
keyCipher = "gGHF45$%fgfsdD&*l13kj13@#s859df__jh5k"

module.exports =
	sha1: (str, iteracoes) ->
		str = str.toString()  unless typeof str is "string"
		iteracoes = 0  if typeof iteracoes is "undefined"
		shaUm = crypto.createHash("sha1").update(str).digest("HEX")
		i = 0

		while i < iteracoes
			shaUm = crypto.createHash("sha1").update(shaUm).digest("HEX")
			i++
		shaUm

	gerarSalt: ->
		salt = @sha1(new Date(), 10)
		salt

	gerarSessionToken: (req) ->
		ip_address = null
		try
			ip_address = req.headers["x-real-ip"] #x-forwarded-for
		catch error
			ip_address = req.connection.remoteAddress
		
		# sys.puts(ip_address);
		# sys.puts(sys.inspect(req.headers));
		
		#Verificar melhores credenciais.
		keys = [req.headers.origin, req.headers["user-agent"], req.headers.referer]
		ret = ""
		i = 0

		while i < keys.length
			ret += keys[i]
			i++
		@sha1 ret

	cifrar: (str) ->
		cipher = crypto.createCipher(algorithmCipher, keyCipher)
		cipher.update(str, "utf8", "hex") + cipher.final("hex")

	decifrar: (cript) ->
		decipher = crypto.createDecipher(algorithmCipher, keyCipher)
		decipher.update(cript, "hex", "utf8") + decipher.final("utf8")