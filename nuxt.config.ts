// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['@/assets/css/main.css'],
	components : [{ path: '@/components', pathPrefix: false }],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: ['@nuxt/image', 'nuxt-swiper'],
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title : 'Giselle Hage | Harmonização Orofacial',
			meta: [
				{ hid: 'description', name: 'description', content: '>Olá, sou a Giselle, uma cirurgiã dentista completamente apaixonada pela beleza e tudo que ele representa.Minha verdadeira paixão: a harmonização orofacial. Tenho dedicado toda a minha carreira para unir a arte de transformar auto estima com a magia de promover a harmonia estética em cada expressão facial.' },
			]
		}
	}
})
