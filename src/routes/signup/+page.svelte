<script>
	import axios from 'axios'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { auth } from '@src/app.js'
	import { page } from '$app/stores'

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
	})

	var formData = { email: '', password: '', confirmPassword: '' }
	var error = ''

	async function formSubmit() {
		if (formData.password != formData.confirmPassword) {
			error = 'Passwords dont match'
			return
		}

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

<svelte:head><title>Sign up - Denify</title></svelte:head>

<div class="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
	<div class="w-full rounded bg-white px-6 py-8 text-black shadow-md">
		<p class="mb-8 text-center text-3xl">Sign up</p>
		<form
			on:submit|preventDefault={function () {
				formSubmit()
			}}
		>
			<input
				bind:value={formData.email}
				type="text"
				placeholder="Email"
				required
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				bind:value={formData.password}
				type="password"
				placeholder="Password"
				required
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				bind:value={formData.confirmPassword}
				type="password"
				placeholder="Confirm Password"
				required
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<button
				type="submit"
				class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white outline-none"
			>
				Sign up
			</button>
		</form>
		<div class="mt-10 text-red-500">{error}</div>
	</div>

	<div class="text-grey-dark mt-6">
		Already have an account?
		<button
			on:click={function () {
				goto('/signin')
			}}
			class="border-blue text-blue border-b no-underline">Sign in</button
		>
	</div>
</div>
