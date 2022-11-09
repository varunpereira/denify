<script>
	import axios from 'axios'
	import { auth, apiSecret } from '@src/all/store.js'
	import { goto } from '$app/navigation'
	import cookie from 'js-cookie'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'

	var error = null
	var productId = $page.url.searchParams.get('productId').trim()
	var product = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		productId = $page.url.searchParams.get('productId').trim()
		var res = await axios.post($page.url.pathname, {
			$apiSecret,
			productId,
		})
		if (res.data.error) {
			error = res.data.error
		}
		product = res.data.product
	})
</script>

<svelte:head><title>Sell Status - Denify</title></svelte:head>
{#if product}
	<div
		class="container mx-auto flex max-w-md flex-1 flex-col  px-2 w-full rounded bg-white  px-20 py-8 text-black"
	>
		<p class="mb-8 text-xl">Sell Status for Product {product._id}:</p>
		<p class="mb-8 text-xl">{product.approved}</p>
		<p>You can view status of all your sales in your account's sales page.</p>
	</div>
{:else}
	<p>Loading...</p>
{/if}
