<script>
	import { goto } from '$app/navigation';
	import { SearchIcon, XIcon } from 'svelte-feather-icons';

	var searchTerm = '';

	function searchResults() {
		goto('/searchResults?searchTerm=' + searchTerm);
	}
</script>

<div class="mr-5 max-h-min w-full min-w-min pb-2 shadow-md md:flex text-black">
	<form class=" relative w-full " on:submit|preventDefault={searchResults}>
		<input
			value={searchTerm}
			on:input={(event) => (searchTerm = event.target.value)}
			type="text"
			placeholder="search"
			class="focus:shadow-outline w-full min-w-max bg-white py-2  pl-3 text-sm leading-tight text-black focus:outline-none rounded-md"
		/>
		{#if searchTerm !== ''}
			<button
				on:click={() => (searchTerm = '')}
				class="absolute inset-y-0 right-8 w-10  max-w-min items-center justify-center"
				type="button"
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
</div>
