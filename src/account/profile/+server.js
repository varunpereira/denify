import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		
	}
	var { email, pagination } = await request.json()

	var products = await productModel.find({
		email,
		approved: 'true',
	})
	var productsPerPage = 8
	var pages = Math.ceil(products.length / productsPerPage)
	var lower = productsPerPage * (pagination - 1)
	var upper = productsPerPage * pagination
	products = products.slice(lower, upper)
	return json({
		products,
		pages,
	})
}
