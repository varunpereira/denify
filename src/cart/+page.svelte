<script>
	import { onMount } from 'svelte'
	import axios from 'axios'
	import { auth } from '@src/all/store.js'
	import { TrashIcon } from 'svelte-feather-icons'
	import { goto } from '$app/navigation'
	import cookie from 'js-cookie'
	import { page } from '$app/stores'

	var error = null
	var cart = null
	var fetch = false

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		getCart()
	})

	async function getCart() {
		var res = await axios.post($page.url.pathname, {
			email: JSON.parse(cookie.get('auth')).user.email,
		})
		if (res.data.error) {
			error = res.data.error
			return
		}
		cart = res.data.cart
	}

	$: if (fetch == true) {
		getCart()
		fetch = false
	}

	async function removeProduct(product) {
		var productData = {
			email: $auth.user.email,
			productId: product.productId,
			productQuantity: product.productQuantity,
			productPrice: product.productPrice,
		}
		var res = await axios.post($page.url.pathname + '/setDec', productData)
		if (res.data.error) {
			console.log('error')
			return
		}
		// cart = res.data.cart;
		fetch = true
		$auth = { ...$auth, cartQuantity: $auth.cartQuantity - product.productQuantity }
		cookie.set('auth', JSON.stringify($auth))
	}

	async function checkout() {
		if (cart.quantity <= 0) {
			error = 'Cart empty. Please add a product.'
			return
		}
		var products = cart.products.map(function (product) {
			return {
				name: product.productTitle,
				description: product.productId,
				amount: product.productPrice * 100,
				quantity: product.productQuantity,
				currency: 'aud',
			}
		})
		var res = await axios.post($page.url.pathname + '/getStripeCheckoutSession', {
			orderId: cart._id,
			items: products,
		})
		goto(res.data.session.url)
	}
</script>

<svelte:head><title>Cart - Denify</title></svelte:head>

{#if cart}
	<div class="mx-auto my-10 rounded-lg bg-white text-black shadow-md">
		<div class="rounded-lg bg-white px-10 py-10">
			<div class="flex justify-between border-b pb-8">
				<p class="text-2xl font-semibold">Shopping Cart</p>
				<p class="text-2xl font-semibold">{cart.quantity} Items</p>
			</div>
			<div class="mt-10 mb-5 flex">
				<p class="w-2/5 text-xs font-semibold uppercase text-gray-600">Product Details</p>
				<p class="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
					Quantity
				</p>
				<p class="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600">
					Total
				</p>
				<p class="w-1/5 text-center text-center text-xs font-semibold uppercase text-gray-600" />
			</div>

			{#each cart.products as product}
				<div key={product.productId} class="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100">
					<div class="flex w-2/5">
						<div class="ml-4 flex flex-grow flex-col justify-between">
							<button
								on:click={() => {
									goto('/product?productId=' + product.productId)
								}}
								class="flex hover:underline"
							>
								<p class="justify-start text-sm font-bold">
									{product.productTitle + ' (' + product.productId + ')'}
								</p>
							</button>
						</div>
					</div>
					<div class="text-sm3 w-1/5 text-center font-semibold">
						<i class="fa fa-minus mr-3 font-thin" aria-hidden="true" />
						{product.productQuantity}
						<i class="fa fa-plus ml-3 font-thin" aria-hidden="true" />
					</div>
					<p class="w-1/5 text-center text-sm font-semibold">
						${product.productQuantity * product.productPrice}
					</p>
					<button
						on:click|preventDefault={() => {
							removeProduct(product)
						}}
						class="w-1/5 text-center text-sm font-semibold hover:text-red-600"
					>
						<TrashIcon class="h-5 w-5" />
					</button>
				</div>
			{/each}
		</div>

		<div id="summary" class="px-8 py-10">
			<p class="border-b pb-8 text-2xl font-semibold">Order Summary</p>
			<div class="mt-10 mb-5 flex justify-between">
				<p class="text-sm font-semibold uppercase">
					Items {cart.quantity}
				</p>
				<p class="text-sm font-semibold">${cart.price}</p>
			</div>
			<div>
				<p class="mb-3 inline-block text-sm font-medium uppercase">Shipping</p>
				<select class="block w-full p-2 text-sm text-gray-600">
					<option>Standard shipping - Free</option>
				</select>
			</div>
			<div class="mt-8 border-t">
				<div class="flex justify-between py-6 text-sm font-semibold uppercase">
					<p>Total cost</p>
					<p>${cart.price}</p>
				</div>
				<button
					on:click|preventDefault={() => {
						checkout()
					}}
					type="button"
					class="w-full rounded bg-black py-3  text-sm font-semibold uppercase text-white hover:bg-gray-600"
				>
					Proceed to Payment
				</button>
				{#if error}
					<div class="mt-10 text-red-500">{error}</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}