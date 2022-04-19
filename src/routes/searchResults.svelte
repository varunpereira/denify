<script context="module">
	export async function load({ url }) {
		var props;
		var searchTerm = url.searchParams.get('searchTerm').trim();
		var res = await axios.post('/api/product/getManyByTitle', { searchTerm });
		if (res.data.error) {
			props = { ...props, error: res.data.error };
		}
		props = { ...props, searchResults: res.data.products };
		return {
			props
		};
	}
</script>

<script>
	import axios from 'axios';
	export var searchResults;
	export var error;
</script>

<svelte:head><title>Search Results</title></svelte:head>

<div class="bg-white text-black">
	{JSON.stringify(searchResults)}
</div>
