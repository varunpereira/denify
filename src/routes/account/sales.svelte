<script>
	import axios from 'axios';
	import Product from '@src/components/product.svelte';
	import { auth } from '@src/utils/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	var products = null;
	var error = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		var res = await axios.post('/api/user/account/getSales', {
			email: JSON.parse(cookie.get('auth')).user.email
		});
		if (res.data.error) {
			error = res.data.error;
		}
		products = res.data.products;
	});
</script>

<svelte:head><title>Account Sales</title></svelte:head>

{#if products}
	<div class="rounded-lg bg-white pl-2 text-black ">
		<h1 class="text-2xl font-semibold">Your Products</h1>

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
								<div class="text-left font-semibold">Description</div>
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
								<td>{product.description}</td>
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
	<h1>Loading...</h1>
{/if}
