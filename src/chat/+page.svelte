<script>
	import { websocketFrontend } from '@src/prov/db/websocketFrontend'
	import { onMount } from 'svelte'

	var textfield = ''
	var username = ''
	var messages = []

	onMount(() => {
		websocketFrontend.on('name', function (name) {
			username = name
		})
		websocketFrontend.on('message', function (message) {
			// Listen to the message event
			messages = [...messages, message]
		})
	})

	function sendMessage() {
		var message = textfield.trim()
		if (!message) {
			return
		}

		textfield = ''
		// Send the message
		websocketFrontend.emit('message', message)
	}
</script>

<div class="h-screen w-screen bg-zinc-800">
	<div class="h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col">
		<header
			class="px-6 py-4 border-b border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center justify-between"
		>
			<p class="font-bold text-xl">My Chat app</p>
			<p>{username}</p>
		</header>

		<div class="h-full w-full p-4">
			{#each messages as message}
				<div class="bg-zinc-300 rounded-xl rounded-tl-none px-4 py-3 my-4 w-fit">
					<p class="flex items-center space-between gap-4">
						<b>{message.from}</b>
						<i>{message.time}</i>
					</p>
					{message.message}
				</div>
			{/each}
		</div>

		<form
			on:submit|preventDefault={() => {
				sendMessage()
			}}
			class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
		>
			<input
				type="text"
				bind:value={textfield}
				placeholder="Type something..."
				class="bg-transparent border-none px-4 py-3 w-full"
			/>
			<button type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3">Send</button>
		</form>
	</div>
</div>
