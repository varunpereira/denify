<script>
	import axios from 'axios';
	import Product from '@src/components/product.svelte';
	import { auth } from '@src/utils/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	var orders = null;
	var error = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		var res = await axios.post('/api/user/account/getPayments', {
			email: JSON.parse(cookie.get('auth')).user.email
		});
		if (res.data.error) {
			error = res.data.error;
		}
		orders = res.data.orders;
	});

	async function refund(checkoutSessionId) {
		var res = await axios.post('/api/stripe/refund', {
			email: JSON.parse(cookie.get('auth')).user.email, checkoutSessionId
		});
		if (res.data.error) {
			error = res.data.error;
		}
		orders = res.data.orders;
	}
</script>

<svelte:head><title>Account Payments</title></svelte:head>

{#if orders}
	<div
		class="flex h-full w-full flex-col justify-center  rounded-sm border border-gray-200 bg-white pl-2 text-black shadow-lg"
	>
		<h1 class="text-lg font-semibold">Order History</h1>
		<div class="p-3">
			<div class="overflow-x-auto">
				<table class="w-full table-auto">
					<thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
						<tr>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">ID</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Qty</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Price</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Date</div>
							</th>
							<th class="whitespace-nowrap ">
								<div class="text-left font-semibold">Refund Status</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 text-sm">
						{#each orders as order, index}
							<tr key={order._id} class="my-4 text-black">
								<td>
									<a href={'/account/payments/order?orderId=' + order._id} class="hover:underline"
										>{order._id}</a
									>
								</td>
								<td>{order.quantity}</td>
								<td>${order.price}</td>
								<td>{order.updatedAt}</td>
								<td>
									{#if order.refunded}
										already refunded
									{:else}
										<button
											class="hover:underline"
											on:click={() => {
												refund(order.checkoutSessionId);
											}}
										>
											refund
										</button>
									{/if}
								</td>
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
