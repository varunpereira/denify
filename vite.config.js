import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

var config = {
	plugins: [sveltekit()],
	server: {
		cors: false,
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
		},
	},
}

export default config
