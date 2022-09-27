import db from '@src/prov/db'
import productModel from '@src/prot/product'
import reviewModel from '@src/prot/review'

db()

export async function post({ request }) {
	try {
		var { productId } = await request.json()
		var product = await productModel.findOne({ _id: productId })
		if (product == null) {
			return {
				body: {
					error: 'Product do not exist.',
				},
			}
		}
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
