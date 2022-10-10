import db from '@src/routes/db/connect.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
	var { email } = await request.json()
	var products = await productModel.find({
		email,
	})
	return json({
			products,
		},
	)
}
