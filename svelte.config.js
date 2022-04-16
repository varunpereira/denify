/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import path from 'path'
import adapter from '@sveltejs/adapter-auto';
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
