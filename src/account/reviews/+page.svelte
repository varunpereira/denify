<script>
	import axios from 'axios'
	import Product from '@src/product/product.svelte'
	import { auth } from '@src/all/store.js'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'

	var reviews = null
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
		reviews = res.data.reviews
	})
</script>

<svelte:head><title>Account Reviews - Denify</title></svelte:head>

{#if reviews}
	<div class="my-6 p-6 pl-2 rounded-lg bg-white text-black ">
		<p class="text-2xl font-semibold">Reviews</p>
		<div class="p-3">
			<div class="overflow-x-auto">
				<table class="w-full table-auto">
					<thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
						<tr>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Review ID</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Product ID</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Rating</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Description</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 text-sm">
						{#each reviews as review}
							<tr key={review._id} class="my-4 text-black">
								<td>{review._id}</td>
								<td>{review.productId}</td>
								<td>{review.rating}/5</td>
								<td>{review.description}</td>
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
