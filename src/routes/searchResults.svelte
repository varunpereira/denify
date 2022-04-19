<script>
	import axios from 'axios';
	import Product from '@src/components/product.svelte';
	import { auth } from '@src/utils/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';

	var searchTerm = $page.url.searchParams.get('searchTerm').trim();
	var products = null;
	var error = null;

	onMount(async function () {
		$auth = JSON.parse(cookie.get('auth'));
		var res = await axios.post('/api/product/getManyByTitle', { searchTerm });
		if (res.data.error) {
			error = res.data.error;
		}
		products = res.data.products;
	});
</script>

<svelte:head><title>Search Results</title></svelte:head>

{#if products}
	<div class="flex flex-wrap text-white">
		{#if products.length === 0}
			<h2>No Products found.</h2>
		{:else}
			{#each products as product}
				<Product {product} />
			{/each}
		{/if}
	</div>
{/if}
