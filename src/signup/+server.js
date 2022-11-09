import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'
import bcryptjs from 'bcryptjs'
import userModel from '@src/prov/model/user.js'
import orderModel from '@src/prov/model/order.js'
import jwt from 'jsonwebtoken'
import { json } from '@sveltejs/kit'
import { mongodbUri } from '$env/static/private'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false,
		})
	}
	var { email, password } = await request.json()

	var findUser = await userModel.findOne({ email })
	if (findUser) {
		return json({
			error: 'This email already exists.',
		})
	}

	var passwordHash = bcryptjs.hashSync(password, 12)

	var saveUser = await new userModel({
		email,
		password: passwordHash,
	}).save()
	var saveCart = await new orderModel({
		email,
		current: true,
	}).save()

	// sign in
	var accessToken = jwt.sign({ id: email }, mongodbUri, {
		expiresIn: '15m',
	})
	var refreshToken = jwt.sign({ id: email }, mongodbUri, {
		expiresIn: '7d',
	})
	var cart = await orderModel.findOne({
		email,
		current: true,
	})
	var user = await userModel.findOne({ email })

	return json({
		refreshToken,
		accessToken,
		cartQuantity: cart.quantity,
		user,
	})
}
