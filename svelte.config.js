import adapter from '@sveltejs/adapter-auto'

var config = {
	kit: {
		adapter: adapter(),
		files: {
			routes: 'src/',
			appTemplate: 'src/all/struct.html',
			assets: 'src/prop/',
		},
	},
}

export default config
