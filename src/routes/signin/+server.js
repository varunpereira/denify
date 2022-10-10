import db from '@src/routes/db/connect.js'
import userModel from '@src/routes/model/user.js'
import orderModel from '@src/routes/model/order.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { json } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
	var { email, password } = await request.json()
	var user = await userModel.findOne({ email })
	if (user == null) {
		return json({
			 error: 'This user does not exist.' },
		)
	}

	var isMatch = bcryptjs.compareSync(password, user.password)
	if (!isMatch) {
		return json({
			 error: 'Incorrect password.' },
		)
	}

	var accessToken = jwt.sign({ id: user.email }, import.meta.env.VITE_mongodbUri, {
		expiresIn: '15m',
	})
	var refreshToken = jwt.sign({ id: user.email }, import.meta.env.VITE_mongodbUri, {
		expiresIn: '7d',
	})

	var cart = await orderModel.findOne({
		email: user.email,
		current: true,
	})

	return json({
			refreshToken,
			accessToken,
			user,
			cartQuantity: cart.quantity,
		},
	)
}