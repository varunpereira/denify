<script>
	import { goto } from '$app/navigation';
	import { SearchIcon, XIcon } from 'svelte-feather-icons';
	import axios from 'axios';

	var searchTerm = '';
	var categoryList = ['All', 'Tech'];
	var category = categoryList[0];
	var suggestions = 'loading';
	var pagination = '1';
	var suggestionsOff = false;

	async function getSuggestions() {
		suggestionsOff = false;
		suggestions = 'loading';
		var res = axios.post('/searchResults', {
			searchTerm: searchTerm.trim(),
			category: category.trim(),
			pagination: pagination.trim()
		});
		if (res.data.error) {
			error = res.data.error;
		}
		suggestions = res.data.products;
	}

	$: {
		getSuggestions();
	}
</script>

<form
	class="relative w-full mr-5 w-full min-w-min md:flex text-black"
	on:submit|preventDefault={function () {
		goto(
			'/searchResults?searchTerm=' +
				searchTerm +
				'&category=' +
				category +
				'&pagination=' +
				pagination
		);
		suggestionsOff = true;
	}}
>
	<select bind:value={category} class="absolute inset-y-0 rounded-l-md ">
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
		}}
		list="suggestions"
		type="text"
		placeholder="search"
		class="focus:shadow-outline w-full min-w-max bg-white py-2 pl-16 text-sm leading-tight text-black focus:outline-none rounded-md"
	/>
	{#if searchTerm.trim() != ''}
		<button
			on:click|preventDefault={function () {
				searchTerm = '';
			}}
			type="button"
			class="absolute inset-y-0 right-8 w-10 max-w-min items-center justify-center"
		>
			<XIcon class="h-4 w-4 text-black" />
		</button>
		<div class="absolute top-7 w-full bg-white rounded-md pt-4">
			{#if suggestions == 'loading' && suggestionsOff == false}
				<p class="pl-2">Loading...</p>
			{:else if suggestions.length == 0 && suggestionsOff == false}
				<p class="pl-2">No results found.</p>
			{:else if suggestions.length > 0 && suggestionsOff == false}
				{#each suggestions as suggestion}
					<button
						on:click={function () {
							goto(
								'/searchResults?searchTerm=' +
									suggestion.title +
									'&category=' +
									category +
									'&pagination=' +
									pagination,
								'_self'
							);
							suggestionsOff = true;
						}}
						type="button"
						class="block py-2 px-2 hover:bg-gray-300 hover:rounded-md w-full text-left"
					>
						{suggestion.title}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
	<button
		type="submit"
		class="absolute inset-y-0 right-0 w-10 max-w-min  cursor-pointer items-center justify-center bg-white pr-3 rounded-r-md"
	>
		<SearchIcon class="h-4 w-4 text-black" />
	</button>
</form>
