<script>
	import axios from 'axios';
	import Product from '@src/pieces/product.svelte';
	import { auth } from '@src/provs/store.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import { ArrowLeftIcon, ArrowRightIcon } from 'svelte-feather-icons';

	var products = null;
	var error = null;
	var searchTerm = $page.url.searchParams.get('searchTerm').trim();
	var category = $page.url.searchParams.get('category').trim();
	var pagination = $page.url.searchParams.get('pagination').trim();
	var pages = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		getProducts();
	});

	async function getProducts() {
		var res = await axios.post($page.url.pathname, {
			searchTerm: $page.url.searchParams.get('searchTerm').trim(),
			category: $page.url.searchParams.get('category').trim(),
			pagination: $page.url.searchParams.get('pagination').trim()
		});
		if (res.data.error) {
			error = res.data.error;
		}
		pages = res.data.pages;
		products = res.data.products;
	}

	$: if (
		searchTerm != $page.url.searchParams.get('searchTerm').trim() ||
		category != $page.url.searchParams.get('category').trim() ||
		pagination != $page.url.searchParams.get('pagination').trim()
	) {
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
			<p>test</p>
			<div class="">
				<div
					class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
					aria-label="Pagination"
				>
					<button
						on:click={function () {
							if (pagination > 1) {
								pagination -= 1;
							}
						}}
						class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					>
						<span class="sr-only">Previous</span>
						<ArrowLeftIcon class="w-5 h-5" />
					</button>
					{#each Array(pages) as _, index}
						{#if pagination == index + 1}
							<button
								on:click={function () {
									pagination = index + 1;
								}}
								aria-current="page"
								class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
								>{index + 1}
							</button>
						{:else}
							<button
								on:click={function () {
									pagination = index + 1;
								}}
								class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
								>{index + 1}
							</button>
						{/if}
					{/each}
					<button
						on:click={function () {
							if (pagination < pages) {
								pagination += 1;
							}
						}}
						class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					>
						<span class="sr-only">Next</span>
						<ArrowRightIcon class="w-5 h-5" />
					</button>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<p>Loading...</p>
{/if}
