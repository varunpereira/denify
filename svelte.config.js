import path from 'path'
import adapter from '@sveltejs/adapter-auto'

var config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'@src': path.resolve('./src'),
				},
			},
		},
		files: {
			routes: 'src/page',
			template: 'src/prog.html',
			assets: 'src/prop',
		},
	},
}
export default config
