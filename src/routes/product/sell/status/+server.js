import db from '@src/routes/db/connect.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
	try {
		var { productId } = await request.json()
		var product = await productModel.findOne({
			_id: productId,
		})
		return json({
				product,
			},
		)
	} catch (error) {
		return json({
				error: error.message,
			},
		)
	}
}
