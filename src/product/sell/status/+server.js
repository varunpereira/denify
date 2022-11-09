import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain && request.url != devDomain) {
		return json({
			authorised: false,
		})
	}
	try {
		var { productId } = await request.json()

		var product = await productModel.findOne({
			_id: productId,
		})
		return json({
			product,
		})
	} catch (error) {
		return json({
			error: error.message,
		})
	}
}
