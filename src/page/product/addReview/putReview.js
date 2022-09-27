import db from '@src/prov/db'
import reviewModel from '@src/prot/review'

db()

export async function post({ request }) {
	try {
		var formValues = await request.json()
		varsave = await new reviewModel(formValues).save()
		return {
			body: {
				success: true,
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
