import db from '@src/provs/db'
import productModel from '@src/prots/product'

db()

export async function post({ request }) {
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

	return {
		body: {
			pages,
			products,
		},
	}
}
