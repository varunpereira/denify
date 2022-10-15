<script>
	import axios from 'axios'
	import Product from '@src/routes/product/product.svelte'
	import { auth } from '@src/app.js'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'

	var products = null
	var error = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		var res = await axios.post($page.url.pathname, {
			email: JSON.parse(cookie.get('auth')).user.email,
		})
		if (res.data.error) {
			error = res.data.error
		}
		products = res.data.products
	})
</script>

<svelte:head><title>Account Sales - Denify</title></svelte:head>

{#if products}
	<div class="rounded-lg bg-white pl-2 text-black ">
		<p class="text-2xl font-semibold">Your Products</p>

		<div class="p-3">
			<div class="overflow-x-auto">
				<table class="w-full table-auto">
					<thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
						<tr>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">ID</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Title</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Approved Status</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Category</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Price</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Sold</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Stock</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 text-sm">
						{#each products as product}
							<tr key={product._id} class="my-4 text-black">
								<td>{product._id}</td>
								<td> {product.title}</td>
								<td>{product.approved}</td>
								<td>{product.category}</td>
								<td>${product.price}</td>
								<td>{product.sold}</td>
								<td> {product.stock}</td>
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
