import { db } from '@src/prov/db/connect.js'
import bcryptjs from 'bcryptjs'
import { PUBLIC_apiSecret } from '$env/static/public';
import orderModel from '@src/prov/model/order.js';
import productModel from '@src/prov/model/product.js';
import { json } from '@sveltejs/kit'

db();

export var POST = async ({ request }) => {
	var { $apiSecret, email, product, productQuantity } = await request.json()
// api security
	var isMatch = bcryptjs.compareSync(PUBLIC_apiSecret, $apiSecret)
	if (isMatch == false) {
		return json({
			authorised: false,
		})
	}
;
	// after validation
	var updateProduct = await productModel.updateOne(
		{ _id: product._id },
		{
			$inc: { sold: productQuantity, stock: -productQuantity }
		}
	);
	var currentOrder = await orderModel.updateOne(
		{
			email: email,
			current: true,
			products: { $elemMatch: { productId: product._id } }
		},
		{
			$inc: {
				'products.$.productQuantity': productQuantity,
				price: product.price * productQuantity,
				quantity: productQuantity
			}
		}
	);
	if (currentOrder.modifiedCount == 0) {
		currentOrder = await orderModel.updateOne(
			{ email: email, current: true },
			{
				$push: {
					products: {
						productId: product._id,
						productQuantity: productQuantity,
						productTitle: product.title,
						productPrice: product.price
					}
				},
				$inc: {
					price: product.price * productQuantity,
					quantity: productQuantity
				}
			}
		);
	}
	return json({
		 currentOrder }
	)
}
