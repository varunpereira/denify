import adapter from '@sveltejs/adapter-auto'

var config = {
	kit: {
		adapter: adapter(),
	},
	files: {
		routes: 'src/page',
		appTemplate: 'src/prev/struct.html',
		assets: 'src/prop',
	},
}

export default config
