import { db } from '@src/prov/db/connect.js'
import { domain, devDomain } from '$env/static/private'

import reviewModel from '@src/prov/model/review.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	// cors
	if (request.url != domain) {
		return json({
			authorised: false, domain: request.url,
		})
	}
	var { email } = await request.json()

	var reviews = await reviewModel.find({
		email,
	})
	return json({
		reviews,
	})
}
