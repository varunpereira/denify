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
	var { searchTerm, category, pagination } = await request.json()

	pagination = Number(pagination)
	var products = []
	if (category == 'All') {
		products = await productModel.find({
			title: { $regex: searchTerm, $options: 'i' },
			approved: 'true',
		})
	} else if (category == 'Tech') {
		products = await productModel.find({
			title: { $regex: searchTerm, $options: 'i' },
			category: 'Tech',
			approved: 'true',
		})
	}
	var productsPerPage = 8
	var pages = Math.ceil(products.length / productsPerPage)
	var lower = productsPerPage * (pagination - 1)
	var upper = productsPerPage * pagination
	products = products.slice(lower, upper)

	return json({
		pages,
		products,
	})
}
