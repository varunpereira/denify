import ioClient from 'socket.io-client'
var socket = ioClient('http://localhost:3000')
// var socket = ioClient(import.meta.env.VITE_domain);
export var websocketFrontend = socket
