import db from '@src/prov/db'
import productModel from '@src/prot/product'

db()

export async function post({ request }) {
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
	return {
		body: {
			products,
			pages,
		},
	}
}
