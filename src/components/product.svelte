<script>
	import axios from 'axios';

	export var product;
	var error = null;

	function addToCart(product) {
		if (product.stock === 0) {
			setError('This product is out of stock.');
			return;
		}
		axios
			.post('/api/order/cart/setInc', {
				email: getGlobalState('auth').user.email,
				product: product,
				productQuantity: 1
			})
			.then((res) => {
				setGlobalState('auth', {
					...getGlobalState('auth'),
					cartQuantity: getGlobalState('auth').cartQuantity + 1
				});
			});
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
			on:click={() => addToCart(product)}
			class="cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-black py-2 m font-medium text-white "
		>
			Add to Cart
		</button>
	</div>
</a>
