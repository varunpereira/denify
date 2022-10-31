import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

const config = {
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
