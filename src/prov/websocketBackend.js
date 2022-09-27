import { Server } from 'socket.io'

export var websocketBackend = {
	name: 'sveltekit-socket-io',
	// Socket.IO server + db stuff goes here
	configureServer(server) {
		var io = new Server(server.httpServer)
		io.on('connection', function (websocket) {
			// 1 way data com
			var username = `User ${Math.round(Math.random() * 999999)}`
			websocket.emit('name', username)
			// 2 way data com
			websocket.on('message', function (message) {
				io.emit('message', {
					from: username,
					message: message,
					time: new Date().toLocaleString(),
				})
			})
		})
		// done
		console.log('SocketIO injected')
	},
}
