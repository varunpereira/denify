import db from '@src/provs/db';
import orderModel from '@src/prots/order';
import productModel from '@src/prots/product';

db();

export async function post({ request }) {
	var { email, productId, productPrice, productQuantity } = await request.json();
	var updateProduct = await productModel.updateOne(
		{ _id: productId },
		{
			$inc: { sold: -productQuantity, stock: productQuantity }
		}
	);
	var cart = await orderModel.findOneAndUpdate(
		{ email: email, current: true },
		{
			$pull: { products: { productId: productId } },
			$inc: {
				price: -productPrice * productQuantity,
				quantity: -productQuantity
			}
		}
	);
	if (cart.modifiedCount == 0) {
		return {
			body: {
				err: 'No current order found for that email.'
			}
		};
	}
	return {
		body: {
			cart
		}
	};
}