<script>
	import { onMount } from 'svelte';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { page } from '$app/stores';

	var formValues = { email: '', subject: '', msg: '' };
	var error = '';

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
	});

	function formInput(event) {
		var { name, value } = event.target;
		formValues = { ...formValues, [name]: value };
	}

	async function formSubmit() {
		var res = await axios.post($page.url.pathname, formValues);
		if (res.data.error) {
			error = res.data.error;
			return;
		}
	}
</script>

<svelte:head><title>Email</title></svelte:head>

<div class="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
	<div class="w-full rounded bg-white px-6 py-8 text-black shadow-md">
		<h1 class="mb-8 text-center text-3xl">Email us</h1>
		<form on:submit|preventDefault={formSubmit}>
			<input
				name={'email'}
				value={formValues.email}
				on:input|preventDefault={formInput}
				type="text"
				placeholder="Email"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				name={'subject'}
				value={formValues.subject}
				on:input|preventDefault={formInput}
				type="text"
				placeholder="Subject"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<textarea
				name={'msg'}
				value={formValues.msg}
				on:input|preventDefault={formInput}
				type="text"
				placeholder="Message"
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>

			<button
				type="submit"
				class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white focus:outline-none"
			>
				Submit
			</button>
		</form>
		<div class="mt-10 text-red-500">{error}</div>
	</div>

	<div class="text-grey-dark mt-6">Didn't send? Email us manually at denify.shop@gmail.com</div>
</div>
