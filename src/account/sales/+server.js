import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false,
		})
	}
	var { email } = await request.json()

	var products = await productModel.find({
		email,
	})
	return json({
		products,
	})
}
