import { db } from '@src/routes/db/connect.js'
import userModel from '@src/routes/model/user.js'
import orderModel from '@src/routes/model/order.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { json } from '@sveltejs/kit'
import { mongodbUri } from '$env/static/private'

db()

export var POST = async ({ request }) => {
	var { email, password } = await request.json()
	var user = await userModel.findOne({ email })
	if (user == null) {
		return json({
			error: 'This user does not exist.',
		})
	}

	var isMatch = bcryptjs.compareSync(password, user.password)
	if (!isMatch) {
		return json({
			error: 'Incorrect password.',
		})
	}

	var accessToken = jwt.sign({ id: user.email }, mongodbUri, {
		expiresIn: '15m',
	})
	var refreshToken = jwt.sign({ id: user.email }, mongodbUri, {
		expiresIn: '7d',
	})

	var cart = await orderModel.findOne({
		email: user.email,
		current: true,
	})

	return json({
		accessToken,
		refreshToken,
		user,
		cartQuantity: cart.quantity,
	})
}
