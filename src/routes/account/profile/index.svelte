<script>
	import axios from 'axios';
	import Product from '@src/pieces/product.svelte';
	import { auth } from '@src/utils/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	var products = null;
	var error = null;
	var email = $page.url.searchParams.get('email');

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		var res = await axios.post($page.url.pathname, {
			email
		});
		if (res.data.error) {
			error = res.data.error;
		}
		products = res.data.products;
	});

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

<svelte:head><title>Account Profile - {email}</title></svelte:head>

{#if products && email}
	<p class="mb-5 text-lg font-semibold">{email}'s Products</p>
	<button
		on:click={function () {
			sendMessage();
		}}
		class=" mb-5 hover:text-gray-400 cursor-pointer"
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
{:else}
	<p>Loading...</p>
{/if}
