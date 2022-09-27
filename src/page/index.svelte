<script>
	import axios from 'axios'
	import { onMount } from 'svelte'
	import { auth } from '@src/prev/store.js'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import Product from '@src/piece/product.svelte'
	import { TrendingUpIcon } from 'svelte-feather-icons'
	import { pic } from '@src/prov/homePic.js'

	var products = null
	var error = null
	var picIndex = 0

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		getProducts()
	})

	async function getProducts() {
		var res = await axios.post('/')
		if (res.data.error) {
			error = res.data.error
		}
		products = res.data.trendingProducts
	}

	$: {
		setTimeout(function () {
			if (picIndex == pic.length - 1) {
				picIndex = 0
			} else {
				picIndex += 1
			}
		}, 2000)
	}
</script>

<svelte:head><title>Home - Denify</title></svelte:head>

<img src={pic[picIndex]} alt="" class="w-full rounded-md mb-4" />

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
