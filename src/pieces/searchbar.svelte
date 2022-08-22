<script>
	import { goto } from '$app/navigation';
	import { SearchIcon, XIcon } from 'svelte-feather-icons';

	var searchTerm = '';
	var dropdownSelected = false;
	var filterList = ['All', 'Clothes','Tech'];
</script>

<div class="mr-5 max-h-min w-full min-w-min pb-1 md:pb-0 shadow-md md:flex text-black">
	<form
		class="relative w-full"
		on:submit|preventDefault={function () {
			goto('/searchResults?searchTerm=' + searchTerm);
		}}
	>
		<button
			on:click|preventDefault={function () {
				dropdownSelected = !dropdownSelected;
			}}
			type="button"
			class="absolute inset-y-0 w-10 bg-gray-100 py-2 px-4 rounded-l-md"
		>
			{filterList[0]}
		</button>
		<input
			value={searchTerm}
			on:input={function (event) {
				searchTerm = event.target.value;
			}}
			type="text"
			placeholder="search"
			class="focus:shadow-outline w-full min-w-max bg-white py-2 pl-12 text-sm leading-tight text-black focus:outline-none rounded-md"
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
		{/if}

		<button
			type="submit"
			class="absolute inset-y-0 right-0 w-10 max-w-min  cursor-pointer items-center justify-center bg-white pr-3 rounded-r-md"
		>
			<SearchIcon class="h-4 w-4 text-black" />
		</button>
	</form>
	{#if dropdownSelected}
	<div class="inset-y-0 "></div>
		{#each filterList as filter}
			<button
				type="button"
				class="bg-white block py-2 rounded hover:bg-gray-300"
			>
				{filter}
			</button>
		{/each}
	{/if}
</div>
