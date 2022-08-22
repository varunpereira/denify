<script>
	import axios from 'axios';
	import Product from '@src/pieces/product.svelte';
	import { auth } from '@src/provs/store.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	var products = null;
	var error = null;
	var searchTerm = $page.url.searchParams.get('searchTerm').trim();

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		getProducts();
	});

	async function getProducts() {
		var res = await axios.post($page.url.pathname, {
			searchTerm: $page.url.searchParams.get('searchTerm').trim()
		});
		if (res.data.error) {
			error = res.data.error;
		}
		products = res.data.products;
	}

	$: if (searchTerm != $page.url.searchParams.get('searchTerm').trim()) {
		getProducts();
	}
</script>

<svelte:head><title>Search Results - Denify</title></svelte:head>

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
