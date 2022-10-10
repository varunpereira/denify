import db from '@src/routes/db/connect.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
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
		},
	)
}
