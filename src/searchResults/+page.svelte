<script>
	import axios from 'axios'
	import Product from '@src/product/product.svelte'
	import { auth } from '@src/all/store.js'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import { ArrowLeftIcon, ArrowRightIcon } from 'svelte-feather-icons'

	var products = null
	var error = null
	var pages = null
	var pageLoaded = false

	onMount(() => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		axios
			.post($page.url.pathname, {
				searchTerm: $page.url.searchParams.get('searchTerm').trim(),
				category: $page.url.searchParams.get('category').trim(),
				pagination: $page.url.searchParams.get('pagination').trim(),
			})
			.then(function (res) {
				if (res.data.error) {
					error = res.data.error
				}
				pages = res.data.pages
				products = res.data.products
			})
		pageLoaded = true
	})

	$: if (pageLoaded == true) {
		axios
			.post($page.url.pathname, {
				searchTerm: $page.url.searchParams.get('searchTerm').trim(),
				category: $page.url.searchParams.get('category').trim(),
				pagination: $page.url.searchParams.get('pagination').trim(),
			})
			.then(function (res) {
				if (res.data.error) {
					error = res.data.error
				}
				pages = res.data.pages
				products = res.data.products
			})
	}
</script>

<svelte:head><title>Search Results - Denify</title></svelte:head>

{#if products}
	<div class="flex flex-wrap w-full text-white pt-6">
		{#if products.length == 0}
			<p>No Products found.</p>
		{:else}
			{#each products as product}
				<Product {product} />
			{/each}
		{/if}
	</div>
	<div class="w-full relative z-0 inline-flex -space-x-px rounded-md shadow-sm pb-6">
		<button
			on:click={() => {
				if (Number($page.url.searchParams.get('pagination').trim()) > 1) {
					var pagination = String(Number($page.url.searchParams.get('pagination').trim()) - 1)
					goto(
						'/searchResults?searchTerm=' +
							$page.url.searchParams.get('searchTerm').trim() +
							'&category=' +
							$page.url.searchParams.get('category').trim() +
							'&pagination=' +
							pagination,
					)
				}
			}}
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
		>
			<ArrowLeftIcon class="w-5 h-5" />
		</button>
		{#each Array(pages) as _, index}
			{#if Number($page.url.searchParams.get('pagination').trim()) == index + 1}
				<button
					class="relative z-10 inline-flex items-center border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium"
					>{index + 1}
				</button>
			{:else}
				<button
					on:click={() => {
						var pagination = String(index + 1)
						goto(
							'/searchResults?searchTerm=' +
								$page.url.searchParams.get('searchTerm').trim() +
								'&category=' +
								$page.url.searchParams.get('category').trim() +
								'&pagination=' +
								pagination,
						)
					}}
					class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-200"
					>{index + 1}
				</button>
			{/if}
		{/each}
		<button
			on:click={() => {
				if (Number($page.url.searchParams.get('pagination').trim()) < pages) {
					var pagination = String(Number($page.url.searchParams.get('pagination').trim()) + 1)
					goto(
						'/searchResults?searchTerm=' +
							$page.url.searchParams.get('searchTerm').trim() +
							'&category=' +
							$page.url.searchParams.get('category').trim() +
							'&pagination=' +
							pagination,
					)
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
