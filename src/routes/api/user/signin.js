import db from '@src/utils/db';
import userModel from '@src/models/userModel';
import orderModel from '@src/models/orderModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

db();

export async function post({ request }) {
	var { email, password } = await request.json();
	var user = await userModel.findOne({ email });
	if (user === null) {
		return {
			body: { error: 'This user does not exist.' }
		};
	}

	var isMatch = bcryptjs.compareSync(password, user.password);
	if (!isMatch) {
		return {
			body: { error: 'Incorrect password.' }
		};
	}

	var accessToken = jwt.sign({ id: user.email }, import.meta.env.VITE_mongodbUri, {
		expiresIn: '15m'
	});
	var refreshToken = jwt.sign({ id: user.email }, import.meta.env.VITE_mongodbUri, {
		expiresIn: '7d'
	});

	let cart = await orderModel.findOne({
		email: user.email,
		current: true
	});

	return {
		body: {
			refreshToken,
			accessToken,
			user,
			cartQuantity: cart.quantity
		}
	};
}
