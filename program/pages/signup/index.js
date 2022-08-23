import db from '@program/provs/db';
import userModel from '@program/prots/user';
import orderModel from '@program/prots/order';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

db();

export async function post({ request }) {
	var { email, password } = await request.json();

	var findUser = await userModel.findOne({ email });
	if (findUser) {
		return {
			body: { error: 'This email already exists.' }
		};
	}

	var passwordHash = bcryptjs.hashSync(password, 12);

	var saveUser = await new userModel({
		email,
		password: passwordHash
	}).save();
	var saveCart = await new orderModel({
		email,
		current: true
	}).save();

	// sign in
	var accessToken = jwt.sign({ id: email }, import.meta.env.VITE_mongodbUri, {
		expiresIn: '15m'
	});
	var refreshToken = jwt.sign({ id: email }, import.meta.env.VITE_mongodbUri, {
		expiresIn: '7d'
	});
	var cart = await orderModel.findOne({
		email,
		current: true
	});
	var user = await userModel.findOne({ email });

	return {
		body: {
			refreshToken,
			accessToken,
			cartQuantity: cart.quantity,
			user
		}
	};
}
