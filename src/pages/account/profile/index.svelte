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
	var pages = null;
	var pagination = 1;
	var error = null;
	var email = $page.url.searchParams.get('email');
	var newPagination = false;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		getProducts();
	});

	async function getProducts() {
		var res = await axios.post($page.url.pathname, {
			email,
			pagination
		});
		if (res.data.error) {
			error = res.data.error;
		}
		pages = res.data.pages;
		products = res.data.products;
	}

	$: if (newPagination == true) {
		getProducts();
		newPagination = false;
	}

	async function sendMessage() {
		if (!$auth.user) {
			goto('/signin');
			return;
		}
		if (email == $auth.user.email) {
			alert('Cant message yourself.');
			return;
		}
		var res = await axios.post($page.url.pathname + '/setContacts', {
			email: $auth.user.email,
			recipEmail: email
		});
		goto('/account/chats?recipEmail=' + email);
	}
</script>

<svelte:head><title>Account Profile - {email} - Denify</title></svelte:head>

{#if products && email}
	<p class="mb-5 text-lg font-semibold">{email}'s Products</p>
	<button
		on:click|preventDefault={function () {
			sendMessage();
		}}
		class=" mb-5 hover:text-gray-300 cursor-pointer"
	>
		Message
	</button>
	<div class="flex flex-wrap text-white">
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
				if (pagination > 1) {
					pagination -= 1;
					newPagination = true;
				}
			}}
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
		>
			<ArrowLeftIcon class="w-5 h-5" />
		</button>
		{#each Array(pages) as _, index}
			{#if pagination == index + 1}
				<button
					on:click={function () {
						pagination = index + 1;
						newPagination = true;
					}}
					class="relative z-10 inline-flex items-center border border-gray-500 bg-gray-300 px-4 py-2 text-sm font-medium text-indigo-600"
					>{index + 1}
				</button>
			{:else}
				<button
					on:click={function () {
						pagination = index + 1;
						newPagination = true;
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
					newPagination = true;
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
