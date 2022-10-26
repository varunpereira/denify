import { db } from '@src/prov/db/connect.js'
import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	var { email } = await request.json()
	var products = await productModel.find({
		email,
	})
	return json({
			products,
		},
	)
}
