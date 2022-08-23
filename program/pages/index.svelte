<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { auth } from '@program/provs/store.js';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import Product from '@program/pieces/product.svelte';

	var products = null;
	var error = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		getProducts();
	});

	async function getProducts() {
		var res = await axios.post('/searchResults', {
			searchTerm: '',
			category: 'All'
		});
		if (res.data.error) {
			error = res.data.error;
		}
		products = res.data.products;
		console.table('products');
	}
</script>

<svelte:head><title>Home - Denify</title></svelte:head>

<img src="/homeBanner.png" alt="" class="w-full rounded-md mb-4" />

<p class="mb-5 text-xl font-semibold flex justify-center">Trending</p>

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
