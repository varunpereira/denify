import { db } from '@src/prov/db/connect.js'
import productModel from '@src/prov/model/product.js'
import { json } from '@sveltejs/kit'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public'

db()

export var products = []

export var POST = async ({ request }) => {
	var { $apiSecret } = await request.json()

	// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}

	products = await productModel.find({
		approved: 'true',
	})

	var trendingQuantity = 8
	var trendingProducts = getTrendingProducts(products.length, trendingQuantity)

	return json({
		trendingProducts,
	})
}

export var getTrendingProducts = (range, outputCount) => {
	var arr = []
	for (var i = 0; i < range; i += 1) {
		arr.push(i)
	}

	var result = []
	for (var i = 1; i <= outputCount; i += 1) {
		var random = Math.floor(Math.random() * (range - i))
		result.push(arr[random])
		arr[random] = arr[range - i]
	}

	var trend = []
	for (var i = 0; i < result.length; i += 1) {
		trend.push(products[result[i]])
	}

	return trend
}
