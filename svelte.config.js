import path from 'path';
import adapter from '@sveltejs/adapter-auto';

var config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'@program': path.resolve('./program')
				}
			}
		},
		files: {
			assets: 'program/public',
			routes: 'program/pages',
			template: 'program/app.html'
		}
	}
};
export default config;
