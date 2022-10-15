import { db } from '@src/routes/db/connect.js'
import orderModel from '@src/routes/model/order.js'
import productModel from '@src/routes/model/product.js'
import { json } from '@sveltejs/kit'

db()

export var POST = async ({ request }) => {
	var { email, productId, productPrice, productQuantity } = await request.json()
	var updateProduct = await productModel.updateOne(
		{ _id: productId },
		{
			$inc: { sold: -productQuantity, stock: productQuantity },
		},
	)
	var cart = await orderModel.findOneAndUpdate(
		{ email: email, current: true },
		{
			$pull: { products: { productId: productId } },
			$inc: {
				price: -productPrice * productQuantity,
				quantity: -productQuantity,
			},
		},
	)
	if (cart.modifiedCount == 0) {
		return json({
				err: 'No current order found for that email.',
			},
		)
	}
	return json({
			cart,
		},
	)
}
