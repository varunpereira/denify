import db from '@src/prov/db'
import productModel from '@src/prot/product'

db()

export async function post({ request }) {
	try {
		var { productId } = await request.json()
		var product = await productModel.findOne({
			_id: productId,
		})
		return {
			body: {
				product,
			},
		}
	} catch (error) {
		return {
			body: {
				error: error.message,
			},
		}
	}
}
