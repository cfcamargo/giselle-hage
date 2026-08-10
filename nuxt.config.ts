// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	workspaceDir: '.',
	devtools: { enabled: true },
	css: ['@/assets/css/main.css'],
	components : [{ path: '@/components', pathPrefix: false }],
	runtimeConfig: {
		public: {
			siteUrl: ''
		}
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: ['@nuxt/image', 'nuxt-swiper', 'motion-v/nuxt'],
	motionV: {
		utilities: false
	},
	routeRules: {
		'/services/BigodeChines': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/bigode-chines': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/Bioestimuladores': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/bioestimuladores': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/Botox': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/botox': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/EmagrecimentoFacial': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/emagrecimento-facial': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/HomeCare': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/home-care': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/Microagulhamento': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/microagulhamento': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/Peeling': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/peeling': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/Preenchimento': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/preenchimento': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/TratamentoManchas': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/tratamento-manchas': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/peeling': { redirect: { to: '/#tratamentos', statusCode: 301 } },
		'/services/**': { redirect: { to: '/#tratamentos', statusCode: 301 } }
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: {
				lang: 'pt-BR'
			}
		}
	}
})
