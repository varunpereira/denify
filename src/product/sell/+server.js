import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'
import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	try {
		var { $apiSecret, form } = await request.json()
// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}

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
