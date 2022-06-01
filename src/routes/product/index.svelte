<script>
	import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, MinusIcon } from 'svelte-feather-icons';
	import { auth } from '@src/utils/store';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import cookie from 'js-cookie';

	var product = null;
	var reviews = null;
	var tab = 0;
	var error = null;
	var orderQuantity = 1;
	var productId = $page.url.searchParams.get('productId');

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		var res = await axios.post('/api/product/getOneAndGetReview', {
			productId
		});
		if (res.data.error) {
			error = res.data.error;
		}
		product = res.data.product;
		reviews = res.data.reviews;
	});

	function addToCart(productItem) {
		if (!$auth.user) {
			goto('/signin');
			return;
		}
		if (orderQuantity < 1 || orderQuantity > product.stock) {
			error = 'Quantity not available from current stock levels.';
			return;
		}
		var res = axios.post('/api/order/cart/setInc', {
			email: $auth.user.email,
			product: productItem,
			productQuantity: orderQuantity
		});
		$auth = {
			...$auth,
			cartQuantity: $auth.cartQuantity + orderQuantity
		};
		cookie.set('auth', JSON.stringify($auth));
	}

	function minusButton() {
		if (orderQuantity >= 2) {
			orderQuantity = orderQuantity - 1;
		}
	}

	function plusButton() {
		if (orderQuantity < product.stock) {
			orderQuantity = orderQuantity + 1;
		}
	}

	function orderQuantityChange(event) {
		let qty = Number(event.target.value.trim());
		if (isNaN(qty)) {
			error = 'Quantity can only be natural number.';
			return;
		}
		orderQuantity = qty;
	}

	function leftArrow() {
		if (tab - 1 >= 0) {
			tab = tab - 1;
			return;
		}
		tab = product.images.length - 1;
	}

	function rightArrow() {
		if (tab + 1 < product.images.length) {
			tab = tab + 1;
			return;
		}
		tab = 0;
	}

	function addReview() {
		if (!$auth.user) {
			console.log(JSON.stringify($auth));
			goto('/signin');
			return;
		}
		goto('/product/addReview?productId=' + product._id);
	}
</script>

<svelte:head><title>Product Details</title></svelte:head>

{#if product && reviews}
	<div class=" items-start justify-center  md:flex ">
		<div class="relative">
			<img class="w-full rounded-lg" src={product.images[tab].url} alt={product.images[0].url} />
			<button on:click={leftArrow} class="absolute inset-y-0 left-0" type="button">
				<ChevronLeftIcon class="h-6 w-6 text-white bg-black rounded-full" />
			</button> 
			<button on:click={rightArrow} class="absolute inset-y-0 right-0" type="button">
				<ChevronRightIcon class="h-6 w-6 text-white bg-black rounded-full" />
			</button>
		</div>
		<div class="mt-6 md:ml-6 md:mt-0 md:w-1/2 lg:ml-8 xl:w-2/5">
			<div class="border-gray-200 pb-6">
				<h1 class="text-xl font-semibold leading-7 lg:text-2xl lg:leading-6">
					{product.title}
				</h1>
			</div>
			<a href="#reviews" class="hover:text-gray-400 "> View Reviews </a>
			<div>
				<p class="mb-5 mt-5">Description: {product.description}</p>
				<p class="">Price: ${product.price}</p>
				<p class="">Sold: {product.sold}</p>
				<p class="">In Stock: {product.stock}</p>
				<p class="">
					Seller:{' '}
					<a href={'/account/profile?email=' + product.email} class="hover:text-gray-400"
						>{product.email}</a
					>
				</p>
			</div>
			<div class="mt-5 mb-3">
				<button on:click|preventDefault={minusButton}><MinusIcon class="h-6 w-6 pt-2" /></button>
				<input
					on:input={orderQuantityChange}
					value={orderQuantity}
					class="mx-2 w-10 rounded text-center text-black"
					type="text"
				/>
				<button on:click|preventDefault={plusButton}><PlusIcon class="h-6 w-6 pt-2" /></button>
			</div>
			<button
				on:click={function () {
					addToCart(product);
				}}
				type="button"
				class="mt-5 flex w-full items-center justify-center rounded bg-white py-4 text-black hover:bg-gray-400"
			>
				Add to Cart
			</button>
			{#if error}
				<div class="mt-10 text-red-500">{error}</div>
			{/if}
		</div>
	</div>
	<h1 class="mb-5 mt-20 text-xl font-semibold">Reviews</h1>
	<button on:click|preventDefault={addReview} class="text-sm font-semibold hover:text-gray-400">
		Add a Review
	</button>
	<div id="reviews" class="mt-5 flex flex-wrap">
		{#if reviews.length === 0}
			<h1>No Reviews</h1>
		{:else}
			{#each reviews as review}
				<div
					key={review._id}
					class="mr-10 mb-10 h-40 w-40 max-w-sm rounded-lg border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800"
				>
					<h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
						<a href={'/account/profile?email=' + review.email} class="hover:text-gray-600"
							>{review.email}</a
						>
					</h5>
					<h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
						{review.rating} / 5 stars
					</h5>
					<p class="mb-3 min-h-full text-xs font-normal text-gray-700 dark:text-gray-400">
						{review.description}
					</p>
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<h1>Loading...</h1>
{/if}
