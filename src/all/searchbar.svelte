<script>
	import { goto } from '$app/navigation'
	import { SearchIcon, XIcon, MicIcon } from 'svelte-feather-icons'
	import axios from 'axios'
	import { page } from '$app/stores'

	var searchTerm = $page.url.searchParams.get('searchTerm') || ''
	var categoryList = ['All', 'Tech']
	var category = categoryList[0]
	var pagination = '1'
	var suggestions = 'loading'
	var suggestionsOn = false
	var micOn = false

	suggestions
	$: if (suggestionsOn == true) {
		suggestions = 'loading'
		axios
			.post('/searchResults', {
				searchTerm: searchTerm.trim(),
				category,
				pagination,
			})
			.then((res) => {
				if (res.data.error) {
					error = res.data.error
				}
				suggestions = res.data.products.slice(0, 8)
			})
	}

	var startDictation = () => {
		if (window.hasOwnProperty('webkitSpeechRecognition')) {
			var recognition = new webkitSpeechRecognition()
			recognition.continuous = false
			recognition.interimResults = false
			recognition.lang = 'en-US'
			micOn = true
			recognition.start()
			recognition.onresult = function (e) {
				suggestionsOn = false
				searchTerm = e.results[0][0].transcript
				recognition.stop()
				micOn = false
				goto('/searchResults?searchTerm=' + searchTerm + '&category=All&pagination=1')
			}
			recognition.onerror = function (e) {
				recognition.stop()
				micOn = false
			}
		}
	}
</script>

<form
	class="relative w-full mr-5 w-full min-w-min md:flex text-black"
	on:submit|preventDefault={() => {
		if (searchTerm.trim() != '') {
			goto(
				'/searchResults?searchTerm=' +
					searchTerm +
					'&category=' +
					category +
					'&pagination=' +
					pagination,
			)
			suggestionsOn = false
		}
	}}
>
	<select bind:value={category} class="absolute inset-y-0 rounded-l-xl outline-none">
		{#each categoryList as category}
			<option value={category} class="w-10 bg-gray-100 py-2 px-4">
				{category}
			</option>
		{/each}
	</select>
	<input
		bind:value={searchTerm}
		on:input={function (event) {
			suggestionsOn = true
		}}
		list="suggestions"
		type="text"
		placeholder="search"
		class="rounded-l-xl rounded-r-xl w-full min-w-max bg-white py-2 pl-16 text-sm leading-tight text-black outline-none"
	/>
	{#if searchTerm.trim() != ''}
		<button
			on:click|preventDefault={() => {
				searchTerm = ''
			}}
			type="button"
			class="absolute inset-y-0 right-16 w-10 max-w-min items-center justify-center"
		>
			<XIcon class="h-4 w-4 text-black" />
		</button>
		<div class="absolute top-10 w-full bg-white rounded-t-xl rounded-b-xl">
			{#if suggestions == 'loading' && suggestionsOn == true}
				<p class="pl-2">Loading...</p>
			{:else if suggestions.length == 0 && suggestionsOn == true}
				<p class="pl-2">No results found.</p>
			{:else if suggestions.length > 0 && suggestionsOn == true}
				{#each suggestions as suggestion}
					<button
						on:click={() => {
							if (searchTerm.trim() != '') {
								goto(
									'/searchResults?searchTerm=' +
										suggestion.title +
										'&category=' +
										category +
										'&pagination=' +
										pagination,
								)
								suggestionsOn = false
								searchTerm = suggestion.title
							}
						}}
						type="button"
						class="block py-2 px-2 hover:bg-gray-200 hover:rounded-xl w-full text-left"
					>
						{suggestion.title}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
	<button
		type="submit"
		class="absolute inset-y-0 right-8 w-10 max-w-min mr-2 cursor-pointer items-center justify-center bg-white"
	>
		<SearchIcon class="h-4 w-4 stroke-black" />
	</button>
	<form
		on:submit|preventDefault={startDictation}
		class="absolute inset-y-0 right-0 flex justify-start"
	>
		<input type="text" name="searchTerm" hidden />
		<button type="submit">
			<MicIcon
				class={`${
					micOn ? 'stroke-red-800' : 'stroke-black'
				} h-8 w-8 bg-white py-2 pr-2 rounded-3xl hover:stroke-red-800`}
			/>
		</button>
	</form>
</form>
