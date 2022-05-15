<script>
	import axios from 'axios';
	import { auth } from '@src/utils/store';
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
		var res = await axios.post('/api/user/account/chat/getMessages', {
			email: JSON.parse(cookie.get('auth')).user.email,
			recipEmail
		});
		if (res.data.error) {
			goto('/account/chats/contacts');
		}
		messages = res.data.messages.reverse();
	});

	async function sendMessage() {
		var res = await axios.post('/api/user/account/chat/addMessage', {
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

<svelte:head><title>Account Chat</title></svelte:head>

{#if messages}
	<div class="rounded-md bg-white text-black md:mx-40 ">
		<h1
			class="flex justify-center rounded-t-md border-2 border-gray-400 py-2 text-xl font-semibold"
		>
			{recipEmail}
		</h1>

		<div
			class="grid h-80 gap-3 overflow-auto py-3 text-white"
			style="display: flex;
			flex-direction: column-reverse;"
		>
			{#each messages as message, index}
				<div key={index} class="">
					{#if Object.keys(message)[0] === $auth.user.email}
						<div class="flex justify-end">
							<div class="mr-2 max-w-max rounded-t-3xl rounded-l-3xl bg-green-600 px-3 py-1">
								{message[$auth.user.email]}
							</div>
						</div>
					{:else}
						<div class="flex justify-start">
							<div class="ml-2 max-w-max rounded-t-3xl rounded-r-3xl  bg-blue-600 px-3 py-1">
								{message[recipEmail]}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<form
			on:submit|preventDefault={sendMessage}
			class="relative w-full rounded-b-md border-2 border-gray-400"
		>
			<input
				value={message}
				on:input|preventDefault={(event) => (message = event.target.value)}
				type="text"
				class="focus:shadow-outline w-full min-w-max rounded-b-md bg-white  py-2 pl-2 text-sm leading-tight text-black focus:outline-none"
				placeholder="type message"
			/>
			<button
				type="submit"
				class="absolute inset-y-0 right-0 w-10  max-w-min items-center justify-center rounded-b-md bg-white pr-2"
			>
				<ArrowUpCircleIcon class="h-6 w-6 rounded-lg fill-green-500 text-white" />
			</button>
		</form>
	</div>
{:else}
	<h1>Loading...</h1>
{/if}
