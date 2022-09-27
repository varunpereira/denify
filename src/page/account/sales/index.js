import db from '@src/prov/db'
import productModel from '@src/prot/product'

db()

export async function post({ request }) {
	var { email } = await request.json()
	var products = await productModel.find({
		email,
	})
	return {
		body: {
			products,
		},
	}
}
