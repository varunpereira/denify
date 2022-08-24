<script>
	import axios from 'axios';
	import { auth } from '@src/provs/store.js';
	import { goto } from '$app/navigation';
	import cookie from 'js-cookie';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	var formData = null;
	var error = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		formData = {
			email: $auth.user.email,
			title: 'test',
			description: 'test',
			price: 0,
			images: [
				{
					url: 'https://res.cloudinary.com/devatchannel/image/upload/v1605318911/nextjs_media/nelvbtwdbk1vjvhufort.jpg'
				}
			],
			category: 'test',
			stock: 0,
			sold: 0
		};
	});

	function formInput(event) {
		let { name, value } = event.target;
		formData = { ...formData, [name]: value };
	}

	async function formSubmit() {
		try {
			var res = await axios.post($page.url.pathname, formData);
			if (res.data.error) {
				return;
			}
			goto('/product/sell/status?productId=' + res.data.product._id);
		} catch (resError) {
			console.log(resError.response.data.error);
		}
	}
</script>

<svelte:head><title>Sell - Denify</title></svelte:head>

{#if formData}
	<form
		class="container mx-auto flex max-w-md flex-1 flex-col  px-2 w-full rounded bg-white  px-20 py-8 text-black"
	>
		<p class="mb-8 text-center text-2xl">Sell a Product</p>
		<p>Title</p>
		<input
			name="title"
			value={formData.title}
			on:input={formInput}
			type="text"
			class="border-grey-light mb-4 block w-full rounded border p-3"
		/>
		<p>Description</p>
		<input
			name="description"
			value={formData.description}
			on:input={formInput}
			type="text"
			class="border-grey-light mb-4 w-full rounded border p-3"
		/>
		<p>Price</p>
		<input
			name="price"
			value={formData.price}
			on:input={formInput}
			type="text"
			class="border-grey-light mb-4 block w-full rounded border p-3"
		/>
		<p>Stock</p>
		<input
			name="stock"
			value={formData.stock}
			on:input={formInput}
			type="text"
			class="border-grey-light mb-4 block w-full rounded border p-3"
		/>
		<button
			on:click|preventDefault={formSubmit}
			type="submit"
			class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white focus:outline-none"
		>
			Sell
		</button>
	</form>
{/if}
