import db from '@src/prov/db'
import productModel from '@src/prot/product'

db()

export async function post({ request }) {
	try {
		var formData = await request.json()
		formData['approved'] = 'pending'
		var product = await new productModel(formData).save()
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
