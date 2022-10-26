import mongoose from 'mongoose'
import { mongodbUri } from '$env/static/private'

export var db = () => {
	if (mongoose.connections[0].readyState) {
		console.log('Already connected.')
		return
	}
	mongoose.connect(mongodbUri, function (error) {
		if (error) {
			console.log(error)
			return
		}
		console.log('Connected to mongodb.')
	})
}
