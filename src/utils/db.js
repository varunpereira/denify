import mongoose from 'mongoose';

export default function db() {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected.');
		return;
	}
	mongoose.connect("mongodb+srv://0:0@cluster0.ufs0l.mongodb.net/dropshop?retryWrites=true&w=majority", (error) => {
		if (error) {
			console.log(error);
			return;
		}
		console.log('Connected to mongodb.');
	});
}
