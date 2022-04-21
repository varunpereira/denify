import db from '@src/utils/db';
import orderModel from '@src/models/orderModel';
import productModel from '@src/models/productModel';

db();

export async function post({ request }) {
	var { email, product, productQuantity } = await request.json();
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
	if (currentOrder.modifiedCount === 0) {
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
	return {
		body: { currentOrder }
	};
}
