import db from '@src/provs/db';
import productModel from '@src/prots/product';

db();

export var products = [];

export async function post({ request }) {
	products = await productModel.find({
		approved: 'true'
	});

	var trendingQuantity = 8;
	var trendingProducts = getTrendingProducts(products.length, trendingQuantity);

	return {
		body: {
			trendingProducts
		}
	};
}

export function getTrendingProducts(range, outputCount) {
	var arr = [];
	for (var i = 0; i < range; i += 1) {
		arr.push(i);
	}

	var result = [];
	for (var i = 1; i <= outputCount; i+=1) {
		var random = Math.floor(Math.random() * (range - i));
		result.push(arr[random]);
		arr[random] = arr[range - i];
	}

	var trend = [];
	for (var i = 0; i < result.length; i += 1) {
		trend.push(products[result[i]]);
	}

	return trend;
}
