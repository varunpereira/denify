<script>
	import axios from 'axios';
	import { auth } from '@src/provs/store.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import { ArrowUpCircleIcon } from 'svelte-feather-icons';

	var messages = null;
	var recipEmail = $page.url.searchParams.get('recipEmail');
	var error = null;
	var message = '';

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
		var res = await axios.post($page.url.pathname, {
			email: JSON.parse(cookie.get('auth')).user.email,
			recipEmail
		});
		if (res.data.error) {
			goto('/account/chats/contacts');
		}
		messages = res.data.messages.reverse();
	});

	async function sendMessage() {
		var res = await axios.post($page.url.pathname + '/putMessage', {
			email: JSON.parse(cookie.get('auth')).user.email,
			recipEmail,
			message
		});
		if (res.data.error) {
			goto('/account/chats/contacts');
		}
		messages = res.data.messages.reverse();
		message = '';
	}
</script>

<svelte:head><title>Account Chat - Denify</title></svelte:head>

{#if messages}
	<div class="rounded-3xl bg-white text-black md:mx-40 ">
		<p
			class="flex justify-center rounded-t-3xl border-b border-gray-400 py-2 text-xl font-semibold"
		>
			{recipEmail}
		</p>

		<div
			class="grid h-80 gap-3 overflow-auto py-3 text-white"
			style="display: flex;
			flex-direction: column-reverse;"
		>
			{#each messages as message, index}
				<div key={index} class="">
					{#if Object.keys(message)[0] == $auth.user.email}
						<div class="flex justify-end">
							<div class="mr-2 max-w-max rounded-t-full rounded-l-full bg-green-600 px-3 py-1">
								{message[$auth.user.email]}
							</div>
						</div>
					{:else}
						<div class="flex justify-start">
							<div class="ml-2 max-w-max rounded-t-full rounded-r-full bg-blue-600 px-3 py-1">
								{message[recipEmail]}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<form
			on:submit|preventDefault={function (){sendMessage()}}
			class="relative rounded-b-full p-2"
		>
			<input
				value={message}
				on:input|preventDefault={function (event) {message = event.target.value}}
				type="text"
				class="border border-gray-400 w-full min-w-max rounded-full bg-white py-2 pl-4 text-sm text-black focus:outline-none"
				placeholder="type message"
			/>
			<button
				type="submit"
				class="absolute inset-y-0 right-0 w-10 max-w-min items-center justify-center pr-2"
			>
				<ArrowUpCircleIcon class="h-6 w-6 rounded-full fill-green-500 stroke-white" />
			</button>
		</form>
	</div>
{:else}
	<p>Loading...</p>
{/if}
