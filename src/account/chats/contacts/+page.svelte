<script>
	import axios from 'axios'
	import Product from '@src/product/product.svelte'
	import { auth } from '@src/all/store.js'
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
		if (res.data.error != null) {
			error = res.data.error
			goto('error/noUser')
		}
		user = res.data.user
	})
</script>

<svelte:head><title>Account Contacts - Denify</title></svelte:head>

{#if user}
	<div class="my-6 rounded-lg pb-2 bg-white text-black">
		<p class="mb-5 pt-4 pl-2 text-lg font-semibold">Your Messages</p>
		{#each user.contacts as contact, index}
			<button
				key={index}
				on:click={() => {
					goto('/account/chats?recipEmail=' + contact)
				}}
			>
				<div class="mx-2 mb-2 rounded-md border-2 border-gray-600 hover:bg-gray-200">
					{contact}
				</div>
			</button>
		{/each}
	</div>
{:else}
	<p>Loading...</p>
{/if}
