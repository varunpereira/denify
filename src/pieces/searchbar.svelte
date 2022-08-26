<script>
	import { goto } from '$app/navigation';
	import { SearchIcon, XIcon } from 'svelte-feather-icons';
	import axios from 'axios';

	var searchTerm = '';
	var categoryList = ['All', 'Tech'];
	var category = categoryList[0];
	var suggestions = 'loading';

	$: {
		suggestions = 'loading';
		axios
			.post('/searchResults', {
				searchTerm: searchTerm.trim(),
				category: category.trim()
			})
			.then(function (res) {
				if (res.data.error) {
					error = res.data.error;
				}
				suggestions = res.data.products;
			});
	}
</script>

<div class="mr-5 max-h-min w-full min-w-min pb-1 md:pb-0 shadow-md md:flex text-black">
	<form
		class="relative w-full"
		on:submit|preventDefault={function () {
			goto('/searchResults?searchTerm=' + searchTerm + '&category=' + category);
			searchTerm = '';
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
			list="suggestionList"
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
				class="absolute inset-y-0 right-8 w-10  max-w-min items-center justify-center"
			>
				<XIcon class="h-4 w-4 text-black" />
			</button>

			<datalist id="suggestionList" class="absolute bg-white rounded-b-md ml-12">
				{#if suggestions == 'loading'}
					<option>Loading...</option>
				{:else if suggestions.length == 0}
					<option>No results found.</option>
					<!-- {:else if suggestions.length > 0}
					{#each suggestions as suggestion}
						<option>
							<a
								href={'/searchResults?searchTerm=' + suggestion.title + '&category=' + category}
								on:click={function () {
									searchTerm = '';
								}}
								class="block hover:bg-gray-300 py-2 px-2 hover:rounded-b-md"
							>
								{suggestion.title}
							</a>
						</option>
					{/each} -->
				{/if}
			</datalist>

			<div class="absolute bg-white rounded-b-md ml-12">
				{#if suggestions == 'loading'}
					<p>Loading...</p>
				{:else if suggestions.length == 0}
					<p>No results found.</p>
				{:else if suggestions.length > 0}
					{#each suggestions as suggestion}
						<a
							href={'/searchResults?searchTerm=' + suggestion.title + '&category=' + category}
							on:click={function () {
								searchTerm = '';
							}}
							on:mousemove={function (event) {
								// searchTerm = 'h';
							}}
							class="block hover:bg-gray-300 py-2 px-2 hover:rounded-b-md"
						>
							{suggestion.title}
						</a>
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
</div>
