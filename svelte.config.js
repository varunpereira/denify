import path from 'path'
const config = {
	kit: {
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
