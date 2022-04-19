<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { auth } from '@src/utils/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	var error = null;
	var searchResults = null;

	onMount(async function () {
		var searchTerm = $page.url.searchParams.get('searchTerm').trim()
		var res = await axios.post('/api/product/getManyByTitle', { searchTerm });
		if (res.data.error) {
			error = res.data.error;
		}
		searchResults = res.data.products;
	});
</script>

{#if searchResults}
	<div class="bg-white text-black">
		{JSON.stringify(searchResults)}
	</div>
{/if} 

