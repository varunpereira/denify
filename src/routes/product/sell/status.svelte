<script>
	import axios from 'axios';
	import { auth } from '@src/provs/store.js';
	import { goto } from '$app/navigation';
	import cookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	var error = null;
	var productId = $page.url.searchParams.get('productId').trim();

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		productId = $page.url.searchParams.get('productId').trim();
	});
</script>

<svelte:head><title>Sell Status - Denify</title></svelte:head>

<div
	class="container mx-auto flex max-w-md flex-1 flex-col  px-2 w-full rounded bg-white  px-20 py-8 text-black"
>
	<p class="mb-8 text-center text-2xl">Sell Status for Product {productId}</p>
	<p>Pending.</p>
	<p>You can view status of all your sales in your account's sales page.</p>
</div>
