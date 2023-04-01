<script>
	import axios from 'axios'
	import { auth } from '@src/all/store.js'
	import { goto } from '$app/navigation'
	import cookie from 'js-cookie'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'

	var formData = {
		title: 'test',
		description: 'test',
		price: 0,
		images: [
			{
				url: 'https://res.cloudinary.com/devatchannel/image/upload/v1605318911/nextjs_media/nelvbtwdbk1vjvhufort.jpg',
			},
		],
		category: 'test',
		stock: 0,
		sold: 0,
	}
	var error = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		formData['email'] = $auth.user.email
	})

	async function formSubmit() {
		try {
			var res = await axios.post($page.url.pathname, { form: formData })
			if (res.data.error) {
				return
			}
			goto('/product/sell/status?productId=' + res.data.product._id)
		} catch (resError) {
			console.log(resError.response.data.error)
		}
	}
</script>

<svelte:head><title>Sell - Denify</title></svelte:head>

{#if formData}
	<form
		class="my-6 container mx-auto flex max-w-md flex-1 flex-col  px-2 w-full rounded bg-white  px-20 py-8 text-black"
	>
		<p class="mb-8 text-center text-2xl">Sell a Product</p>
		<p>Title</p>
		<input
			bind:value={formData.title}
			type="text"
			class="border-grey-light mb-4 block w-full rounded border p-3"
		/>
		<p>Description</p>
		<input
			bind:value={formData.description}
			type="text"
			class="border-grey-light mb-4 w-full rounded border p-3"
		/>
		<p>Price</p>
		<input
			bind:value={formData.price}
			type="text"
			class="border-grey-light mb-4 block w-full rounded border p-3"
		/>
		<p>Stock</p>
		<input
			bind:value={formData.stock}
			type="text"
			class="border-grey-light mb-4 block w-full rounded border p-3"
		/>
		<button
			on:click|preventDefault={formSubmit}
			type="submit"
			class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white outline-none"
		>
			Sell
		</button>
	</form>
{/if}
