import ioClient from 'socket.io-client';
// change domain
var socket = ioClient('http://localhost:3000');
export var websocketFrontend = socket;
