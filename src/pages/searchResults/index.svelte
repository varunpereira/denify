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
	var pagination = Number($page.url.searchParams.get('pagination').trim());
	var pages = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		getProducts();
	});

	function getProducts() {
		axios
			.post($page.url.pathname, {
				searchTerm: $page.url.searchParams.get('searchTerm').trim(),
				category: $page.url.searchParams.get('category').trim(),
				pagination: $page.url.searchParams.get('pagination').trim()
			})
			.then(function (res) {
				if (res.data.error) {
					error = res.data.error;
				}
				pages = res.data.pages;
				products = res.data.products;
			});
	}

	$: {
		axios
			.post($page.url.pathname, {
				searchTerm: $page.url.searchParams.get('searchTerm').trim(),
				category: $page.url.searchParams.get('category').trim(),
				pagination: $page.url.searchParams.get('pagination').trim()
			})
			.then(function (res) {
				if (res.data.error) {
					error = res.data.error;
				}
				pages = res.data.pages;
				products = res.data.products;
			});
		console.table($page.url.searchParams.get('searchTerm').trim());
		console.table($page.url.searchParams.get('category').trim());
		console.table($page.url.searchParams.get('pagination').trim());
	}
</script>

<svelte:head><title>Search Results - Denify</title></svelte:head>

{#if products}
	<div class="flex flex-wrap w-full text-white">
		{#if products.length == 0}
			<p>No Products found.</p>
		{:else}
			{#each products as product}
				<Product {product} />
			{/each}
		{/if}
	</div>
	<div class="w-full relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
		<button
			on:click={function () {
				if (Number($page.url.searchParams.get('pagination').trim()) > 1) {
					goto(
						'/searchResults?searchTerm=' +
							$page.url.searchParams.get('searchTerm').trim() +
							'&category=' +
							$page.url.searchParams.get('category').trim() +
							'&pagination=' +
							$page.url.searchParams.get('pagination').trim()
					);
				}
			}}
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
		>
			<ArrowLeftIcon class="w-5 h-5" />
		</button>
		{#each Array(pages) as _, index}
			{#if Number($page.url.searchParams.get('pagination').trim()) == index + 1}
				<button
					class="relative z-10 inline-flex items-center border border-gray-500 bg-gray-300 px-4 py-2 text-sm font-medium text-indigo-600"
					>{index + 1}
				</button>
			{:else}
				<button
					on:click={function () {
						var pagination = String(index + 1);
						goto(
							'/searchResults?searchTerm=' +
								$page.url.searchParams.get('searchTerm').trim() +
								'&category=' +
								$page.url.searchParams.get('category').trim() +
								'&pagination=' +
								pagination
						);
					}}
					class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					>{index + 1}
				</button>
			{/if}
		{/each}
		<button
			on:click={function () {
				if (Number($page.url.searchParams.get('pagination').trim()) < pages) {
					goto(
						'/searchResults?searchTerm=' +
							$page.url.searchParams.get('searchTerm').trim() +
							'&category=' +
							$page.url.searchParams.get('category').trim() +
							'&pagination=' +
							$page.url.searchParams.get('pagination').trim()
					);
				}
			}}
			class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
		>
			<ArrowRightIcon class="w-5 h-5" />
		</button>
	</div>
{:else}
	<p>Loading...</p>
{/if}
