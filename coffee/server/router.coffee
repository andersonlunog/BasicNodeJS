sys = require "sys"
login = require "./login/login"

module.exports = (app) ->
	app.post "/login", login.autenticar

	app.post "/ver", (req, res) ->
		if login.validarRequest req
			res.send msg: "Sessão válida"
		else
			res.send msg: "Sessão inválida"

	app.post "/sessao", (req, res) ->		
		# sys.puts(sys.inspect(req));
		console.log req.sessionID		
		# res.cookie('name', 'tobi', { signed: true });
		res.send msg: "ok"