import { db } from '@src/prov/db/connect.js'
import reviewModel from '@src/prov/model/review.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	try {
		var formValues = await request.json()
		varsave = await new reviewModel(formValues).save()
		return json({
				success: true,
			},
		)
	} catch (error) {
		return json({
				error: error.message,
			},
		)
	}
}