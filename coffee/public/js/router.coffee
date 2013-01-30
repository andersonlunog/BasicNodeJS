define ["backbone", "vm"], (Backbone, Vm) ->
	AppRouter = Backbone.Router.extend routes:
		"sucesso": "sucesso"
		"usuario/:id": "usuario"
		"*actions": "defaultAction"

	initialize = (options) ->
		appView = options.appView
		router = new AppRouter(options)

		router.on "route:sucesso", ->
			require ["views/login/sucesso"], (ViewPage) ->
				viewPage = Vm.create appView, "SucessoView", ViewPage
				viewPage.render()


		router.on "route:usuario", (id) ->
			require ["views/usuario/usuarioView"], (ViewPage) ->
				viewPage = Vm.create appView, "CadastroUsuarioView", ViewPage, 
					id : id
				viewPage.render()


		router.on "route:defaultAction", ->
			require ["views/login/loginView"], (ViewPage) ->
				viewPage = Vm.create appView, "LoginView", ViewPage
				viewPage.render()


		Backbone.history.start()

	initialize: initialize