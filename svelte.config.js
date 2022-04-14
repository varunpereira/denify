import path from 'path'
import adapter from '@sveltejs/adapter-node';
const config = {
	kit: {
		adapter:adapter(),
		vite: {
			resolve: {
				alias: {
					'@src': path.resolve('./src'),
				}
			}
		}
	},
}
export default config;
