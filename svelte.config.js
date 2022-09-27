import path from 'path';
import adapter from '@sveltejs/adapter-auto';

var config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'@src': path.resolve('./src')
				}
			}
		},
		files: {
			routes: 'src/pages',
			template: 'src/prog.html',
		}
	}
};
export default config;
