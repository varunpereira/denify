<script>
	import { StarIcon, PlusIcon, MinusIcon } from 'svelte-feather-icons'
	import { auth } from '@src/all/store.js'
	import axios from 'axios'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import cookie from 'js-cookie'

	var product = null
	var reviews = null
	var tab = 0
	var error = null
	var orderQuantity = 1

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		var res = await axios.post($page.url.pathname, {
			productId: $page.url.searchParams.get('productId'),
		})
		if (res.data.error) {
			error = res.data.error
		}
		product = res.data.product
		reviews = res.data.reviews
	})

	async function addToCart(productItem) {
		if (!$auth.user) {
			goto('/signin')
			return
		}
		if (orderQuantity < 1 || orderQuantity > product.stock) {
			error = 'Quantity not available from current stock levels.'
			return
		}
		var res = await axios.post($page.url.pathname + '/setInc', {
			email: $auth.user.email,
			product: productItem,
			productQuantity: orderQuantity,
		})
		$auth = {
			...$auth,
			cartQuantity: $auth.cartQuantity + orderQuantity,
		}
		cookie.set('auth', JSON.stringify($auth))
	}

	function minusButton() {
		if (orderQuantity >= 2) {
			orderQuantity = orderQuantity - 1
		}
	}

	function plusButton() {
		if (orderQuantity < product.stock) {
			orderQuantity = orderQuantity + 1
		}
	}

	function orderQuantityChange(event) {
		var qty = Number(event.target.value.trim())
		if (isNaN(qty)) {
			error = 'Quantity can only be natural number.'
		} else {
			orderQuantity = qty
		}
	}

	function leftArrow() {
		if (tab - 1 >= 0) {
			tab = tab - 1
			return
		}
		tab = product.images.length - 1
	}

	function rightArrow() {
		if (tab + 1 < product.images.length) {
			tab = tab + 1
			return
		}
		tab = 0
	}

	function addReview() {
		if (!$auth.user) {
			goto('/signin')
			return
		}
		goto('/product/addReview?productId=' + product._id)
	}
</script>

<svelte:head><title>Product Details - Denify</title></svelte:head>

{#if product && reviews}
	<div class="lg:flex justify-start ">
		<div class="flex justify-start">
			<div class="mr-2 flex-none">
				{#each product.images as image, index}
					{#if index == tab && index <= 6}
						<img
							on:click={() => {
								tab = index
							}}
							class={'w-12 h-12 mb-2 object-cover rounded-lg border-2 border-orange-400'}
							src={image.url}
							alt={image.url}
						/>
					{:else if index != tab && index <= 6}
						<img
							on:click={() => {
								tab = index
							}}
							class={'w-12 h-12 mb-2 object-cover rounded-lg'}
							src={image.url}
							alt={image.url}
						/>
					{/if}
				{/each}
			</div>
			<img
				class="w-[328px] h-[328px] md:w-[496px] md:h-[496px] object-contain rounded-lg border border-white"
				src={product.images[tab].url}
				alt={product.images[tab].url}
			/>
		</div>
		<div class="lg:ml-4 mt-4 lg:mt-0">
			<p class="mb-6 text-xl font-semibold">
				{product.title}
			</p>
			<button
				on:click={() => {
					goto('#reviews')
				}}
				class="hover:text-gray-300 mb-6"
			>
				View Reviews
			</button>
			<p class="text-xl font-semibold">${product.price}</p>
			<div>
				<p class="mb-5 mt-5">Description: <br />{product.description}</p>
				<p class="">Sold: {product.sold}</p>
				<p class="">Stock: {product.stock}</p>
				<div class="flex justify-start">
					<p class="mr-1">Seller:</p>
					<button
						on:click={() => {
							goto('/account/profile?email=' + product.email)
						}}
						class="hover:text-gray-300"
						>{product.email}
					</button>
				</div>
			</div>
			<div class="mt-5 mb-3">
				<button on:click={minusButton}><MinusIcon class="h-6 w-6 pt-[10px]" /></button>
				<input
					on:input={orderQuantityChange}
					value={orderQuantity}
					class="mx-2 w-10 h-8 rounded-sm text-center text-black flex-justify-start"
				/>
				<button on:click={plusButton}><PlusIcon class="h-6 w-6 pt-[10px]" /></button>
			</div>
			<button
				on:click={() => {
					addToCart(product)
				}}
				class="mt-5 flex w-24 items-center justify-center rounded bg-white py-4 text-black hover:bg-gray-400"
			>
				Add to Cart
			</button>
			{#if error}
				<div class="mt-10 text-red-500">{error}</div>
			{/if}
		</div>
	</div>
	<p class="mb-5 mt-20 text-xl font-semibold">Reviews</p>
	<button on:click={addReview} class="text-sm font-semibold hover:text-gray-300">
		Add a Review
	</button>
	<div id="reviews" class="mt-5 flex flex-wrap">
		{#if reviews.length == 0}
			<p>No Reviews</p>
		{:else}
			{#each reviews as review}
				<div
					key={review._id}
					class="mr-10 mb-10 h-40 w-40 max-w-sm rounded-lg border border-gray-200 bg-white p-3"
				>
					<p class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
						<button
							on:click={() => {
								goto('/account/profile?email=' + review.email)
							}}
							class="hover:text-gray-600"
							>{review.email}
						</button>
					</p>
					<div class="flex justify-start mb-2">
						{#each Array(review.rating) as _}
							<StarIcon class="w-4 h-4 stroke-black fill-black" />
						{/each}
						{#each Array(5 - review.rating) as _}
							<StarIcon class="w-4 h-4 stroke-black" />
						{/each}
					</div>
					<p class="mb-2 min-h-full text-xs font-normal text-gray-700">
						{review.description}
					</p>
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<p>Loading...</p>
{/if}
