<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { auth } from '@src/utils/store';
	import { goto } from '$app/navigation';
	import cookie from 'js-cookie';
	import { page } from '$app/stores';

	var error = null;
	var cartPaid = false;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}

		var checkoutSessionId = $page.url.searchParams.get('checkoutSessionId');
		var res = await axios.post('/api/order/cart/paid', {
			email: JSON.parse(cookie.get('auth')).user.email,
			checkoutSessionId
		});
		if (res.data.cartPaid === true) {
			cartPaid = true;
			return;
		}
		$auth = { ...$auth, cartQuantity: 0 };
		cookie.set('auth', JSON.stringify($auth));
	});
</script>

<svelte:head><title>Payment Success</title></svelte:head>

{#if !cartPaid}
	<div class="rounded-lg bg-white pl-2 text-black">
		<h1 class="text-2xl font-semibold">Payment Success!</h1>
		<p>Check your email for the receipt.</p>
	</div>
{:else}
	<div class="rounded-lg bg-white pl-2 text-black">
		<h1 class="text-2xl font-semibold">Link expired</h1>
	</div>
{/if}
