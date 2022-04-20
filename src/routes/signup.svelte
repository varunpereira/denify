<script>
	import axios from 'axios';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { auth } from '@src/utils/store';

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
	});

	var formValues = { email: '', password: '', confirmPassword: '' };
	var error = '';

	function formInput(event) {
		var { name, value } = event.target;
		formValues = { ...formValues, [name]: value };
	}

	async function formSubmit() {
		if (formValues.password !== formValues.confirmPassword) {
			error = 'Passwords dont match';
			return;
		}

		var res = await axios.post('/api/user/signup', formValues);
		if (res.data.error) {
			error = res.data.error;
			return;
		}
		$auth = {
			accessToken: res.data.accessToken,
			user: res.data.user,
			cartQuantity: res.data.cartQuantity
		};
		cookie.set('auth', JSON.stringify($auth), {
			// 7 days
			expires: 7,
			secure: true,
			sameSite: 'strict'
		});
		goto('/');
	}
</script>

<svelte:head><title>Sign up</title></svelte:head>

<div class="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
	<div class="w-full rounded bg-white px-6 py-8 text-black shadow-md">
		<h1 class="mb-8 text-center text-3xl">Sign up</h1>
		<form on:submit|preventDefault={formSubmit}>
			<input
				name={'email'}
				value={formValues.email}
				on:input|preventDefault={formInput}
				type="text"
				placeholder="Email"
				required
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				name={'password'}
				value={formValues.password}
				on:input|preventDefault={formInput}
				type="password"
				placeholder="Password"
				required
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<input
				name={'confirmPassword'}
				value={formValues.confirmPassword}
				on:input|preventDefault={formInput}
				type="password"
				placeholder="Confirm Password"
				required
				class="border-grey-light mb-4 block w-full rounded border p-3"
			/>
			<button
				type="submit"
				class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white focus:outline-none"
			>
				Sign up
			</button>
		</form>
		<div class="mt-10 text-red-500">{error}</div>
	</div>

	<div class="text-grey-dark mt-6">
		Already have an account?
		<a href="/signin" class="border-blue text-blue border-b no-underline">Sign in</a>
	</div>
</div>
