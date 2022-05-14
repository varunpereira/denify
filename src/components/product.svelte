<script>
	import axios from 'axios';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	export var product;
	var error = null;

	function addToCart() {
		if(!$auth.user){
			goto('/signin');
			return
		}

		if (product.stock === 0) {
			error = 'This product is out of stock.';
			return;
		}
		var res = axios.post('/api/order/cart/setInc', {
			email: $auth.user.email,
			product,
			productQuantity: 1
		});
		$auth = {
			...$auth,
			cartQuantity: $auth.cartQuantity + 1
		};
		cookie.set('auth', JSON.stringify($auth));
	}
</script>

<a
	href={'/product?productId=' + product._id}
	class="mb-4 mr-4 max-w-[16rem] max-h-[32rem] text-sm rounded-lg bg-white hover:bg-gray-300 "
>
	<img
		class="h-44 w-96 rounded-t-lg object-cover"
		src={product.images[0].url}
		alt={product.images[0].url}
	/>
	<div class="mb-5 px-5 pt-5">
		<h5 class="h-16  font-bold tracking-tight text-gray-900 ">
			{product.title}
		</h5>
		<h5 class="mb-2 font-bold tracking-tight text-gray-900 ">
			${product.price}
		</h5>
		<p class="h-28 font-normal text-gray-700">
			{product.description}
		</p>
		<button
			on:click|preventDefault={addToCart}
			class="cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-black py-2 m font-medium text-white "
		>
			Add to Cart
		</button>
	</div>
</a>
