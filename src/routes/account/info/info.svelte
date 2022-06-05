<script>
	import axios from 'axios';
	import Product from '@src/components/product.svelte';
	import { auth } from '@src/utils/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	var user = null;
	var error = null;

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		var res = await axios.post('/api/user/account/getInfo', {
			email: JSON.parse(cookie.get('auth')).user.email
		});
		if (res.data.error) {
			error = res.data.error;
		}
		user = res.data.user;
	});
</script>

<svelte:head><title>Account Info</title></svelte:head>

{#if user}
	<div class="rounded-lg bg-white pl-2 text-black">
		<h1 class=" text-lg font-semibold">Account Details</h1>
		<div>
			<p>
				<b>Email:</b>
				{user.email}
			</p>
			<p>
				<b>Joined:</b>
				{user.createdAt}
			</p>
		</div>
	</div>
{:else}
	<h1>Loading...</h1>
{/if}
