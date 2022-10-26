import { db } from '@src/prov/db/connect.js'
import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
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
