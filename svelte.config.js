/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import path from 'path'
import adapter from '@sveltejs/adapter-auto';
// import vercel from '@sveltejs/adapter-vercel';
const config = {
	kit: {
		// adapter: vercel(),
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
