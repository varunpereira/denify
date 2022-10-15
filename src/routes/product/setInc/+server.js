import { db } from '@src/routes/db/connect.js'
import orderModel from '@src/routes/model/order.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	var { email, product, productQuantity } = await request.json()
	// after validation
	var updateProduct = await productModel.updateOne(
		{ _id: product._id },
		{
			$inc: { sold: productQuantity, stock: -productQuantity },
		},
	)
	var currentOrder = await orderModel.updateOne(
		{
			email: email,
			current: true,
			products: { $elemMatch: { productId: product._id } },
		},
		{
			$inc: {
				'products.$.productQuantity': productQuantity,
				price: product.price * productQuantity,
				quantity: productQuantity,
			},
		},
	)
	if (currentOrder.modifiedCount == 0) {
		currentOrder = await orderModel.updateOne(
			{ email: email, current: true },
			{
				$push: {
					products: {
						productId: product._id,
						productQuantity: productQuantity,
						productTitle: product.title,
						productPrice: product.price,
					},
				},
				$inc: {
					price: product.price * productQuantity,
					quantity: productQuantity,
				},
			},
		)
	}
	return json({
		 currentOrder },
	)
}
