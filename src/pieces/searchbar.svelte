<script>
	import { goto } from '$app/navigation';
	import { SearchIcon, XIcon, MicIcon } from 'svelte-feather-icons';
	import axios from 'axios';
	import { page } from '$app/stores';

	var searchTerm = '';
	var categoryList = ['All', 'Tech'];
	var category = categoryList[0];
	var suggestions = 'loading';
	var pagination = '1';
	var suggestionsOn = true;

	// suggestions
	$: if (suggestionsOn == true) {
		suggestions = 'loading';
		axios
			.post('/searchResults', {
				searchTerm: searchTerm.trim(),
				category: category.trim(),
				pagination: pagination.trim()
			})
			.then(function (res) {
				if (res.data.error) {
					error = res.data.error;
				}
				suggestions = res.data.products.slice(0, 8);
			});
	}

	function startDictation() {
		if (window.hasOwnProperty('webkitSpeechRecognition')) {
			var recognition = new webkitSpeechRecognition();
			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.lang = 'en-US';
			recognition.start();
			recognition.onresult = function (e) {
				suggestionsOn = false;
				searchTerm = e.results[0][0].transcript;
				recognition.stop();
				goto('/searchResults?searchTerm=' + searchTerm + '&category=1&pagination=1');
			};
			recognition.onerror = function (e) {
				recognition.stop();
			};
		}
	}
</script>

<form
	class="relative w-full mr-5 w-full min-w-min md:flex text-black"
	on:submit|preventDefault={function () {
		if (searchTerm.trim() != '') {
			goto(
				'/searchResults?searchTerm=' +
					searchTerm +
					'&category=' +
					category +
					'&pagination=' +
					pagination
			);
			suggestionsOn = false;
		}
	}}
>
	<select bind:value={category} class="absolute inset-y-0 rounded-l-sm ">
		{#each categoryList as category}
			<option value={category} class="w-10 bg-gray-100 py-2 px-4">
				{category}
			</option>
		{/each}
	</select>
	<input
		value={searchTerm}
		on:input={function (event) {
			searchTerm = event.target.value;
			suggestionsOn = true;
		}}
		list="suggestions"
		type="text"
		placeholder="search"
		class="focus:shadow-outline w-full min-w-max bg-white py-2 pl-16 text-sm leading-tight text-black focus:outline-none"
	/>
	{#if searchTerm.trim() != ''}
		<button
			on:click|preventDefault={function () {
				searchTerm = '';
			}}
			type="button"
			class="absolute inset-y-0 right-16 w-10 max-w-min items-center justify-center"
		>
			<XIcon class="h-4 w-4 text-black" />
		</button>
		<div class="absolute top-7 w-full bg-white rounded-sm">
			{#if suggestions == 'loading' && suggestionsOn == true}
				<p class="pl-2">Loading...</p>
			{:else if suggestions.length == 0 && suggestionsOn == true}
				<p class="pl-2">No results found.</p>
			{:else if suggestions.length > 0 && suggestionsOn == true}
				<div class="pb-2" />
				{#each suggestions as suggestion}
					<button
						on:click={function () {
							if (searchTerm.trim() != '') {
								goto(
									'/searchResults?searchTerm=' +
										suggestion.title +
										'&category=' +
										category +
										'&pagination=' +
										pagination
								);
								suggestionsOn = false;
								searchTerm = suggestion.title;
							}
						}}
						type="button"
						class="block py-2 px-2 hover:bg-gray-300 hover:rounded-sm w-full text-left"
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
		<SearchIcon class="h-4 w-4 text-black" />
	</button>
	<form
		on:submit|preventDefault={startDictation}
		class="absolute inset-y-0 right-0 flex justify-start rounded-r-sm"
	>
		<input type="text" name="searchTerm" hidden />
		<button type="submit">
			<MicIcon class="h-8 w-8 text-black bg-white py-2 pr-2 rounded-r-sm" />
		</button>
	</form>
</form>
