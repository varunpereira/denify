import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import reviewModel from '@src/prov/model/review.js'
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
		var { formValues } = await request.json()

		var save = await new reviewModel(formValues).save()
		return json({
			success: true,
		})
	} catch (error) {
		return json({
			error: error.message,
		})
	}
}
