<script>
	import axios from 'axios'
	import Product from '@src/product/product.svelte'
	import { auth } from '@src/all/store.js'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'

	var order = null
	var error = null
	var orderId = $page.url.searchParams.get('orderId')

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		var res = await axios.post($page.url.pathname, {
			orderId,
		})
		if (res.data.error) {
			error = res.data.error
		}
		order = res.data.order
	})
</script>

<svelte:head><title>Account Payment Order Details - Denify</title></svelte:head>

{#if order}
	<div class="my-6 p-6 rounded-lg bg-white text-black ">
		<p class="text-lg font-semibold">Past Order Details</p>
		<p>Order ID: {order._id}</p>
		<p>Order Quantity: {order.quantity}</p>
		<p>Order Price: ${order.price}</p>
		<p>Order Date: {order.updatedAt}</p>

		<div class="p-3">
			<div class="overflow-x-auto">
				<table class="w-full table-auto">
					<thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
						<tr>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Title</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">ID</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Qty</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Price</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 text-sm">
						{#each order.products as product}
							<tr key={product.productId} class="my-4 text-black">
								<td>{product.productTitle}</td>
								<td>{product.productId}</td>
								<td>{product.productQuantity}</td>
								<td>${product.productPrice}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}
