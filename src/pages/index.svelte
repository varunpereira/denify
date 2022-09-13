<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { auth } from '@src/provs/store.js';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import Product from '@src/pieces/product.svelte';
	import { TrendingUpIcon } from 'svelte-feather-icons';

	var products = null;
	var error = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		getProducts();
	});

	async function getProducts() {
		var res = await axios.post('/');
		if (res.data.error) {
			error = res.data.error;
		}
		products = res.data.trendingProducts;
	}
</script>

<svelte:head><title>Home - Denify</title></svelte:head>

<img src="/homeBanner.png" alt="" class="w-full rounded-md mb-4" />

<div class="flex justify-center">
	<TrendingUpIcon class="w-6 h-6 mr-2 mt-1" />
	<p class="mb-5 text-xl font-semibold flex justify-center">Trending</p>
</div>


{#if products}
	<div class="flex flex-wrap text-white">
		{#if products.length == 0}
			<p>No Products found.</p>
		{:else}
			{#each products as product}
				<Product {product} />
			{/each}
		{/if}
	</div>
{:else}
	<p>Loading...</p>
{/if}
