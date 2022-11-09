import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false,
		})
	}
	try {
		var { form } = await request.json()

		form['approved'] = 'pending'
		var product = await new productModel(form).save()
		return json({
			product,
		})
	} catch (error) {
		return json({
			error: error.message,
		})
	}
}
