<script>
	import axios from 'axios'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { auth } from '@src/all/store.js'
	import { page } from '$app/stores'

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
	})

	var formData = { email: '', password: '' }
	var error = ''

	async function formSubmit() {
		var res = await axios.post($page.url.pathname, formData)
		if (res.data.error) {
			error = res.data.error
			return
		}
		$auth = {
			accessToken: res.data.accessToken,
			user: res.data.user,
			cartQuantity: res.data.cartQuantity,
		}
		cookie.set('auth', JSON.stringify($auth), {
			// 7 days
			expires: 7,
			secure: true,
			sameSite: 'strict',
		})
		goto('/')
	}
</script>

<svelte:head><title>Sign in - Denify</title></svelte:head>

<div class="py-12 container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
	<div class="w-full rounded-xl bg-white px-6 py-8 text-black shadow-2xl">
		<p class="mb-8 text-center text-3xl">Sign in</p>
		<form
			on:submit|preventDefault={() => {
				formSubmit()
			}}
		>
			<input
				bind:value={formData.email}
				type="text"
				placeholder="Email"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				bind:value={formData.password}
				type="password"
				placeholder="Password"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<button
				type="submit"
				class="my-1 w-full rounded border border-black py-3 text-center text-black"
			>
				Sign in
			</button>
		</form>
		<div class="mt-10 text-red-500 h-8">{error}</div>
	</div>

	<div class="text-grey-dark mt-6">
		Don't have an account?
		<button
			on:click={() => {
				goto('/signup')
			}}
			class="border-blue text-blue border-b no-underline">Sign up</button
		>
	</div>
</div>
