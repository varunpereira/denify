import { db } from '@src/prov/db/connect.js'
import productModel from '@src/prov/model/product.js'
import reviewModel from '@src/prov/model/review.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	try {
		var { productId } = await request.json()
		var product = await productModel.findOne({ _id: productId })
		if (product == null) {
			return json({
					error: 'Product do not exist.',
				},
			)
		}
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
