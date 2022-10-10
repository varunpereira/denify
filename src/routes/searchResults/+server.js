import db from '@src/routes/db/connect.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
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
		},
	)
}
