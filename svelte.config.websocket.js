import path from 'path';
import adapter from '@sveltejs/adapter-auto';
// import {websocketBackend}  from './src/provs/websocketBackend';
import { Server } from 'socket.io';

const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'@src': path.resolve('./src')
				}
			},
			plugins: [
				// only works locally not on vercel
				// websocketBackend,
				{
					name: 'sveltekit-socket-io',
					configureServer(server) {
						var io = new Server(server.httpServer);
						io.on('connection', function (websocket) {
							// 1 way data com
							var username = `User ${Math.round(Math.random() * 999999)}`;
							websocket.emit('name', username);
							// 2 way data com
							websocket.on('message', function (message) {
								io.emit('message', {
									from: username,
									message: message,
									time: new Date().toLocaleString()
								});
							});
							// // chat api
							// websocket.on('newMessage', function (newMessage) {
							// db query here
							// 	var messages = []
							// 	io.emit('messages', messages);
							// });
						});
						// done
						console.log('SocketIO injected');
					}
				}
			]
		}
	}
};
export default config;
