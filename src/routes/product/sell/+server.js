import db from '@src/routes/db/connect.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export async function POST({ request }) {
	try {
		var formData = await request.json()
		formData['approved'] = 'pending'
		var product = await new productModel(formData).save()
		return json({
				product,
			},
		)
	} catch (error) {
		return json({
				error: error.message,
			},
		)
	}
}