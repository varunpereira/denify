<script>
	import axios from 'axios'
	import { auth, signedOutCart } from '@src/all/store.js'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	export var product
	var error = null

	function addToCart() {
		if (product.stock == 0) {
			error = 'This product is out of stock.'
			return
		}

		if (!$auth.user) {
			var products = $signedOutCart.products
			if (products.length == 0) {
				products = [
					...products,
					{
						productId: product._id,
						productQuantity: 1,
						productPrice: product.price,
						productTitle: product.title,
					},
				]
			} else {
				var initQuantity = 0
				for (var i = 0; i < products.length; i += 1) {
					// already exists
					if (product._id == products[i].productId) {
						initQuantity = products[i].productQuantity
						products.splice(i, 1)
					}
				}
				products = [
					...products,
					{
						productId: product._id,
						productQuantity: initQuantity + 1,
						productPrice: product.price,
						productTitle: product.title,
					},
				]
			}
			$signedOutCart = {
				...$signedOutCart,
				price: $signedOutCart.price + product.price,
				quantity: $signedOutCart.quantity + 1,
				products: products,
			}
			cookie.set('signedOutCart', JSON.stringify($signedOutCart))
			return
		}

		var res = axios.post($page.url.pathname + '/setInc', {
			email: $auth.user.email,
			product,
			productQuantity: 1,
		})
		$auth = {
			...$auth,
			cartQuantity: $auth.cartQuantity + 1,
		}
		cookie.set('auth', JSON.stringify($auth))
	}
</script>

<div class="mb-4 mr-4 max-w-[16rem] max-h-[32rem] text-sm rounded-xl bg-gray-100 hover:bg-gray-200">
	<img
		class="h-44 w-96 rounded-t-xl object-cover"
		src={product.images[0].url}
		alt={product.images[0].url}
	/>
	<div class="mb-5 px-5 pt-5">
		<button
			on:click={() => {
				goto('/product?productId=' + product._id)
			}}
			class="h-16 font-bold tracking-tight text-gray-900 flex justify-start text-start hover:underline"
		>
			{product.title}
		</button>
		<p class="mb-2 font-bold tracking-tight text-gray-900 flex justify-start">
			${product.price}
		</p>
		<p class="h-28 font-normal text-gray-700 flex justify-start text-left">
			{product.description}
		</p>
		<button
			on:click|preventDefault={() => {
				addToCart()
			}}
			class="cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-black py-2 m font-medium text-white "
		>
			Add to Cart
		</button>
	</div>
</div>
