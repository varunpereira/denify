<script>
	import axios from 'axios'
	import Product from '@src/routes/product/product.svelte'
	import { auth } from '@src/app.js'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'

	var user = null
	var error = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		var res = await axios.post($page.url.pathname, {
			email: JSON.parse(cookie.get('auth')).user.email,
		})
		if (res.data.error) {
			error = res.data.error
		}
		user = res.data.user
	})
</script>

<svelte:head><title>Account Info - Denify</title></svelte:head>

{#if user}
	<div class="rounded-lg bg-white pl-2 text-black">
		<p class=" text-lg font-semibold">Account Details</p>
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
	<p>Loading...</p>
{/if}
