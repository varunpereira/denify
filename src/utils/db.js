import mongoose from 'mongoose';

export default function db() {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected.');
		return;
	}
	mongoose.connect(import.meta.env.VITE_mongodbUri, (error) => {
		if (error) {
			console.log(error);
			return;
		}
		console.log('Connected to mongodb.');
	});
}
