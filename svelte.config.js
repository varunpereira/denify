import vercel from '@sveltejs/adapter-vercel'

var config = {
	kit: {
		adapter: vercel(),
		files: {
			routes: 'src/',
			appTemplate: 'src/all/struct.html',
			assets: 'src/prop/',
		},
	},
}

export default config
