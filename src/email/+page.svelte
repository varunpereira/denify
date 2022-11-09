<script>
	import { onMount } from 'svelte'
	import { auth, apiSecret } from '@src/all/store.js'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import axios from 'axios'
	import { page } from '$app/stores'

	var formData = { email: '', subject: '', msg: '' }
	var error = ''

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
	})

	async function formSubmit() {
		var res = await axios.post($page.url.pathname, { $apiSecret, formData })
		if (res.data.error) {
			error = res.data.error
			return
		}
	}
</script>

<svelte:head><title>Email - Denify</title></svelte:head>

<div class="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
	<div class="w-full rounded bg-white px-6 py-8 text-black shadow-md">
		<p class="mb-8 text-center text-3xl">Email Us</p>
		<form
			on:submit|preventDefault={() => {
				formSubmit()
			}}
		>
			<input
				bind:value={formData.email}
				type="text"
				placehFolder="Email"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				bind:value={formData.subject}
				type="text"
				placeholder="Subject"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<textarea
				bind:value={formData.msg}
				type="text"
				placeholder="Message"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>

			<button
				type="submit"
				class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white outline-none"
			>
				Submit
			</button>
		</form>
		<div class="mt-10 text-red-500">{error}</div>
	</div>

	<div class="text-grey-dark mt-6">Didn't send? Email us at denify.shop@gmail.com</div>
</div>
